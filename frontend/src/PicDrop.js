import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Radium from 'radium';
import { withRouter, Route } from 'react-router-dom';
import './App.css';
import 'normalize.css';
import DropArea from './components/DropArea';
import FullViewportModal from './components/FullViewportModal';
import AlbumPage from './containers/AlbumPage';
import ImagePage from './containers/ImagePage';
import { XHRPromise } from './util';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { generateAlbumSignatures } from './util';
const generateSignedUrls = (files) => {
  files.forEach(file => {
    const { size, type, name } = file;
  })
};

// const generateAlbumSignatures = (files) => {
//   files.map(file => {
//     const { size, type, name } = file;
//   })
// }

const styles = {
  input: {
    backgroundColor: 'inherit',
    border: 'none',
    boxShadow: 'none',
    ':focus': {
      outline: 'none',
      borderBottom: '1px solid black',
    },
    'after': {
      outline: 'none',
      borderBottom: 'none',
    }
  }

};

class DropPic extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = { showModal: false };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  toggleModal() {
    console.log('toggle');
    this.setState({ showModal: !this.state.showModal });
  }

  async handleDrop(e) {
    this.toggleModal();
    const { files, types, items} = e.dataTransfer;
    const postFiles = Array.prototype.slice.call(files);

    for (let i = 0; i < postFiles.length || 0; i++) {
      const file = files[i];
      const reader = new FileReader();
      const url = reader.readAsDataURL(file);
      reader.onloadend = (e) => {
        const files = this.state.files;
        this.setState((prevState, props) => {
          const files = prevState.files;
          files[i].previewUrl = reader.result;
          return { files };
        });
      }
    }
    this.setState({ files: postFiles });
    console.log(postFiles);

    const filesMetadata = postFiles.map(({ name, size, type }) => ( {name, size, type }));
    console.log(filesMetadata);
    const x = await generateAlbumSignatures('https://up08ep1b3j.execute-api.us-east-1.amazonaws.com/dev/generateAlbum', filesMetadata);
    console.log(x);
    // const x = await generateAlbumSignatures(endpoint, images);


    // const signedUrls = generateSignedUrls(postFiles);
    // const generatedAlbumId = '1';
    // this.setState({ uploading: true });
    // const generatedPhotoURls = {};
    // const { push } = this.props;
    // push(`/a/${generatedAlbumId}`);
    // console.log('but i can keep executing!');

  }

  render() { 
    return (
        <DropArea
          onDragEnter={this.toggleModal}
          onDragLeave={this.toggleModal}
          onDrop={this.handleDrop}>
          <FullViewportModal hide={!this.state.showModal}>
            <div>Upload a file</div>
          </FullViewportModal>
          <input type="text" value="hey" style={styles.input}></input>
          <Route path="/a/:id" component={AlbumPage}/>
          <Route path="/:id" exact component={ImagePage}/>
        </DropArea>
    )
  }
}

export default withRouter(Radium(DropPic));
