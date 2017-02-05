import * as React from 'react';
import * as Radium from 'radium';
import { File } from '../PicDrop';
import PhotoCard from '../components/PhotoCard';

export interface AlbumPageProps {
  photos: File[];
  [idx: string]: any;
}

const AlbumPage = ({ match, photos, ...rest }: AlbumPageProps ) => {
  console.log(photos, rest);
  return (
    <div>
      hello
      {photos ? photos.map(photo => <PhotoCard key={photo.name} src={photo.previewUrl} />) : null}
    </div>
  );
};

export default Radium(AlbumPage);
