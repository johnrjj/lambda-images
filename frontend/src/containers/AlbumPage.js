import React from 'react';
import Radium from 'radium';

const AlbumPage = ({ match }) => {
  return (
    <div>
      <h1>a gallery page, with id of {match.params.id}</h1>
    </div>
  );
};

export default Radium(AlbumPage);
