import * as React from 'react';
import { ReactNode, Component, CSSProperties} from 'react';
import * as Radium from 'radium';

export interface CardProps {
  children?: ReactNode;
};

const styles = {
  container: {
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12)',
    borderRadius: '2px',
    padding: '2rem 2rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  } as CSSProperties,
};

const Card = ({ children }: CardProps) => {
  return (
    <div style={styles.container}>
      {children}
    </div>
  );
};

export default Radium(Card);
