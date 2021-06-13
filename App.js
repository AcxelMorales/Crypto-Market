import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import CoinItem from './components/CoinItem';

const App = () => {
  const [conins, setConins] = useState([]);
  const [search, setSearch] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getDataAPI();
  }, []);

  const getDataAPI = () => {
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    )
      .then((resp) => resp.json())
      .then((data) => setConins(data));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#141414" />
      <View style={styles.header}>
        <Text style={styles.textHeader}>CryptoMarket</Text>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#858585"
          autoCapitalize="none"
          style={styles.searchInput}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <FlatList
        style={styles.list}
        data={
          conins.filter((c) => c.name.toLowerCase().includes(search)) ||
          conins.filter((c) => c.symbol.toLowerCase().includes(search))
        }
        renderItem={({ item }) => {
          return <CoinItem item={item} />;
        }}
        showsVerticalScrollIndicator={false}
        refreshing={refresh}
        onRefresh={async () => {
          setRefresh(true);
          await getDataAPI();
          setRefresh(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    alignItems: 'center',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    paddingTop: 15,
    paddingBottom: 20,
  },
  list: {
    width: '90%',
  },
  textHeader: {
    color: 'white',
    fontSize: 20,
  },
  searchInput: {
    color: 'white',
    borderBottomColor: '#4657CE',
    borderBottomWidth: 1,
    width: '30%',
  },
});

export default App;
