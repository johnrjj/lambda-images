import * as React from 'react';
import * as Radium from 'radium';
import { File } from '../PicDrop';
import PhotoCard from '../components/PhotoCard';

export interface AlbumPageProps {
  photos: File[];
  [idx: string]: any;
}

const styles = {
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
}

const AlbumPage = ({ match, photos, ...rest }: AlbumPageProps) => {
  console.log(photos, rest);
  return (
    <div>
      <div style={styles.title}>
        album title
      </div>
      <div>
        {photos ? photos.map(photo => <PhotoCard key={photo.name} src={photo.previewUrl} />) : null}
      </div>
    </div>

  );
};

export default Radium(AlbumPage);
