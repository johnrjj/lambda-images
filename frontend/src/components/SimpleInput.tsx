import * as React from 'react';
import { ReactNode, Component} from 'react';
import * as Radium from 'radium';

const styles = {
  input: {
    fontSize: '2rem',
    backgroundColor: 'inherit',
    border: 'none',
    boxShadow: 'none',
    ':focus': {
      outline: 'none',
    },
    after: {
      outline: 'none',
      borderBottom: 'none',
    },
  },
};

const SimpleInput = (props) => (
    <input style={styles.input} {...props}></input>
);

export default Radium(SimpleInput);
