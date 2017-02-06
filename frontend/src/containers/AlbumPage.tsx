import * as React from 'react';
import { Component } from 'react';
import * as Radium from 'radium';
import { File } from '../PicDrop';
import PhotoCard from '../components/PhotoCard';

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
  photos: File[];
  [idx: string]: any;
}

export interface AlbumPageState {
  albumTitle: string;
}

class AlbumPage extends Component<AlbumPageProps, AlbumPageState> {
  constructor(props) {
    super(props);
    this.state = {
      albumTitle: 'Give your album a title',
    };
    this.onAlbumTitleChange = this.onAlbumTitleChange.bind(this);
  }

  onAlbumTitleChange(e) {
    const newTitle: string = e.target.value;
    this.setState({ albumTitle: newTitle });
  }

  render() {
    return (
      <div>
        <div style={styles.header}>
          <div style={styles.title}>
            album title
        </div>
          <div style={styles.subtitle}>
            subtitle
          </div>
        </div>
        <div>
          {this.props.photos ? this.props.photos.map(photo => <PhotoCard key={photo.name} src={photo.previewUrl} />) : null}
        </div>
      </div>
    );
  }
}

export default Radium(AlbumPage);

// {/*<input
//   type="text"
//   value={this.state.albumTitle}
//   onChange={this.onAlbumTitleChange}
//   style={styles.input}
// />*/}