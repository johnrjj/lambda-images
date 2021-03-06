import * as React from 'react';
import * as Radium from 'radium';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { withRouter, Route } from 'react-router-dom';
import DropArea from './components/DropArea';
import AlbumPage from './containers/AlbumPage';
import Home from './containers/HomePage';
import ImagePage from './containers/ImagePage';
import Header from './components/Header';
import Card from './components/Card';
import Photo from './components/PhotoCard';
import Auth from './components/Auth0Lock';
import { XHRPromise, uploadFile, generateAlbumSignatures } from './util';

const auth0ClientId = '9b9vnnximFjks0pgQxhmlgtaIbOxqXoG';
const auth0Domain = 'lamdba-images.auth0.com';
const generateAlbumEndpoint: string = 'https://1am8vv38ug.execute-api.us-east-1.amazonaws.com/dev/generateAlbum';
const collectionEndpoint: string = 'https://1am8vv38ug.execute-api.us-east-1.amazonaws.com/dev/collection'; //{id}/status

const getTotalFileSize = files =>
  files.reduce((accum, file) =>
    accum + file.size, 0
  );

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
  uploadedAmount?: number;
  src?: string;
  height?: number;
  width?: number;
};

export interface DropPicProps {
  history: any;
  location: any;
}

export interface DropPicState {
  showModal: boolean;
  files: Array<AImage>;
  uploading: boolean;
  error: string;
  status: string;
  albumId: string;
  loading: boolean,
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

const presignUrls = async (files: File[]) => {
  const filesMetadata = files.map(({ name, size, type }) => ({ name, size, type }));
  const album = await generateAlbumSignatures(
    generateAlbumEndpoint,
    filesMetadata,
  );
  return album;
}

const getImageMetadata = (image: File) => {
  return new Promise((accept, reject) => {
    const reader = new FileReader();
    const url = reader.readAsDataURL(image);
    reader.onloadend = () => {
      const imageSrc: string = reader.result;
      const image = new Image();
      image.onload = () => {
        const height = image.height;
        const width = image.width;
        const src = imageSrc
        const res = { height, width, src };
        accept(res);
      };
      image.src = imageSrc;
    };
  });
}

class DropPic extends React.Component<DropPicProps, DropPicState> {
  constructor(props, context) {
    super(props);
    this.state = {
      showModal: false,
      uploading: false,
      files: null,
      error: null,
      status: null,
      albumId: null,
      loading: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.transitionToCreatedAlbum = this.transitionToCreatedAlbum.bind(this);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  async handleDrop(files) {
    this.setState({ files, loading: true });
    const promises = await files.map((file, idx) => {
      const promise = getImageMetadata(file).then((data: any) => {
        this.setState((prevState, props) => {
          const files = prevState.files;
          files[idx].previewUrl = data.src;
          files[idx].height = data.height;
          files[idx].width = data.width;
          files[idx].uploadedAmount = 0;
          return { files };
        });
      });
      return promise;
    });

    const album = await presignUrls(files);
    const totalFileSize = getTotalFileSize(files);
    this.setState({ uploading: true, albumId: album.id });

    setTimeout(async () => {
      await Promise.all(album.images.map((image, i) => {
        // todo any files > 6 count won't have a status text until they actually begin the uploading.
        return uploadFile(image.presignedUrl, files[i], (e) => {
          const { loaded, total } = e;
          this.setState((prev, props) => {
            const files = prev.files;
            files[i].uploadedAmount = loaded;
            return { files };
          });
        })
      }));

      // now we can check the processing statuses of all the photos and make sure everything worked...
      // poll, query DB make sure all photos have urls s3 keys
      try {
        const res = await this.poll(album.id);
        this.setState((prevState: DropPicState) => {
          const { files } = prevState;
          files.forEach(file => file.uploadedAmount = null);
          return { files };
        });
        const entries: any = res.entries;
        const src: string = `https://image-service-jj-02.s3.amazonaws.com/${entries[0].s3key}`
        this.setState((prevState: DropPicState, props: DropPicProps) => {
          const files = prevState.files;
          files[0].src = src;
        });
      } catch (err) {
        console.log('err', err);
      }
    });
  }

  // todo, should turn this into a redirect component!
  transitionToCreatedAlbum() {
    const { history } = this.props;
    const { push } = history;
    push(`/a/${this.state.albumId}`);
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
    const { files } = this.state;
    return (
      <div>
        <Header />
        <Route path="/" exact render={props =>
          <Home
            onDrop={this.handleDrop}
            loading={this.state.loading}
            onResizeToFullscreenAnimEnd={this.transitionToCreatedAlbum}
            maximizeOverlay={this.state.uploading}
            {...props}
          />
        }
        />
        <Route key={this.props.location.key} path="/a/:id" render={props =>
          <AlbumPage {...props} meow={"meow"} photos={files}> </AlbumPage>}
        />
        <Route path="/:id" exact component={ImagePage} />
        {/*<Auth domain={auth0Domain} clientId={auth0ClientId} ></Auth>*/}
      </div>
    );
  }
}

// todo offload image processing to service workers so animations look nicer
// const workerFn = () => {
//   setInterval(() => {
//     postMessage(['test'], undefined);
//   }, 1000);
// }

// let workerCode = workerFn.toString();
// workerCode = workerCode.substring(workerCode.indexOf("{") + 1, workerCode.lastIndexOf("}"));

// const blob = new Blob([workerCode], { type: "application/javascript" });
// const worker = new Worker(URL.createObjectURL(blob));

// worker.onmessage = (m) => {
//   console.log("msg", m);
// };

export default withRouter(Radium(DropPic));
