import * as React from 'react';
import { ReactNode, Component} from 'react';
import * as Radium from 'radium';

const styles = {
  header: {
    alignItems: 'center',
    position: 'fixed',
    left: '0',
    top: '0',
    background: '#12529D',
    color: '#f7fafe',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '55px',
  },
};

const Header = () => (
  <nav style={styles.header}>
    hello
  </nav>
);


export default Radium(Header);
