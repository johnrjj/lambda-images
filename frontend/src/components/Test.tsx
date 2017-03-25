// import Animated from 'animated';
import * as React from 'react';
import * as Animated from 'animated/lib/targets/react-dom';

import { ReactNode, Component, CSSProperties } from 'react';

import style from 'styled-components';


class Attempt extends React.Component<any, any> {
  widthAnimFullscreen;
  heightAnimFullscreen;
  roundToStraightBorderRadiusAnim;
  opacityFadeAnimFullscreen;
  constructor(props) {
    super(props);

    // 0 is shadow box, 1 is full screen...
    const animFullscreen = new Animated.Value(0);

    // hacky af workaround because onEnd listened for animated is not working!!! agh
    animFullscreen.addListener(({ value }) => value === 1.0 && this.handleResizeToFullscreenAnimEnd());

    this.roundToStraightBorderRadiusAnim = animFullscreen.interpolate({
      inputRange: [0, 1],
      outputRange: ['14px', `0px`],
    });

    this.opacityFadeAnimFullscreen = animFullscreen.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    this.state = {
      anim: new Animated.Value(1),
      animFullscreen,
    }
    
    this.handleSpringDown = this.handleSpringDown.bind(this);
    this.handleSpringUp = this.handleSpringUp.bind(this);
    this.handleResizeToFullscreenAnimEnd = this.handleResizeToFullscreenAnimEnd.bind(this);
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
          outputRange: ['690px', `${h + fuzz - 72}px`] // height of header...
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

  handleResizeToFullscreenAnimEnd() {
    console.log('test.tsx, anim done');
    this.props.onResizeToFullscreenAnimEnd();
  }

  render() {
    // console.log( this.state.animFullscreen, this.state.anim);

    // div (shadowbox, concerned on shadow/sizing)
    //   div (content container, displays contents or not)
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

      <Animated.div
        style={{ 
            opacity: this.opacityFadeAnimFullscreen || 1,
        }}>

        { this.props.children }
        </Animated.div>
      </Animated.div>
    );
  }

  handleSpringDown() {
    // Animated.spring(this.state.fullscren)
    Animated.timing(this.state.animFullscreen, { toValue: 1, onUpdate: () => console.log('moo'), onEnd: () => console.log('meowww')}).start();
  }
  handleSpringUp() {
    Animated.spring(this.state.animFullscreen, { toValue: 0,  onEnd: () => console.log('test')}).start();

    // Animated.spring(this.state.anim, { toValue: 1,       friction: 3,       }).start();
  }

}

export default Attempt;