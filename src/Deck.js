import React, { Component } from 'react';
import { View, Text, Animated, PanResponder, Dimensions } from 'react-native';

const SCREEN = Dimensions.get('window');
const SWIPE_THRESHOLD = 0.25 * SCREEN.width;
const DURATION = 250

export default class extends Component {
  static defaultProps = {
    onSwipeLeft: () => { console.log('onSwipeLeft function is not defined') },
    onSwipeRight: () => { console.log('onSwipeRight function is not defined') },
    data: [],
    renderNoMoreCards: () => { console.log('render no more cards is not defined') }
  }
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        this.position.setValue({ x: gesture.dx, y: 0 });
      },
      onPanResponderRelease: (e, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('RIGHT');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('LEFT');
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = {
      activeIndex: 0
    }
  }

  forceSwipe = (dir) => {
    let width = dir === 'RIGHT' ? SCREEN.width + 100 : -(SCREEN.width + 100);
    Animated.timing(this.position, {
      toValue: { x: width + 100, y: 0 },
      duration: DURATION
    }).start(() => {
      this.onSwipeComplete(dir);
    });
  }

  onSwipeComplete = (dir) => {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.activeIndex];
    dir === 'LEFT' ? onSwipeLeft(item) : onSwipeRight(item);
    this.position.setValue({ x: 0, y: 0 });
    this.setState({ activeIndex: this.state.activeIndex + 1 })
  }

  resetPosition = () => {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getCardStyle = () => {
    const rotate = this.position.x.interpolate({
      inputRange: [-SCREEN.width * 4, 0, SCREEN.width * 4],
      outputRange: ['-20deg', '0deg', '20deg']
    })

    return {
      ...this.position.getLayout(),
      transform: [{ rotate }]
    }
  }


  renderCards = () => {
    if (this.state.activeIndex >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }
    return this.props.data.map((item, key) => {
      if (key < this.state.activeIndex) {
        return null
      }

      if (key === this.state.activeIndex) {
        return (
          <Animated.View key={key} style={this.getCardStyle()} {...this.panResponder.panHandlers}>
            {this.props.renderCard(item, key)}
          </Animated.View>
        )
      }

      return this.props.renderCard(item, key);
    })
  }

  render() {

    return (
      <Animated.View>
        {this.renderCards()}
      </Animated.View>
    )
  }
}
