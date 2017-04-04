import * as React from 'react';
import { ReactNode, Component, CSSProperties } from 'react';
import * as Radium from 'radium';
import { Link } from 'react-router-dom';
import Auth0Lock from './Auth0Lock';
import { headerHeight } from '../design-tokens';

const auth0ClientId = '9b9vnnximFjks0pgQxhmlgtaIbOxqXoG';
const auth0Domain = 'lamdba-images.auth0.com';

const styles = {
  container: {
    display: 'flex',
    margin: '0 auto',
    width: '720',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as CSSProperties,
  header: {
    backgroundColor: '#5483F7',
    zIndex: 2,
    alignItems: 'center',
    position: 'fixed',
    left: '0',
    opacity: 1,
    top: '0',
    padding: '1rem 3rem',
    color: '#f7fafe',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: headerHeight,
  } as CSSProperties,
  itemLeft: {
    padding: '5px 15px 5px 0',
    cursor: 'pointer',
  },
  itemRight: {
    padding: '5px 0px 5px 15px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: '300',
  },
  logo: {
    display: 'flex',
    fontSize: '24px',
    fontWeight: 300
  } as CSSProperties,
  linksContainer: {
    display: 'flex'
  } as CSSProperties
};

const Header = () => (
  <nav style={styles.header}>
    <div style={styles.container}>
      <div style={styles.logo}>
        <Link style={styles.itemLeft} to="/">dropit</Link>
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
