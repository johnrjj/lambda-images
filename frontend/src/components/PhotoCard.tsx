import * as React from 'react';
import { CSSProperties } from 'react';
import * as Radium from 'radium';
import PhotoDisplayer from './PhotoDisplayer';

export interface Photo {
  src: string;
  placeholderImageSrc: string;
  height: number;
  width: number;
  uploadProgress: number;
  statusText?: string;
}

const Photo = ({ src, height, width, placeholderImageSrc, uploadProgress, statusText, ...rest }: Photo) => {
  return (
    <div style={styles.container}>
      <PhotoDisplayer
        mainImageSrc={src}
        originalHeight={height}
        originalWidth={width}
        placeholderImageSrc={placeholderImageSrc}
        statusText={statusText}
        progressBarPercent={uploadProgress}
        {...rest}
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
