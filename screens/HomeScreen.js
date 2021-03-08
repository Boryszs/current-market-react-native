import React, { Component } from 'react';
import { Button, View, Text, FlatList, SafeAreaView, ScrollView } from 'react-native';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      crypto: [],
      currency: [],
      plExchange: [],
      wExchange: []
    }
  }

  async componentDidMount() {
    try {
      await this.getCryptoCurrency();
      await this.getCurrency();
      await this.getPlExchamge();
      await this.getWExchamge();
    } catch (err) {
      console.error(err);
    }
  }

  async getCryptoCurrency() {
    await fetch('http://192.168.56.1:8080/crypt-currency/important/5', {
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

  async getCurrency() {
    await fetch('http://192.168.56.1:8080/currency/all/5', {
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

  async getPlExchamge() {
    await fetch('http://192.168.56.1:8080/exchange/pl/all/5', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          plExchange: responseJson
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async getWExchamge() {
    await fetch('http://192.168.56.1:8080/exchange/w/all/5', {
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
      <ScrollView>
        <View>
    
          <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>{'Crypto Currency'}</Text>
          <Text></Text>

          <View style={{ flex: 1, flexDirection: 'row', width: '100%', height: '100%', marginBottom: 10, backgroundColor:'silver' }}>
            <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Name.'}</Text>
            <Text>{" "}</Text>
            <Text style={{ width: '40%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Average value.'}</Text>
            <Text>{" "}</Text>
            <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Change.'}</Text>
          </View>

          <View>{
            this.state.crypto.map((item, key) => {
              return (
                <View key={key} style={{ flex: 1, flexDirection: 'row', width: '100%', height: '100%', marginLeft: 10, marginBottom: 15 }}>
                  <Text style={{ width: '22%', fontSize: 18, textAlign: 'left', fontSize: 16 }}>{item.name}</Text>
                  <Text>{" "}</Text>
                  <Text style={{ width: '54%', fontSize: 18, textAlign: 'center', fontSize: 16}}>{item.courseAverage}</Text>
                  <Text>{" "}</Text>
                  <Text style={{ width: '24%', fontSize: 18, textAlign: 'left', fontSize: 16 }}>{item.change}</Text>
                </View>)
            })}
          </View>
        </View>

        <View>

          <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>{'Currency'}</Text>
          <Text></Text>

          <View style={{ flex: 1, flexDirection: 'row', width: '100%', height: '100%', marginBottom: 10, backgroundColor:'silver' }}>
            <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Name.'}</Text>
            <Text>{" "}</Text>
            <Text style={{ width: '40%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Average value.'}</Text>
            <Text>{" "}</Text>
            <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Change.'}</Text>
          </View>

          <View>{
            this.state.currency.map((item, key) => {
              return (
                <View key={key} style={{ flex: 1, flexDirection: 'row', width: '100%', height: '100%', marginLeft: 10, marginBottom: 15 }}>
                  <Text style={{ width: '40%', fontSize: 18, textAlign: 'left', fontSize: 16 }}>{item.currency}</Text>
                  <Text>{" "}</Text>
                  <Text style={{ width: '30%', fontSize: 18, textAlign: 'left', fontSize: 16 }}>{item.averageExchange}</Text>
                  <Text>{" "}</Text>
                  <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontSize: 16 }}>{item.percentageChange}</Text>
                </View>)
            })}
          </View>

        </View>

        <View>

          <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>{'Poland Exchange'}</Text>
          <Text></Text>

          <View style={{ flex: 1, flexDirection: 'row', width: '100%', height: '100%', marginBottom: 10, backgroundColor:'silver' }}>
            <Text style={{ width: '20%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Name.'}</Text>
            <Text>{" "}</Text>
            <Text style={{ width: '48%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Course.'}</Text>
            <Text>{" "}</Text>
            <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Change.'}</Text>
          </View>

          <View>{
            this.state.plExchange.map((item, key) => {
              return (
                <View key={key} style={{ flex: 1, flexDirection: 'row', width: '100%', height: '100%', marginLeft: 10, marginBottom: 15 }}>
                  <Text style={{ width: '40%', fontSize: 18, textAlign: 'left', fontSize: 16 }}>{item.name}</Text>
                  <Text>{" "}</Text>
                  <Text style={{ width: '30%', fontSize: 18, textAlign: 'left', fontSize: 16 }}>{item.course}</Text>
                  <Text>{" "}</Text>
                  <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontSize: 16 }}>{item.change}</Text>
                </View>)
            })}
          </View>

        </View>


        <View>

          <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>{'World Exchange'}</Text>
          <Text></Text>

          <View style={{ flex: 1, flexDirection: 'row', width: '100%', height: '100%', marginBottom: 10, backgroundColor:'silver' }}>
            <Text style={{ width: '20%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Name.'}</Text>
            <Text>{" "}</Text>
            <Text style={{ width: '48%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Course.'}</Text>
            <Text>{" "}</Text>
            <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Change.'}</Text>
          </View>

          <View>{
            this.state.wExchange.map((item, key) => {
              return (
                <View key={key} style={{ flex: 1, flexDirection: 'row', width: '100%', height: '100%', marginLeft: 10, marginBottom: 15 }}>
                  <Text style={{ width: '40%', fontSize: 18, textAlign: 'left', fontSize: 16 }}>{item.name}</Text>
                  <Text>{" "}</Text>
                  <Text style={{ width: '30%', fontSize: 18, textAlign: 'left', fontSize: 16 }}>{item.course}</Text>
                  <Text>{" "}</Text>
                  <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontSize: 16 }}>{item.change}</Text>
                </View>)
            })}
          </View>

        </View>

      </ScrollView>
    );
  }
}