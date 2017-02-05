import * as React from 'react';
import { ReactNode, Component} from 'react';
import * as Radium from 'radium';

export interface ContentProps {
  children?: ReactNode;
}

const styles = {
  container: {
    margin: '1rem auto',
    width: '80%',
    padding: '4.5rem 1em',
  }
};

const Container = ({ children }: ContentProps) => {
  return (
    <div style={styles.container}>
      {children}
    </div>
  )
}

export default Radium(Container);
