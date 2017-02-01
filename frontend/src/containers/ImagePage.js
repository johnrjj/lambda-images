import React, { Component } from 'react';

const ImagePage = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
)

export default ImagePage;
