import * as React from 'react';
import { CSSProperties } from 'react';
import * as ReactDOM from 'react-dom';
import * as Radium from 'radium';

// right now hardcoding width value.
const MAX_WIDTH: number = 720;
const MAX_HEIGHT: number = Number.MAX_VALUE;

export interface PhotoDisplayerProps {
  placeholderImageSrc: string;
  mainImageSrc: string;
  originalWidth: number;
  originalHeight: number;
  progressBarPercent?: number;
  statusText?: string;
}

const styles = {
  container: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: '1rem',
  } as CSSProperties,
  imageContainer: {
    background: '#FFFFFF',
    // border: '1px solid #FFFFFF',
    boxShadow: '1px 26px 40px 0 rgba(0,0,0,0.15)',
    // borderRadius: '4px',
  },
  image: {
    display: 'block',
    width: 'auto',
    maxWidth: '100%',
    height: 'auto',
    // borderRadius: '4px',
    
  },
  placeholderImage: {
    position: 'absolute',
    top: 0,
  },
  mainImage: {},
  getScaledImageStyle(origHeight: number, origWidth: number): { maxWidth?: number, minHeight?: number, height: number, width: number } {
    const { height = 0, width = 0 } = scaleImageToFit(origHeight, origWidth);
    console.log(height, width, origHeight, origWidth);
    return {
      // maxWidth: width,
      height: height,
      width: width,
      // minHeight: height,
    }
  },
  
};

const PhotoDisplayer: React.StatelessComponent<PhotoDisplayerProps> = (props) => {
  console.log('props', props);
  return (
    <div style={styles.container}>
      <div style={[
        styles.imageContainer, 
        styles.getScaledImageStyle(props.originalHeight, props.originalWidth)
        ]}>
      <img
        src={props.placeholderImageSrc}
        style={[
          styles.image,
          styles.placeholderImage,
          styles.getScaledImageStyle(props.originalHeight, props.originalWidth),
        ]} />
      <img
        src={props.mainImageSrc}
        style={[
          styles.image,
          styles.getScaledImageStyle(props.originalHeight, props.originalWidth),
        ]} />
      {(props.statusText) &&
        (<div style={statusStyles.statusContainer}>
          <div style={statusStyles.statusContent}>
            {props.statusText}
          </div>
        </div>)
      }
      {(props.progressBarPercent) &&
        <div style={getProgressBarStyles(props.progressBarPercent)}></div>
      }
      </div>
    </div>
  )
};

const statusStyles = {
  statusContainer: {
    display: 'block',
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '3rem',
    backgroundColor: 'rgba(0,0,0,0.75)'
  },
  statusContent: {
    color: '#6CB0FF',
    textAlign: 'center',
    paddingTop: '0.8rem',
    textShadow: '0 0 2px rgba(57,196,66,.3)',
  },
};

const getProgressBarStyles = (progress: number = 0) => {
  if (progress === 0) {
    return null;
  }
  return {
    position: 'absolute',
    bottom: '0',
    left: '0',
    height: '4px',
    zIndex: 3,
    width: `${progress}%`,
    backgroundColor: '#6CB0FF',
    transition: '0.3s width ease-out',
  }
};

const scaleImageToFit = (height: number, width: number, maxHeight: number = MAX_HEIGHT, maxWidth: number = MAX_WIDTH): { height: number, width: number } => {
  let resizedHeight: number = height;
  let resizedWidth: number = width;
  if (width > maxWidth) {
    const ratio = maxWidth / width;
    resizedWidth = maxWidth;
    resizedHeight = height * ratio;
  }
  return {
    height: resizedHeight,
    width: resizedWidth,
  };
};

export default Radium(PhotoDisplayer);