import React from 'react';
import { View, Button, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Animated } from 'react-native';

export default class extends React.Component {
  state = {
    toggle: false
  }
  componentWillMount() {
    this.position = new Animated.ValueXY(0, 0);
  }

  transformAnimation = () => {
    if (this.state.toggle) {
      Animated.spring(this.position, {
        toValue: { x: 0, y: 0 }
      }).start();
      this.setState({ toggle: false });
      return
    }
    Animated.spring(this.position, {
      toValue: { x: 200, y: 400 }
    }).start();
    this.setState({ toggle: true });
  }

  handlePress = (e) => {
    const { pageX, pageY } = e.nativeEvent;
    console.log(e.nativeEvent.pageX, e.nativeEvent.pageY, 'handlePress');
    Animated.spring(this.position, {
      toValue: { x: pageX - 30, y: pageY - 90 }
    }).start();
  }

  render() {
    console.log(this.position, 'position')

    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View style={{ marginTop: 25, height: '100%' }} >
          <Button onPress={this.transformAnimation} title="Click" />
          <Animated.View style={this.position.getLayout()}>
            <View style={style.ball} />

          </Animated.View>
        </View>
      </TouchableOpacity>
    )
  }
}

style = {
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: 'purple'
  }
}