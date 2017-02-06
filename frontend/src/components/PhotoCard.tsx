import * as React from 'react';
import { CSSProperties } from 'react';
import * as Radium from 'radium';

export interface Photo {
  src: string;
}

const Photo = ({ src, ...rest }: Photo) => {
  // const styles = getStyles(width, height);
  return (
    <div style={styles.container}>
      <div style={styles.imgContainer}>
        <img style={styles.img} src={src} />
        <div style={uploaderStyles.uploadingContainer}>
          <div style={uploaderStyles.uploadingContent}>
            23% Complete
        </div>
          <div style={uploaderStyles.uploadingProgressBar}>
          </div>
        </div>
      </div>
      <div style={styles.description}>
        <p>image descrpition</p>
      </div>
    </div>

  );
};

export default Radium(Photo);


const styles = {
  container: {
    zIndex: 0,
    marginBottom: '2rem',
  },
  imgContainer: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
  } as CSSProperties,
  img: {
    display: 'block',
    width: 'auto',
    maxWidth: '100%',
    height: 'auto',
  },
  description: {
    fontSize: '1rem',
  },
};

const uploaderStyles = {
  uploadingContainer: {
    display: 'block',
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '3rem',
    backgroundColor: 'rgba(0,0,0,0.75)'
  },
  uploadingContent: {
    color: '#6CB0FF',
    textAlign: 'center',
    paddingTop: '0.8rem',
    textShadow: '0 0 2px rgba(57,196,66,.3)',
  },
  uploadingProgressBar: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    height: '4px',
    zIndex: 3,
    width: '100%', // need to m ake this a variable
    backgroundColor: '#6CB0FF',
    transition: '0.3s width ease-out',
  },
}
