import * as React from 'react';
import { CSSProperties } from 'react';
import * as Radium from 'radium';
import PhotoDisplayer from './PhotoDisplayer';

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
  return (
    <div style={styles.container}>
      <PhotoDisplayer 
        originalHeight={previewHeight} 
        originalWidth={previewWidth}
        mainImageSrc={src}
        placeholderImageSrc={previewUrl}
        progressBarPercent={progressBarPercent}
        statusText={statusText}
      />
    </div>
  )
};

export default Radium(Photo);

const styles = {
  container: {
    marginBottom: '2rem',
  },
};
