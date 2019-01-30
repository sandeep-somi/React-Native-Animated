import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Ball from './src/Ball';
import Deck from './src/Deck';

import { Card, ListItem, Button, Icon } from 'react-native-elements'


const Data = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
]

export default class App extends React.Component {

    renderCard = (item, key) => {

    return (
      <Card image={{ uri: item.uri }} key={key}>
        <Text style={{ fontWeight: '800', paddingTop: 8, paddingBottom: 8, fontSize: 14  }}>{item.text}</Text>
        <Text>Description will be here, I can further customize the card...</Text>
        <Button title="View Now" backgroundColor="#03A9F4" icon={{ name: 'code' }} />
      </Card>
    )
    }
  
  onSwipeLeft = (item) => {
    console.log('onSwipeLeft');
  }

  renderNoMoreCards = () => {
    return (
      <Card>
        <Text>No more content available</Text>
        <Button title="View Now" disabled backgroundColor="#03A9F4" icon={{ name: 'code' }} />
      </Card>
    )
  }

  onSwipeRight = (item) => {
    console.log('onSwipeRight');
  }
  render() {
    return (
      <View>
        <Deck
          data={Data}
          renderCard={this.renderCard}
          onSwipeLeft={this.onSwipeLeft}
          onSwipeRight={this.onSwipeRight}
          renderNoMoreCards={this.renderNoMoreCards}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
