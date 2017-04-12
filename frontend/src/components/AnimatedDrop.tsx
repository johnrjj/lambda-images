// import Animated from 'animated';
import * as React from 'react';
import * as Animated from 'animated/lib/targets/react-dom';
import style from 'styled-components';
import { ReactNode, Component, CSSProperties } from 'react';
import { headerHeight } from '../design-tokens';

class Attempt extends React.Component<any, any> {
  widthAnimFullscreen;
  heightAnimFullscreen;
  roundToStraightBorderRadiusAnim;
  opacityFadeAnimFullscreen;
  marginTopHideAnimFullscreen;

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

    this.marginTopHideAnimFullscreen = animFullscreen.interpolate({
      inputRange: [0, 1],
      outputRange: [headerHeight, '0px'],
    });

    this.state = {
      anim: new Animated.Value(1),
      animFullscreen,
    }

    this.handleSpringDown = this.handleSpringDown.bind(this);
    this.handleSpringUp = this.handleSpringUp.bind(this);
    this.handleStartMaximize = this.handleStartMaximize.bind(this);
    this.handleResizeToFullscreenAnimEnd = this.handleResizeToFullscreenAnimEnd.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.pressed === true && nextProps.pressed === false) {
      this.handleSpringUp();
    }
    if (this.props.pressed === false && nextProps.pressed === true) {
      this.handleSpringDown();
    }

    if (this.props.fullscreen === false && nextProps.fullscreen === true) {
      console.log('trying to maximize!');
      const fuzz = 0;
      const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      this.heightAnimFullscreen = this.state.animFullscreen.interpolate({
        inputRange: [0, 1],
        outputRange: ['690px', `${h + fuzz - 52}px`] // height of header...extract...
      });
      this.widthAnimFullscreen = this.state.animFullscreen.interpolate({
        inputRange: [0, 1],
        outputRange: ['720px', `${w + fuzz}px`]
      });
      this.handleStartMaximize();
    }
  }

  handleStartMaximize() {
    console.log('trying to maximize2');
    return Animated.timing(this.state.animFullscreen, { toValue: 1, onUpdate: () => console.log('moo'), onEnd: () => console.log('meowww') }).start();
  }

  handleResizeToFullscreenAnimEnd() {
    console.log('test.tsx, anim done');
    this.props.onResizeToFullscreenAnimEnd();
  }

  render() {
    // div (shadowbox, concerned on shadow/sizing)
    // div (content container, displays contents or not)
    return (
      <Animated.div
        className={this.props.className}
        style={{
          willChange: 'transform',
          transform: [{ scale: this.state.anim }],
          maxHeight: this.heightAnimFullscreen || '690px',
          maxWidth: this.widthAnimFullscreen || '720px',
          marginTop: this.marginTopHideAnimFullscreen || headerHeight,
          height: '100%',
          borderRadius: this.roundToStraightBorderRadiusAnim || '14px',
          width: '100%',
        }}
      >
        <Animated.div
          style={{
            willChange: 'opacity',
            opacity: this.opacityFadeAnimFullscreen || 1,
          }}>
          {this.props.children}
        </Animated.div>
      </Animated.div>
    );
  }

  handleSpringDown() {
    console.log('down');
    Animated.spring(this.state.anim, { toValue: 1.05 }).start();
  }
  handleSpringUp() {
    console.log('up');
    Animated.spring(this.state.anim, { toValue: 1, friction: 2.0, }).start();
  }
}

export default Attempt;