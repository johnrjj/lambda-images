import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PicDrop from './PicDrop';

const endpoint = 'https://up08ep1b3j.execute-api.us-east-1.amazonaws.com/dev/upload';

const App = () => (
  <Router>
    <PicDrop apiEndpoint={endpoint} />
  </Router>
);


export default App;
