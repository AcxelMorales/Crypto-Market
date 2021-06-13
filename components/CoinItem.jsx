import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CoinItem = ({
  item: { name, image, symbol, current_price, price_change_percentage_24h },
}) => {
  return (
    <View style={styles.containerItem}>
      <View style={styles.coinBox}>
        <Image
          style={styles.imageItem}
          source={{
            uri: image,
          }}
        />
        <Text style={styles.textWhite}>{name}</Text>
        <Text style={styles.textSymbol}>{symbol}</Text>
      </View>
      <View style={styles.boxInfo}>
        <Text
          style={[
            styles.pricePercentage,
            price_change_percentage_24h > 0 ? styles.priceUp : styles.priceDown,
          ]}
        >
          {Number(price_change_percentage_24h).toFixed(2)}%
        </Text>
        <Text style={styles.textWhite}>${Number(current_price).toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: 'transparent',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  coinBox: {
    flexDirection: 'row',
  },
  textWhite: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  textSymbol: {
    color: '#434343',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  imageItem: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  boxInfo: {
    flexDirection: 'column',
  },
  pricePercentage: {
    color: 'white',
    marginRight: 10,
    fontWeight: 'bold',
    textAlign: 'right',
    width: '100%',
    marginBottom: 2
  },
  priceUp: {
    color: '#50af0f',
  },
  priceDown: {
    color: '#fc4422',
  },
});

export default CoinItem;
