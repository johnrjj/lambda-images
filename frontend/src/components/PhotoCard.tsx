import * as React from 'react';
import { CSSProperties } from 'react';
import * as Radium from 'radium';

export interface Photo {
  src: string;
  previewUrl: string;
  // percentUploaded?: number;
  statusText?: string;
  progressBarPercent?: number;
  previewHeight?: number;
  previewWidth?: number;
}

const maxWidth = 672;
const maxHeight = 0;

const Photo = ({ src, previewUrl, statusText, progressBarPercent, previewWidth, previewHeight, ...rest }: Photo) => {

  let width = previewWidth;
  let height = previewHeight;

  console.log(width, height);

  if (width > maxHeight) {
    const ratio = maxWidth / width;
    width = maxWidth;
    height = height * ratio;
  }

  return (
    <div style={styles.container}>
      <div style={[styles.imgContainer, previewHeight ? styles.placeholderHeight(height): null]}>
        <img style={[styles.img]} src={src} />
        <img style={styles.previewImg} src={previewUrl} />
        <div style={uploaderStyles.uploadingContainer}>
          <div style={uploaderStyles.uploadingContent}>
            {statusText}
          </div>
          { (progressBarPercent) 
            ? <div style={uploaderStyles.uploadingProgressBar(progressBarPercent)}></div>
            : null
            }
        </div>
      </div>
      <div style={styles.description}>
        <p>Image description</p>
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
  previewImg: {
    display: 'block',
    width: 'auto',
    maxWidth: '100%',
    height: 'auto',
    position: 'absolute',
    top: 0,
  },
  description: {
    fontSize: '1rem',
  },
  placeholderHeight(height: number) {
    return (height) ? { minHeight: height } : null;
  }
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
  uploadingProgressBar(progress: number) {
    return {
      position: 'absolute',
      bottom: '0',
      left: '0',
      height: '4px',
      zIndex: 3,
      width: `${progress || 0}%`,
      backgroundColor: '#6CB0FF',
      transition: '0.3s width ease-out',
    }
  },
}
