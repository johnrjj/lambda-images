import * as React from 'react';
import * as ReactDOM from 'react-dom';

const x: React.StatelessComponent<{ message: string }> = ({ message }) => {
  return (
    <div>{message}</div>
    )
};

x.displayName = 'mycomponent name for devtools';