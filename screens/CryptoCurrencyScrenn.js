import React, { Component } from 'react';
import { Button, View, Text, FlatList, SafeAreaView, ScrollView } from 'react-native';

export default class CryptoCurrencyScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      crypto: []
    }
  }

  async componentDidMount() {
    try {
      await this.getCryptoCurrency();
    } catch (err) {
      console.error(err);
    }
  }

  async getCryptoCurrency() {
    await fetch('http://192.168.56.1:8080/crypt-currency/important', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          crypto: responseJson
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
            data={this.state.crypto}
            keyExtractor={item => item.name}
            ListHeaderComponent={() => {
              return (
              <View style={{ flex: 1, flexDirection: 'row', width: '100%', height: '100%', marginLeft: 10, marginBottom: 10 }}>
              <Text style={{ width: '20%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Name.'}</Text>
              <Text>{" "}</Text>
              <Text style={{ width: '48%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Average value.'}</Text>
              <Text>{" "}</Text>
              <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Change.'}</Text>
            </View>)
            }}
            renderItem={({ item, index }) => {
              return (
                <View key={index} style={{ flex: 1, flexDirection: 'row', width: '100%', height: '100%', marginLeft: 10, marginBottom: 15 }}>
                  <Text style={{ width: '22%', fontSize: 18, textAlign: 'left', fontSize: 16 }}>{item.name}</Text>
                  <Text>{" "}</Text>
                  <Text style={{ width: '54%', fontSize: 18, textAlign: 'center', fontSize: 16 }}>{item.courseAverage}</Text>
                  <Text>{" "}</Text>
                  <Text style={{ width: '24%', fontSize: 18, textAlign: 'left', fontSize: 16 }}>{item.change}</Text>
                </View>
              )
            }}
          />
      </View>
    );
  }
}