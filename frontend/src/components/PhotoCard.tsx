import * as React from 'react';
import * as Radium from 'radium';

export interface Photo {
  src: string;
}

const Photo = ({ src, ...rest }: Photo) => {
  // const styles = getStyles(width, height);
  return (
    <div>
      <div style={styles.title}> 
        image title
      </div>
      <div style={styles.imgContainer}>
        <img style={styles.img} src={src} />
      </div>
    </div>

  );
};

export default Radium(Photo);


const styles = {
  imgContainer: {
    width: '100px',
  },
  img: { 
    display: 'block',
    width: '100%',
    height: 'auto',
  },
  title: {
    fontSize: '2rem',
  }
};
