import * as React from 'react';
import { Component, ReactNode } from 'react';

export interface DropAreaProps {
  onDragEnter?(e: Event);
  onDragOver?(e: Event);
  onDragLeave?(e: Event);
  onDragEnd?(e: Event);
  onDrop?(e: Event);
  children?: ReactNode;
}

const DropArea = (props: DropAreaProps) => {
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

  const handleDragStart = e => {};

  const handleDragEnter = e => {
    e.preventDefault();

    if (onDragEnter) {
      onDragEnter(e);
    }
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();

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
      onDragStart={handleDragStart}
      {...rest}
    >
      {props.children}
    </div>
  );
};

export default DropArea;
