import * as React from 'react';
import { Component, ReactNode } from 'react';
import * as Radium from 'radium';

// todo: make full screen an attribute so modal is reusable.

const styles = {
  fullScreen: {
    position: 'fixed',
    height: '100vh',
    width: '100vw',
    left: 0,
    top: 0,
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.2s ease-out',
    zIndex: '1',
  },
  modalContentContainer: {
    backgroundColor: '#fff',
    // backgroundColor: '#45484f',
    width: '50px',
    height: '50px',
    boxShadow: '0 5px 15px 0 rgba(0,0,0,.5)',
    borderRadius: '5px',
    padding: '10rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  hidden: {
    transition: 'opacity 0.25s ease-in',
    opacity: '0',
    zIndex: '-1', // hack until we can animate the component itself rather than the component contents
  },
};

export interface FullViewportModalProps {
  children?: ReactNode;
  hide?: boolean;
}

const FullViewportModal = ({ children, hide }: FullViewportModalProps) => {
  return (
    <div
      style={[styles.fullScreen, styles.modalContainer, hide && styles.hidden]}
    >
      <div style={styles.modalContentContainer}>
        {children}
      </div>
    </div>
  );
};

export default Radium(FullViewportModal);
