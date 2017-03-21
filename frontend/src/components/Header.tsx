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
    background: '#5483F7',
    padding: '1rem 3rem',
    color: '#f7fafe',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '50px',
  } as CSSProperties,
  // item: {
  //   padding: '5px 15px',
  //   cursor: 'pointer',
  //   background: 'rgba(0, 0, 0, 0.22)',
  // },
  itemSelected: {
  }
};

const Header = () => (
  <nav style={styles.header}>
    <div>
      <Link to="/"></Link>
    </div>
    <div>
      
    </div>
  </nav>
);


export default Radium(Header);
