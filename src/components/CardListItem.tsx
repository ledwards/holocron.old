import React, { PureComponent } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image'

import { ListItem } from 'react-native-elements';

class CardListItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const lightColor = 'rgba(219, 227, 232, 1.0)';
    const darkColor = `rgba(43, 47, 51, 1.0)`;
    const alpha = '0.3';

    return (
      <ListItem
        button
        onPress={this.props.callback}
        containerStyle={{ backgroundColor: this.props.item.side == 'Dark' ? darkColor : lightColor, overflow: 'hidden' }}>
        <View style={{ position: 'absolute', top: 0, right: -60, width: '60%', height: 120, overflow: 'hidden' }}>
          <FastImage
            source={{ uri: this.props.item.imageUrl }}
            style={{
              position: 'relative',
              left: -30,
              top: 0,
              width: '100%',
              height: '100%',
            }}
          />
        </View>

        <ListItem.Content style={{}}>
          <ListItem.Title style={{
            backgroundColor: this.props.item.side == 'Light' ? lightColor.replace('1.0', alpha) : darkColor.replace('1.0', alpha),
            color: this.props.item.side == 'Light' ? darkColor : lightColor,
            fontWeight: 'bold'
          }}>
            {`${this.props.item.displayTitle}`}
          </ListItem.Title>
          <ListItem.Subtitle style={{
            backgroundColor: this.props.item.side == 'Light' ? lightColor.replace('1.0', alpha) : darkColor.replace('1.0', alpha),
            color: this.props.item.side == 'Light' ? darkColor : lightColor
          }}
          >
            {`${this.props.item.set} • ${this.props.item.side} • ${this.props.item.rarity}`}
          </ListItem.Subtitle>
        </ListItem.Content>

      </ListItem>
    );
  }
}

export default CardListItem;
