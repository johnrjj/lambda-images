import React, { Component } from 'react';

const FileDropZone = props => {
  const {
    onDragOver,
    onDragEnter,
    onDragLeave,
    onDragEnd,
    onDrop,
    ...rest
  } = props;

  const handleDragOver = e => {
    e.preventDefault();

    if (onDragOver) {
      onDragOver(e);
    }
  };

  const handleDragEnter = e => {
    e.preventDefault();

    if (onDragEnter) {
      onDragEnter(e);
    }
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    const { files, types, items } = e.dataTransfer;
    const file = files[0];
    const { name, size, type } = file;
    console.log(name, size, type);

    if (onDrop) {
      onDrop(e);
    }
  };

  const handleDragLeave = e => {
    e.preventDefault();

    if (onDragLeave) {
      onDragLeave(e);
    }
  };

  const handleDragEnd = e => {
    e.preventDefault();

    if (onDragEnd) {
      onDragEnd(e);
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      {...rest}
    >
      {props.children}
    </div>
  );
};

export default FileDropZone;
