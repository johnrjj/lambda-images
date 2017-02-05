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
      <div style={styles.uploading}>
        23% Complete
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
  uploading: {
    display: 'block',
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
};
