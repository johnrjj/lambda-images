import FileDrop from '../components/FileDrop';
import React, { Component } from 'react';

class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FileDrop>
        <h2>I can drop files here...</h2>
      </FileDrop>
    )

  }
}

export default Page;