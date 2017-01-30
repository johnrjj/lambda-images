import React, { Component } from 'react';
import 'normalize.css';

import logo from './logo.svg';
import './App.css';
import { XHRPromise } from './util';
import fetch from 'isomorphic-fetch';

import Router from 'react-router/BrowserRouter'
import Match from 'react-router/Match'
import Link from 'react-router/Link'

import Page from './containers/Page';

const endpoint = 'https://up08ep1b3j.execute-api.us-east-1.amazonaws.com/dev/upload';

const getPercentComplete = ({loaded, total, lengthComputable}) => lengthComputable ? console.log((loaded / total) * 100) : null

const getSignedUrl = async (signUrlEndpoint, fileProps) => {
  const { type } = fileProps;
  console.log(type);

  const headers = new Headers({
    "Content-Type": type,
  });

  try {
    const res = await fetch(signUrlEndpoint, { headers });
    const { url } = await res.json();
    console.log(url);
    return url;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const uploadFile = async (url, file) => {
  await XHRPromise(url, {
    method: 'put',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    body: file,
  }, getPercentComplete);
};


const Gallery = ({ params }) => (
  <div>
    <h1>Gallery: {params.id}</h1>
  </div>
);

const App = () => (
  <Router>
    <div>
      <Match pattern="/g/:id" component={Gallery} />
      <Match exactly={true} pattern="/:id" component={Page} />
    </div>
  </Router>
);

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = { file: null };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleImageChange(e) {
    let file = e.target.files[0];
    console.log(file);
    this.setState({ file });
  };

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.file) {
      console.log('No file selected to upload');
      return;
    }

    const { type, name, size } = this.state.file;

    getSignedUrl(endpoint, { type })
      .then(url => uploadFile(url, this.state.file))
      .then(() => console.log('done!'));
  };

  render() {
    const id = this.props.params.id;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>PHoto: {id}</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input className="fileInput" type="file" onChange={this.handleImageChange} />
          <button className="submitButton" type="submit" onClick={this.handleSubmit}>Upload Image</button>
        </form>
      </div>
    );
  }
}

export default App;
