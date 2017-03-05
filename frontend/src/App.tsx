import * as React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import PicDrop from './PicDrop';

const endpoint = 'https://up08ep1b3j.execute-api.us-east-1.amazonaws.com/dev/upload';

class App extends Component<null, null> {
  render() {
    return (
      <Router>
        <PicDrop/>
      </Router>
    );
  }
}

export default App;
