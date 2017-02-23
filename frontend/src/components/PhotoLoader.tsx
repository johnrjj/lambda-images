import * as React from 'react';
import { Component } from 'react';
import { CSSProperties } from 'react';

const { PropTypes } = React;
const { span } = React.DOM;

const Status = {
  PENDING: 'pending',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed',
};

export interface ImageLoadProps {
  src: string;
  onLoad?(e: Event): void;
  onError?(e: Error): void;
  preloader?(): Component<any, any>;
  imgProps?: any;
}

export interface ImageLoadState {
  status: string;
}

class ImageLoader extends Component<ImageLoadProps, ImageLoadState> {

  img: HTMLImageElement;

  static propTypes = {
    wrapper: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    preloader: PropTypes.func,
    src: PropTypes.string,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    imgProps: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      status: props.src
        ? Status.LOADING
        : Status.PENDING,
    };
  }

  componentDidMount() {
    if (this.state.status === Status.LOADING) {
      this.createLoader();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({
        status: nextProps.src ? Status.LOADING : Status.PENDING,
      });
    }
  }

  componentDidUpdate() {
    if (this.state.status === Status.LOADING && !this.img) {
      this.createLoader();
    }
  }

  componentWillUnmount() {
    this.destroyLoader();
  }

  createLoader() {
    this.destroyLoader();  // We can only have one loader at a time.

    this.img = new Image();
    this.img.onload = this.handleLoad.bind(this);
    this.img.onerror = this.handleError.bind(this);
    this.img.src = this.props.src;
  }

  destroyLoader() {
    if (this.img) {
      this.img.onload = null;
      this.img.onerror = null;
      this.img = null;
    }
  }

  handleLoad(event) {
    this.destroyLoader();
    this.setState({ status: Status.LOADED });

    if (this.props.onLoad) this.props.onLoad(event);
  }

  handleError(error) {
    this.destroyLoader();
    this.setState({ status: Status.FAILED });

    if (this.props.onError) this.props.onError(error);
  }

  renderImg() {
    const { src, imgProps } = this.props;
    let props = { src };

    for (let k in imgProps) {
      if (imgProps.hasOwnProperty(k)) {
        props[k] = imgProps[k];
      }
    }

    return <img {...props} />;
  }

  render() {
    return (
      <div>
        { this.state.status === Status.LOADED
          ? this.renderImg()
          : this.state.status === Status.FAILED
            ? this.props.children
            : this.props.preloader() }
      </div>
    )
  }
}