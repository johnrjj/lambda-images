// import Animated from 'animated';
import * as React from 'react';
import * as Animated from 'animated/lib/targets/react-dom';

import { ReactNode, Component, CSSProperties } from 'react';

import style from 'styled-components';


class Attempt extends React.Component<any, any> {
  widthAnimFullscreen;
  heightAnimFullscreen;
  roundToStraightBorderRadiusAnim;
  constructor(props) {
    super(props);

    // 0 is shadow box, 1 is full screen...
    const animFullscreen = new Animated.Value(0);

    this.roundToStraightBorderRadiusAnim = animFullscreen.interpolate({
      inputRange: [0, 1],
      outputRange: ['14px', `0px`]
    });

    this.state = {
      anim: new Animated.Value(1),
      animFullscreen,
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
      const fuzz = 0;
      const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        this.heightAnimFullscreen = this.state.animFullscreen.interpolate({
          inputRange: [0, 1],
          outputRange: ['680px', `${h + fuzz}px`]
        });
        this.widthAnimFullscreen = this.state.animFullscreen.interpolate({
          inputRange: [0, 1],
          outputRange: ['760px', `${w + fuzz}px`]
        });
        // console.log(this.interpolate);
    }

    if (this.props.fullscreen === false && nextProps.fullscreen === true) {

    }
  }

  render() {
    console.log( this.state.animFullscreen, this.state.anim);
    return (
      <Animated.div
        className={this.props.className}
        style={{ 
            transform: [{scale: this.state.anim}, 'translate(-50%,-50%)'],
            maxHeight: this.heightAnimFullscreen || '690px',
            maxWidth: this.widthAnimFullscreen || '760px',
            height:  '100%',
            borderRadius: this.roundToStraightBorderRadiusAnim || '14px',

            width: '100%',
        }}
      >
        { this.props.children }
      </Animated.div>
    );
  }

  handleSpringDown() {
    // Animated.spring(this.state.fullscren)
    Animated.spring(this.state.animFullscreen, { toValue: 1}).start();
  }
  handleSpringUp() {
    Animated.spring(this.state.animFullscreen, { toValue: 0}).start();

    // Animated.spring(this.state.anim, { toValue: 1,       friction: 3,       }).start();
  }

}

export default Attempt;