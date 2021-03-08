import React, { Component } from 'react';
import { Button, View, Text, FlatList, SafeAreaView, ScrollView } from 'react-native';

export default class CurrencyScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currency: []
    }
  }

  async componentDidMount() {
    try {
      await this.getCurrency();
    } catch (err) {
      console.error(err);
    }
  }

  async getCurrency() {
    await fetch('http://192.168.56.1:8080/currency/all', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          currency: responseJson
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
          data={this.state.currency}
          keyExtractor={item => item.currency}
          ListHeaderComponent={() => {
            return (
              <View style={{ flex: 1, flexDirection: 'row', width: '100%', height: '100%', marginBottom: 10, backgroundColor:'silver' }}>
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
                <Text style={{ width: '40%', fontSize: 18, textAlign: 'left', fontSize: 16 }}>{item.currency != "" ? item.currency : item.country}</Text>
                <Text>{" "}</Text>
                <Text style={{ width: '30%', fontSize: 18, textAlign: 'left', fontSize: 16 }}>{item.averageExchange}</Text>
                <Text>{" "}</Text>
                <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontSize: 16 }}>{item.percentageChange}</Text>
              </View>
            )
          }}
        />
      </View>
    );
  }
}