// import Animated from 'animated';
import * as React from 'react';
import * as Animated from 'animated/lib/targets/react-dom';

import { ReactNode, Component, CSSProperties } from 'react';

import style from 'styled-components';


class Attempt extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      anim: new Animated.Value(1),
    }
    this.handleSpringDown = this.handleSpringDown.bind(this);
    this.handleSpringUp = this.handleSpringUp.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.pressed === true &&  nextProps.pressed === false) {
      this.handleSpringUp();
    } 
    if (this.props.pressed === false && nextProps.pressed === true) {
      this.handleSpringDown();
    }
  }

  render() {
    return (
      <Animated.div
        className={this.props.className}
        style={{transform: [{scale: this.state.anim}]}}
      >
        { this.props.children }
      </Animated.div>
    );
  }

  handleSpringDown() {
    Animated.spring(this.state.anim, { toValue: 1.05 }).start();
  }
  handleSpringUp() {
    Animated.spring(this.state.anim, { toValue: 1,       friction: 3,       }).start();
  }

}

export default Attempt;