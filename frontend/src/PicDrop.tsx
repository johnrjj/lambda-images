import * as React from 'react';
import * as fetch from 'isomorphic-fetch';
import * as Radium from 'radium';
import { withRouter, Route } from 'react-router-dom';
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
import { XHRPromise } from './util';
import { generateAlbumSignatures } from './util';

const generateAlbumEndpoint: string = 'https://1am8vv38ug.execute-api.us-east-1.amazonaws.com/dev/generateAlbum'

const generateSignedUrls = files => {
  files.forEach(file => {
    const { size, type, name } = file;
  });
};

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

export interface Image {
  name: string;
  type: string;
  size: number;
  previewUrl?: string;
};

export interface DropPicProps {
  push(destination: string);
}

export interface DropPicState {
  showModal: boolean;
  files: Array<Image>;
  uploading: boolean;
}

class DropPic extends React.Component<DropPicProps, DropPicState> {
  constructor(props, context) {
    console.log(props, context);
    super(props);
    this.state = {
      showModal: false,
      uploading: false,
      files: null,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  async handleDrop(e) {
    this.toggleModal();
    const { files, types, items } = e.dataTransfer;
    const postFiles = Array.prototype.slice.call(files);

    for (let i = 0; i < postFiles.length || 0; i++) {
      const file = files[i];
      const reader = new FileReader();
      const url = reader.readAsDataURL(file);
      reader.onloadend = e => {
        const files = this.state.files;
        this.setState((prevState, props) => {
          const files = prevState.files;
          files[i].previewUrl = reader.result;
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

    console.log(getTotalFileSize(filesMetadata));
    console.log(url, images);

    this.setState({ uploading: true });
    const { push } = this.props;
    push(`/a/${url}`);
    console.log('but i can keep executing!');
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
          <div>Drop file here to upload</div>
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
