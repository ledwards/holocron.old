import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, ImageBackground } from 'react-native';
import { ListItem, SearchBar, Avatar } from 'react-native-elements';
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

    const lightColor = '#E2E8ED';
    const darkColor = '#3A3E42';

    return (
      <View style={{ flex: 1, overflow: 'hidden', backgroundColor: 'black' }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem containerStyle={{ backgroundColor: item.side == 'Dark' ? darkColor : lightColor, overflow: 'hidden' }}>
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

              {/* <Avatar rounded source={{ uri: item.imageUrl }} /> */}

              <ListItem.Content style={{}}>
                <ListItem.Title style={{ color: item.side == 'Light' ? darkColor : lightColor, fontWeight: 'bold' }}>
                  {`${item.displayTitle}`}
                </ListItem.Title>
                <ListItem.Subtitle style={{ color: item.side == 'Light' ? darkColor : lightColor }}>
                  {`${item.type} ${item.subType ? '- ' + item.subType : ''}`}
                </ListItem.Subtitle>
              </ListItem.Content>

            </ListItem>
          )
          }
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

export default SearchableCardList;
