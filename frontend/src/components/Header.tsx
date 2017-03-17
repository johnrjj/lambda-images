import * as React from 'react';
import { ReactNode, Component, CSSProperties } from 'react';
import * as Radium from 'radium';
import { Link } from 'react-router-dom';

const styles = {
  header: {
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    left: '0',
    top: '0',
    background: '#12529D',
    padding: '1rem',
    color: '#f7fafe',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '50px',
  } as CSSProperties,
  item: {
    padding: '5px 15px',
    cursor: 'pointer',
    background: 'rgba(0, 0, 0, 0.22)',
  },
  itemSelected: {
  }
};

const Header = () => (
  <nav style={styles.header}>
    <div>
      <Link style={styles.item} to="/">Home</Link>
    </div>
    <div>
      right
    </div>
  </nav>
);


export default Radium(Header);
