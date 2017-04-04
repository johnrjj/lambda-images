import * as React from 'react';
import { ReactNode, Component } from 'react';
import * as Radium from 'radium';

export interface ContentProps {
  children?: ReactNode,
}

const styles = {
  container: {
    paddingTop: '5rem',
    width: '46rem',
    margin: '0 auto 2rem auto',
  }
};

const Container = ({ children }: ContentProps) => 
  (
    <div style={styles.container}>
      {children}
    </div>
  )


export default Radium(Container);
