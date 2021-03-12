import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import NetInfo from "@react-native-community/netinfo";
import { Button, View, Text, FlatList, SafeAreaView, ScrollView, RefreshControl, StyleSheet } from 'react-native';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      crypto: [],
      currency: [],
      plExchange: [],
      wExchange: [],
      isFetching: false,
      isMounted: false
    }
  }

  handleRefresh = () => {
    this.setState({ isFetching: true }, () => {
      this.getCryptoCurrency();
      this.getCurrency();
      this.getPlExchamge();
      this.getWExchamge();
    });
    this.setState({ isFetching: false });
  };

  async componentDidMount() {
    try {
      this.setState({ isMounted: true })
      await this.getCryptoCurrency();
      await this.getCurrency();
      await this.getPlExchamge();
      await this.getWExchamge();
    } catch (err) {
      console.error(err);
    }
  }

  async getCryptoCurrency() {
    await NetInfo.fetch().done((state) => {
      if (state.isConnected) {
        fetch('http://192.168.56.1:8080/crypt-currency/important/5', {
          method: 'GET'
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (this.state.isMounted) {
              this.setState({
                crypto: responseJson
              })
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  }

  async getCurrency() {

    await NetInfo.fetch().done((state) => {
      if (state.isConnected) {
        fetch('http://192.168.56.1:8080/currency/all/5', {
          method: 'GET'
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (this.state.isMounted) {
              this.setState({
                currency: responseJson
              })
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  }

  async getPlExchamge() {

    await NetInfo.fetch().done((state) => {
      if (state.isConnected) {
        fetch('http://192.168.56.1:8080/exchange/pl/all/5', {
          method: 'GET'
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (this.state.isMounted) {
              this.setState({
                plExchange: responseJson
              })
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  }

  async getWExchamge() {

    await NetInfo.fetch().done((state) => {
      if (state.isConnected) {
        fetch('http://192.168.56.1:8080/exchange/w/all/5', {
          method: 'GET'
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (this.state.isMounted) {
              this.setState({
                wExchange: responseJson
              })
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  }

  componentWillUnmount() {
    this.setState({ isMounted: false })
  }

  render() {
    return (
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={this.state.isFetching}
          onRefresh={this.handleRefresh}
        />
      }>
        <View>

          <Text style={styles.head_text}>{'Crypto Currency'}</Text>
          <Text></Text>

          <View style={styles.table_head}>
            <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Name.'}</Text>
            <Text>{" "}</Text>
            <Text style={{ width: '40%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Average value.'}</Text>
            <Text>{" "}</Text>
            <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Change.'}</Text>
          </View>

          <View>{
            this.state.crypto.map((item, key) => {
              return (
                <View key={key} style={styles.table_body}>
                  <Text style={{ width: '22%', fontSize: 18, textAlign: 'left', fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                  <Text>{" "}</Text>
                  <Text style={{ width: '54%', fontSize: 18, textAlign: 'center', fontSize: 16, fontWeight: '700' }}>{item.courseAverage}</Text>
                  <Text>{" "}</Text>
                  <Text style={{ width: '24%', fontSize: 18, textAlign: 'left', fontSize: 16, fontWeight: '700', color: Number(item.change.replace("%", "").replace(",", ".")) > 0.0 ? 'green' : 'red' }}>{item.change}</Text>
                </View>)
            })}
          </View>
        </View>

        <View>

          <Text style={styles.head_text}>{'Currency'}</Text>
          <Text></Text>

          <View style={styles.table_head}>
            <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Name.'}</Text>
            <Text>{" "}</Text>
            <Text style={{ width: '40%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Average value.'}</Text>
            <Text>{" "}</Text>
            <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Change.'}</Text>
          </View>
          <View>{
            this.state.currency.map((item, key) => {
              return (
                <View key={key} style={styles.table_body}>
                  <Text style={{ width: '40%', fontSize: 18, textAlign: 'left', fontWeight: 'bold', fontSize: 16 }}>{item.currency}</Text>
                  <Text>{" "}</Text>
                  <Text style={{ width: '30%', fontSize: 18, textAlign: 'left', fontSize: 16, fontWeight: '700' }}>{item.averageExchange}</Text>
                  <Text>{" "}</Text>
                  <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontSize: 16, fontWeight: '700', color: Number(item.percentageChange.replace("%", "").replace(",", ".")) > 0.0 ? 'green' : 'red' }}>{item.percentageChange}</Text>
                </View>)
            })}
          </View>

        </View>

        <View>

          <Text style={styles.head_text}>{'Poland Exchange'}</Text>
          <Text></Text>

          <View style={styles.table_head}>
            <Text style={{ width: '20%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Name.'}</Text>
            <Text>{" "}</Text>
            <Text style={{ width: '48%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Course.'}</Text>
            <Text>{" "}</Text>
            <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Change.'}</Text>
          </View>

          <View>{
            this.state.plExchange.map((item, key) => {
              return (
                <View key={key} style={styles.table_body}>
                  <Text style={{ width: '40%', fontSize: 18, textAlign: 'left', fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                  <Text>{" "}</Text>
                  <Text style={{ width: '30%', fontSize: 18, textAlign: 'left', fontSize: 16, fontWeight: '700' }}>{item.course}</Text>
                  <Text>{" "}</Text>
                  <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontSize: 16, fontWeight: '700', color: Number(item.change.replace("%", "").replace(",", ".")) > 0.0 ? 'green' : 'red' }}>{item.change + '%'}</Text>
                </View>)
            })}
          </View>

        </View>


        <View>

          <Text style={styles.head_text}>{'World Exchange'}</Text>
          <Text></Text>

          <View style={styles.table_head}>
            <Text style={{ width: '20%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Name.'}</Text>
            <Text>{" "}</Text>
            <Text style={{ width: '48%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Course.'}</Text>
            <Text>{" "}</Text>
            <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Change.'}</Text>
          </View>

          <View>{
            this.state.wExchange.map((item, key) => {
              return (
                <View key={key} style={styles.table_body}>
                  <Text style={{ width: '40%', fontSize: 18, textAlign: 'left', fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                  <Text>{" "}</Text>
                  <Text style={{ width: '30%', fontSize: 18, textAlign: 'left', fontSize: 16, fontWeight: '700' }}>{item.course}</Text>
                  <Text>{" "}</Text>
                  <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontSize: 16, fontWeight: '700', color: Number(item.change.replace("%", "").replace(",", ".")) > 0.0 ? 'green' : 'red' }}>{item.change + '%'}</Text>
                </View>)
            })}
          </View>

        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  head_text: { fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  table_head: { flex: 1, flexDirection: 'row', width: '100%', height: '100%', marginBottom: 10, backgroundColor: 'silver' },
  table_body: { flex: 1, flexDirection: 'row', width: '100%', height: '100%', marginLeft: 10, marginBottom: 15 }
});