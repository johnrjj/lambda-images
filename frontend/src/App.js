import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Radium from 'radium';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Match,
  withRouter,
} from 'react-router-dom';

import './App.css';
import 'normalize.css';
import DropArea from './components/DropArea';
import FullViewportModal from './components/FullViewportModal';
import GalleryPage from './containers/GalleryPage';
import logo from './logo.svg';
import { XHRPromise } from './util';

const generateSignedUrls = (files) => {
  files.forEach(file => {
    const { size, type, name } = file;
  })
};

const endpoint = 'https://up08ep1b3j.execute-api.us-east-1.amazonaws.com/dev/upload';

class DropPic extends Component {
  constructor(props, context) {
    console.log(context);
    super(props, context);
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
    const randomId = '12249829'
    const signedUrls = generateSignedUrls(postFiles);
  }

  render() {
    return (
      <Router>
        <DropArea
          onDragEnter={this.toggleModal}
          onDragLeave={this.toggleModal}
          onDrop={this.handleDrop}>
          <FullViewportModal>
          </FullViewportModal>
          <Route path="/a/:id" component={GalleryPage}/>
          <Route path="/:id" exact component={() => <h2>an image page</h2>}/>
        </DropArea>
      </Router>
    )
  }
}

export default Radium(DropPic);
