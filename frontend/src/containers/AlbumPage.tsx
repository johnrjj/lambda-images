import * as React from 'react';
import { Component } from 'react';
import * as Radium from 'radium';
import 'isomorphic-fetch';
import { AImage } from '../PicDrop';
import PhotoCard from '../components/PhotoCard';
import SimpleInput from '../components/SimpleInput';

const styles = {
  title: {
    fontSize: '2rem',
  },
  subtitle: {
    fontSize: '1rem',
  },
  header: {
    marginBottom: '2rem',
  },
  input: {
    backgroundColor: 'inherit',
    border: 'none',
    boxShadow: 'none',
    ':focus': {
      outline: 'none',
    },
    ':hover': {
      color: '#000',
    },
    after: {
      outline: 'none',
      borderBottom: 'none',
    },
    color: '#555459',
  },
}

export interface AlbumPageProps {
  photos: AImage[];
  albumId: string;
  [idx: string]: any;
}

export interface AlbumPageState {
  albumTitle: string;
  photos: AImage[];
}

class AlbumPage extends Component<AlbumPageProps, AlbumPageState> {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      albumTitle: 'Give your album a title',
      photos: props.photos || [],
    };
    this.onAlbumTitleChange = this.onAlbumTitleChange.bind(this);
  }

  async componentDidMount() {
    if (this.state.photos.length === 0) {
      console.log('no photos pregiven');
      const id = this.props.match.params.id;
      const endpoint = `https://1am8vv38ug.execute-api.us-east-1.amazonaws.com/dev/collection/${id}/entries`;
      const x: any = await fetch(endpoint).then(x => x.json());
      console.log(x, id);
      const files: Array<any> = x.files;
      console.log(files);
      const photos: AImage[] = files.map(file => ({ src: `https://image-service-jj-02.s3.amazonaws.com/${file.s3key}` }))

      console.log(photos);
      this.setState({
        photos,
      });
    }
  }

  onAlbumTitleChange(e) {
    const newTitle: string = e.target.value;
    this.setState({ albumTitle: newTitle });
  }

  render() {
    return (
      <div>
        <div>
          {this.state.photos
            ? this.state.photos.map(photo =>
              <PhotoCard
                key={photo.name}
                statusText={
                  !photo.percentUploaded
                    ? null
                    : (photo.percentUploaded >= 0 && photo.percentUploaded < 100 )
                      ? `${Math.round(photo.percentUploaded)}%`
                      : 'Processing'}
                uploadProgress={photo.percentUploaded < 100 ? photo.percentUploaded : null}
                src={photo.src}
                height={photo.height}
                width={photo.width}
                placeholderImageSrc={photo.previewUrl}
              />)
            : null}
        </div>
      </div>
    );
  }
}

const changeFileDescription = (fileKey: string, newDescription: string) => {
  throw Error('Not yet implemented');
}

export default Radium(AlbumPage);
