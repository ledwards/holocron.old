import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, Alert, Modal, Pressable } from 'react-native';

import { ListItem, SearchBar } from 'react-native-elements';

import Card from './models/Card'
import darkCards from '../data/Dark.json';
import lightCards from '../data/Light.json';

class SearchableCardList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      modalVisible: false,
      currentCard: null,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.loadAllCards();
  }

  loadAllCards = () => {
    this.setState({ loading: true });

    const allCards = [...darkCards.cards, ...lightCards.cards]
      .map(c => new Card(c))
      .filter(c => !c.title.includes('(AI)'))
      .sort((a, b) => (a.sortTitle > b.sortTitle) ? 1 : ((b.sortTitle > a.sortTitle) ? -1 : 0))

    this.setState({
      data: allCards,
      error: null,
      loading: false,
    });
    this.arrayholder = allCards;
  };

  renderSeparator = () => {
    return (
      <View style={{ height: 1, backgroundColor: '#000000' }} />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(card => {
      const itemData = `${card.title.toLowerCase()}`;
      const textData = text.toLowerCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search"
        darkTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    const lightColor = 'rgba(219, 227, 232, 1.0)';
    const darkColor = `rgba(43, 47, 51, 1.0)`;
    const alpha = '0.3';

    return (
      <View style={{ flex: 1, overflow: 'hidden', backgroundColor: 'black' }}>
        <FlatList
          data={this.state.data}
          initialNumToRender={10}
          renderItem={({ item }) => (
            <ListItem
              button
              onPress={() => this.setState({ modalVisible: !this.state.modalVisible, currentCard: item })}
              containerStyle={{ backgroundColor: item.side == 'Dark' ? darkColor : lightColor, overflow: 'hidden' }}>
              <View style={{ position: 'absolute', top: 0, right: -60, width: '60%', height: 120, overflow: 'hidden' }}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{
                    position: 'relative',
                    left: -30,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                  }}
                />
              </View>

              <ListItem.Content style={{}}>
                <ListItem.Title style={{
                  backgroundColor: item.side == 'Light' ? lightColor.replace('1.0', alpha) : darkColor.replace('1.0', alpha),
                  color: item.side == 'Light' ? darkColor : lightColor,
                  fontWeight: 'bold'
                }}>
                  {`${item.displayTitle}`}
                </ListItem.Title>
                <ListItem.Subtitle style={{
                  backgroundColor: item.side == 'Light' ? lightColor.replace('1.0', alpha) : darkColor.replace('1.0', alpha),
                  color: item.side == 'Light' ? darkColor : lightColor
                }}
                >
                  {`${item.displayType}${item.displaySubType ? ' - ' : ''}${item.displaySubType}\r\n`}
                  {`${item.set} • ${item.side} • ${item.rarity}`}
                </ListItem.Subtitle>
              </ListItem.Content>

            </ListItem>
          )
          }
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          style={{ alignItems: 'center', elevation: 5 }}
          onRequestClose={() => { this.setState({ modalVisible: !this.state.modalVisible, currentCard: null }); }}>
          <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.80)',
          }}>
            <Pressable style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
              onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}>
              <Image
                source={{ uri: this.state.currentCard ? this.state.currentCard.imageUrl : '' }}
                style={{ width: '100%', aspectRatio: 0.7136, borderRadius: 15 }}
              />
            </Pressable>
          </View>
        </Modal>
      </View>
    );
  }
}

export default SearchableCardList;
