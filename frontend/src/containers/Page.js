import DropArea from '../components/DropArea';
import DropModal from '../components/DropModal';
import React, { Component } from 'react';

class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DropArea>
        <DropModal>
          <p>hello2</p>  
        </DropModal>
        <h2>I can drop files here...</h2>
      </DropArea>
    )
  }
}

export default Page;