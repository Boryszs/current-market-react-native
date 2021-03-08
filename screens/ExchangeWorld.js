import React, { Component } from 'react';
import { Button, View, Text, FlatList, SafeAreaView, ScrollView } from 'react-native';

export default class ExchangeWorld extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      wExchange: []
    }
  }
  async componentDidMount() {
    try {
      await this.getPlExchamge();
    } catch (err) {
      console.error(err);
    }
  }

  async getPlExchamge() {
    await fetch('http://192.168.56.1:8080/exchange/w/all', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          wExchange: responseJson
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
          data={this.state.wExchange}
          keyExtractor={item => item.name}
          ListHeaderComponent={() => {
            return (
              <View style={{ flex: 1, flexDirection: 'row', width: '100%', height: '100%', marginBottom: 10, backgroundColor:'silver'  }}>
                <Text style={{ width: '20%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Name.'}</Text>
                <Text>{" "}</Text>
                <Text style={{ width: '48%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Course.'}</Text>
                <Text>{" "}</Text>
                <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Change.'}</Text>
              </View>)
          }}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={{ flex: 1, flexDirection: 'row', width: '100%', height: '100%', marginLeft: 10, marginBottom: 15 }}>
                <Text style={{ width: '40%', fontSize: 18, textAlign: 'left', fontSize: 16 }}>{item.name}</Text>
                <Text>{" "}</Text>
                <Text style={{ width: '30%', fontSize: 18, textAlign: 'left', fontSize: 16 }}>{item.course}</Text>
                <Text>{" "}</Text>
                <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontSize: 16 }}>{item.change}</Text>
              </View>
            )
          }}
        />
      </View>
    )
  }

}