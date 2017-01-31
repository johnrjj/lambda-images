import React from 'react';
import Radium from 'radium';

// todo: make full screen an attribute so modal is reusable.

const styles = {
  fullScreen: {
    position: 'fixed',
    height: '100vh',
    width: '100vw',
    left: 0,
    top: 0,
  },
  modalBackdrop: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  modalContainer: {
    backgroundColor: '#45484f',
    width: '680px',
    height: '450px',
    boxShadow: '0 5px 15px 0 rgba(0,0,0,.5)',
    borderRadius: '5px',
    padding: '10rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  hideBehind: {
    zIndex: '-1',
  },
  text: {
    color: '#f2f2f2',
  }
};

const DropModal = (({ children }) =>
  <div style={[styles.fullScreen, styles.modalBackdrop, styles.hideBehind]}>
    <div style={styles.modalContainer}>
      <div style={styles.text}>Upload a file</div>
      <div>hello1</div>
      {children}
    </div>
  </div >
);

export default Radium(DropModal);