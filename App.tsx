/**
 * @format
 */

import React from 'react';
import { SafeAreaView } from 'react-native';
import SearchableCardList from './src/SearchableCardList';

const App = () => (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <SearchableCardList />
  </SafeAreaView>
);

export default App;
