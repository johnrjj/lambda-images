import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Radium from 'radium';
import { withRouter, Route } from 'react-router-dom';
import './App.css';
import 'normalize.css';
import DropArea from './components/DropArea';
import FullViewportModal from './components/FullViewportModal';
import GalleryPage from './containers/GalleryPage';
import ImagePage from './containers/ImagePage';
import { XHRPromise } from './util';

const generateSignedUrls = (files) => {
  files.forEach(file => {
    const { size, type, name } = file;
  })
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
    this.setState({ showModal: !this.state.showModal });
  }

  handleDrop(e) {
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

    // const signedUrls = generateSignedUrls(postFiles);
    const generatedAlbumId = '1';
    const generatedPhotoURls = {};
    const { push } = this.props;
    push(`/g/${generatedAlbumId}`);
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
          <Route path="/a/:id" component={GalleryPage}/>
          <Route path="/:id" exact component={ImagePage}/>
        </DropArea>
    )
  }
}

export default withRouter(Radium(DropPic));
