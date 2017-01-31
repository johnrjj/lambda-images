import React from 'react';
import Radium from 'radium';
import { withRouter } from 'react-router-dom';

const GalleryPage = withRouter(({push}) => {
  // messing with programatic redirects...
  setTimeout(() => push('/'), 1000);
  return (
    <div>
      <h1>a gallery page</h1>
    </div >
  )
});

export default Radium(GalleryPage);