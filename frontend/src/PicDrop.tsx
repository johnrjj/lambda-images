import * as React from 'react';
import * as Radium from 'radium';
import { withRouter, Route } from 'react-router-dom';
import 'isomorphic-fetch';

import 'normalize.css';
import './App.css';
import DropArea from './components/DropArea';
import FullViewportModal from './components/FullViewportModal';
import ContentContainer from './components/ContentContainer';
import AlbumPage from './containers/AlbumPage';
import Home from './containers/HomePage';
import ImagePage from './containers/ImagePage';
import Header from './components/Header';
import Card from './components/Card';
import Photo from './components/PhotoCard';
import {
  XHRPromise,
  uploadFile,
  generateAlbumSignatures
} from './util';

const generateAlbumEndpoint: string = 'https://1am8vv38ug.execute-api.us-east-1.amazonaws.com/dev/generateAlbum';
const collectionEndpoint: string = 'https://1am8vv38ug.execute-api.us-east-1.amazonaws.com/dev/collection'; //{id}/status

const getTotalFileSize = files =>
  files.reduce((accum, file) => accum + file.size, 0);

const styles = {
  pageContainer: {
    paddingTop: '5rem',
    width: '46rem',
    margin: '0 auto 2rem auto',
  },
  input: {
    backgroundColor: 'inherit',
    border: 'none',
    boxShadow: 'none',
    ':focus': {
      outline: 'none',
      borderBottom: '1px solid black',
    },
    after: {
      outline: 'none',
      borderBottom: 'none',
    },
  },
};

export interface AImage {
  name?: string;
  type?: string;
  size?: number;
  previewUrl?: string;
  url?: string;
  percentUploaded?: number;
  src?: string;
  height?: number;
  width?: number;
};

export interface DropPicProps {
  push(destination: string);
}

export interface DropPicState {
  showModal: boolean;
  files: Array<AImage>;
  uploading: boolean;
  error: string;
  status: string;
}


export interface CollectionStatus {
  entries: Array<string>;
  processed: boolean;
}

const getCollectionStatus = async (collectionId: string) => {
  const endpoint = `${collectionEndpoint}/${collectionId}/status`;
  const res = await fetch(endpoint);
  const data = await res.json() as CollectionStatus;
  return data;
};

class DropPic extends React.Component<DropPicProps, DropPicState> {
  constructor(props, context) {
    console.log(props, context);
    super(props);
    this.state = {
      showModal: false,
      uploading: false,
      files: null,
      error: null,
      status: null,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  async handleDrop(e) {
    this.setState({ uploading: true });

    const { files, types, items } = e.dataTransfer;
    const postFiles: Array<File> = Array.prototype.slice.call(files);

    for (let i = 0; i < postFiles.length || 0; i++) {
      const file = files[i];
      const reader = new FileReader();
      const url = reader.readAsDataURL(file);
      reader.onloadend = e => {
        console.log(this.state);
        const files = this.state.files;
        const image = new Image();
        image.src = reader.result;
        const height = image.height;
        const width = image.width;
        // here??
        this.setState((prevState, props) => {
          const files = prevState.files;
          files[i].previewUrl = reader.result;
          files[i].height = height;
          files[i].width = width;
          console.log(height);
          return { files };
        });
      };
    }
    this.setState({ files: postFiles });

    const filesMetadata = postFiles.map(({ name, size, type }) => ({
      name,
      size,
      type,
    }));
    const album = await generateAlbumSignatures(
      generateAlbumEndpoint,
      filesMetadata,
    );
    const { url, images } = album;
    console.log(album);

    console.log(getTotalFileSize(filesMetadata));
    console.log(url, images);

    this.toggleModal();

    const { push } = this.props;
    push(`/a/${url}`);
    console.log('but i can keep executing!');

    await Promise.all(images.map((image, i) => {

      // todo any files > 6 count won't have a status text until they actually begin the uploading.

      return uploadFile(image.presignedUrl, postFiles[i], (e) => {
        const { loaded, total } = e;
        const percentUploaded = 100 * (loaded / total);
        this.setState((prev, props) => {
          const files = prev.files;
          files[i].percentUploaded = percentUploaded;
          return { files };
        });
      })
    }));

    // now we can check the processing statuses of all the photos and make sure everything worked...

    // poll, query DB make sure all photos have urls s3 keys
    const albumId = url;
    try {
      const res = await this.poll(albumId);
      console.log(res);

      const entries: any = res.entries;
      const testImg = new Image();
      const src: string = `https://image-service-jj-02.s3.amazonaws.com/${entries[0].s3key}`
      testImg.onload = (e) => console.log('loaded', e);
      testImg.onerror = (e) => console.log('onerror', e);
      testImg.src = src;
      this.setState((prevState: DropPicState, props: DropPicProps) => {
        const files = prevState.files;
        files[0].src = src;
      });

    } catch (err) {
      console.log('err', err);
    }
  }

  poll(collectionId): Promise<any> {
    return new Promise((accept, reject) => {
      const endTime = Number(new Date()) + (5000);
      const interval = 200;
      const poller = () => {
        console.log('polling...');
        getCollectionStatus(collectionId)
          .then(status => {
            console.log('isdone', status);
            if (status.processed) {
              return accept(status);
            } else if (Number(new Date()) < endTime) {
              return setTimeout(poller, interval);
            } else {
              return reject(`Polling collection ${collectionId} timed out.`);
            }
          });
      }
      poller();
    });
  }

  render() {
    return (
      <DropArea
        onDragEnter={this.toggleModal}
        onDragLeave={this.toggleModal}
        onDrop={this.handleDrop}
      >
        <FullViewportModal
          hide={!this.state.showModal}
        >
          <div>{this.state.uploading ? 'Loading' : null}</div>
        </FullViewportModal>
        <ContentContainer>
          <Header />
          <Card>
            <Route path="/" exact component={Home} />
            <Route path="/a/:id" photos={this.state.files} component={AlbumPage} />
            <Route path="/:id" exact component={ImagePage} />
          </Card>
        </ContentContainer>
      </DropArea>
    );
  }
}

export default withRouter(Radium(DropPic));
