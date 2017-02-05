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
      </div>
      <div style={styles.description}> 
        image descrpition
      </div>
    </div>

  );
};

export default Radium(Photo);


const styles = {
  container: {
    marginBottom: '2rem',
  },
  imgContainer: {
    display: 'flex',
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
  }
};
