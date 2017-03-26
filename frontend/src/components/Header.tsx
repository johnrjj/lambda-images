import * as React from 'react';
import { ReactNode, Component, CSSProperties } from 'react';
import * as Radium from 'radium';
import { Link } from 'react-router-dom';
import Auth0Lock from './Auth0Lock';

const auth0ClientId = '9b9vnnximFjks0pgQxhmlgtaIbOxqXoG';
const auth0Domain = 'lamdba-images.auth0.com';

const styles = {
  container: {
    display: 'flex',
    margin: '0 auto',
    width: '624px',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as CSSProperties,
  header: {
    backgroundColor: '#5483F7',
    borderBottom: '1px solid rgba(0,0,0,.0975)',
    zIndex: 2,
    
    alignItems: 'center',
    position: 'fixed',
    left: '0',
    opacity: 0,
    top: '0',
    // background: '#5483F7',
    padding: '1rem 3rem',
    color: '#f7fafe',
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '72px',
  } as CSSProperties,
  itemLeft: {
    padding: '5px 15px 5px 0',
    cursor: 'pointer',
  },
  itemRight: {
    padding: '5px 0px 5px 15px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '400',
  },
  itemSelected: {
  },
  logo: {
    display: 'flex',
    // transform: 'translate3d(0px,0px,0px)',
    fontSize: '28px',
    fontWeight: 700
  } as CSSProperties,
  linksContainer: {
    // float: 'right',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  } as CSSProperties
};

const Header = () => (
  <nav style={styles.header}>
    <div style={styles.container}>
      <div style={styles.logo}>
        <Link style={styles.itemLeft} to="/">DropPic</Link>
      </div>
      <div style={styles.linksContainer}>
        <Auth0Lock
          clientId={auth0ClientId}
          domain={auth0Domain}
        >
          <Link style={styles.itemRight} to="/">Login</Link>
        </Auth0Lock>
      </div>
    </div>
  </nav>
);


export default Radium(Header);
