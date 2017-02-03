import * as React from 'react';
import * as fetch from 'isomorphic-fetch';
import * as Radium from 'radium';
import { withRouter, Route } from 'react-router-dom';
import './App.css';
import 'normalize.css';
import DropArea from './components/DropArea';
import FullViewportModal from './components/FullViewportModal';
import AlbumPage from './containers/AlbumPage';
import ImagePage from './containers/ImagePage';
import { XHRPromise } from './util';
import { generateAlbumSignatures } from './util';
const generateSignedUrls = files => {
  files.forEach(file => {
    const { size, type, name } = file;
  });
};

const getTotalFileSize = files =>
  files.reduce((accum, file) => accum + file.size, 0);

const styles = {
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

export interface File {
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
  files: Array<File>;
  uploading: boolean;
}


class DropPic extends React.Component<DropPicProps, DropPicState> {
  constructor(props) {
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
      'https://up08ep1b3j.execute-api.us-east-1.amazonaws.com/dev/generateAlbum',
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
        <FullViewportModal hide={!this.state.showModal}>
          <div>Upload a file</div>
        </FullViewportModal>
        <input
          type="text"
          value="hey"
          onChange={() => { }}
          style={styles.input}
        />
        <Route path="/a/:id" component={AlbumPage} />
        <Route path="/:id" exact component={ImagePage} />
        {this.state.files
          ? this.state.files.map(file => (
            <img key={file.name} src={file.previewUrl} />
          ))
          : null}
      </DropArea>
    );
  }
}

export default withRouter(Radium(DropPic));
