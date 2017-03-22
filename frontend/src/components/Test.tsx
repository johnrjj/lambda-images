// import Animated from 'animated';
import * as React from 'react';
import * as Animated from 'animated/lib/targets/react-dom';

import { ReactNode, Component, CSSProperties } from 'react';

import style from 'styled-components';


class Attempt extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      anim: new Animated.Value(1),
    }
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  render() {
    return (
      <div>
      <Animated.div
        style={{transform: [{scale: this.state.anim}]}}
        className="circle"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}>
        Press
      </Animated.div>
      </div>
    );
  }

  handleMouseDown() {
    Animated.spring(this.state.anim, { toValue: 0.8 }).start();
  }
  handleMouseUp() {
    Animated.spring(this.state.anim, { toValue: 1 }).start();
  }

}

export default Attempt;