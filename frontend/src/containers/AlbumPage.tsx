import * as React from 'react';
import { Component } from 'react';
import * as Radium from 'radium';
import 'isomorphic-fetch';
import { AImage } from '../PicDrop';
import PhotoCard from '../components/PhotoCard';
import ContentEditable from '../components/ContentEditable';

const styles = {
  title: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1rem',
  },
  albumHeader: {
    padding: '1rem',
  },
  albumFooter: {
    padding: '1rem',
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

const getProgressBarStyles = (progress: number = 0) => {
  if (progress === 0) {
    return null;
  }
  return {
    position: 'fixed',
    top: '50',
    left: '0',
    height: '4px',
    zIndex: 3,
    width: `${progress}%`,
    backgroundColor: '#6CB0FF',
    transition: '2s width ease-out',
  }
};


export interface AlbumPageProps {
  photos?: AImage[];
  albumId?: string;
  [idx: string]: any;
  match?: any;
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
    console.log('mounting albumpage', this);
    if (this.state.photos.length === 0) {
      console.log('no photos pregiven');
      const id = this.props.match.params.id;
      const endpoint = `https://1am8vv38ug.execute-api.us-east-1.amazonaws.com/dev/collection/${id}/entries`;
      const x: any = await fetch(endpoint).then(x => x.json());
      console.log(x, id);
      const files: Array<any> = x.files;
      console.log(files);
      const photos: AImage[] = files.map(file => ({
        src: `https://image-service-jj-02.s3.amazonaws.com/${file.s3key}`,
        name: file.id,
        width: file.width,
        height: file.height,
      }));

      console.log(photos);
      this.setState({
        photos,
      });
    }
  }

  onAlbumTitleChange(e) {
    const newTitle: string = e.target.value;
    console.log('hey i should probably update the database yo!');
    // debounce(editAlbumTitle(newTitle)) or something...
    this.setState({ albumTitle: newTitle });
  }



  render() {
    const photos = this.state.photos;

    const totalUploadedData = this.state.photos
      .map(photo => photo.uploadedAmount)
      .reduce((total, photoUploadAmt) => total += photoUploadAmt, 0);

    const totalFilesSize = this.state.photos
      .map(photo => photo.size)
      .reduce((total, photoSize) => total += photoSize, 0);
    const totalProgressPercent = 100 * (totalUploadedData / totalFilesSize);
    console.log(totalProgressPercent);
    return (
      <div>
        <div>
          <div style={getProgressBarStyles(totalProgressPercent)}></div>
        </div>
        <div style={styles.albumHeader}>
          <div style={styles.title}> 
            <ContentEditable
              onChange={this.onAlbumTitleChange}
              html={this.state.albumTitle}
            >
            </ContentEditable>
          </div>
          <div style={styles.subtitle}>
            Uploaded 7 min ago
          </div>
        </div>

        <div>
          {photos
            ? photos.map(photo =>
              <PhotoCard
                key={photo.name}
                statusText={getStatusText(photo)}
                uploadProgress={photo['percentUploaded'] < 100 ? photo['percentUploaded'] : null}
                src={photo.src}
                height={photo.height}
                width={photo.width}
                placeholderImageSrc={photo.previewUrl}
              />)
            : null}
        </div>
        <div style={styles.albumFooter}>


          {'meow'}
        </div>
      </div>
    );
  }
}

const getStatusText = (photo) => {
  let percentUploaded = null;
  if (photo.size && (photo.uploadedAmount || photo.uploadedAmount === 0)) {
    percentUploaded = 100 * (photo.uploadedAmount / photo.size)
  }
  return (!percentUploaded && percentUploaded !== 0)
    ? null
    : (percentUploaded >= 0 && percentUploaded < 100)
      ? `${Math.round(percentUploaded)}%`
      : 'Processing';
}

const changeFileDescription = (fileKey: string, newDescription: string) => {
  throw Error('Not yet implemented');
}

export default Radium(AlbumPage);
