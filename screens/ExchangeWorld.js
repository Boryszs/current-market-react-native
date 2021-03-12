import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import NetInfo from "@react-native-community/netinfo";
import { Button, View, Text, FlatList, SafeAreaView, ScrollView, StyleSheet, RefreshControl } from 'react-native';

export default class ExchangeWorld extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      wExchange: [],
      tmpWExchange: [],
      search: '',
      isMounted: false
    }
  }

  handleRefresh = () => {
    this.setState({ isFetching: true }, () => {
      this.getWExchamge();
    });
    this.setState({ isFetching: false });
  };

  async componentDidMount() {
    try {
      this.setState({ isMounted: true })
      await this.getWExchamge();
    } catch (err) {
      console.error(err);
    }
  }

  async getWExchamge() {

    await NetInfo.fetch().done((state) => {
      if (state.isConnected) {
        fetch('http://192.168.56.1:8080/exchange/w/all', {
          method: 'GET'
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (this.state.isMounted) {
              this.setState({
                wExchange: responseJson,
                tmpWExchange: responseJson
              })
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  }

  filterSearch(text) {
    if (this.state.search.length > text.length) {
      this.setState({ search: text, wExchange: this.state.tmpWExchange })
    }
    else {
      const data = this.state.wExchange;
      const newData = data.filter(function (item) {
        const itemData = item.name.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData) > -1
      })
      this.setState({
        wExchange: newData,
        search: text
      })
    }
  }

  componentWillUnmount() {
    this.setState({ isMounted: false })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View styles={{ width: '100%' }}>
          <SearchBar
            round
            searchIcon={{ size: 24 }}
            onChangeText={search => this.filterSearch(search)}
            placeholder="Search name ..."
            value={this.state.search}
          />
        </View>
        <View style={styles.container}>
          <FlatList
            data={this.state.wExchange}
            keyExtractor={item => item.name}
            ListHeaderComponent={() => {
              return (
                <View style={styles.table_head}>
                  <Text style={{ width: '20%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Name.'}</Text>
                  <Text>{" "}</Text>
                  <Text style={{ width: '48%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Course.'}</Text>
                  <Text>{" "}</Text>
                  <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>{'Change.'}</Text>
                </View>)
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isFetching}
                onRefresh={this.handleRefresh}
              />
            }
            renderItem={({ item, index }) => {
              return (
                <View key={index} style={styles.table_body}>
                  <Text style={{ width: '40%', fontSize: 18, textAlign: 'left', fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                  <Text>{" "}</Text>
                  <Text style={{ width: '30%', fontSize: 18, textAlign: 'left', fontSize: 16, fontWeight: '700' }}>{item.course}</Text>
                  <Text>{" "}</Text>
                  <Text style={{ width: '30%', fontSize: 18, textAlign: 'center', fontSize: 16, fontWeight: '700', color: Number(item.change.replace("%", "").replace(",", ".")) > 0.0 ? 'green' : 'red' }}>{item.change + '%'}</Text>
                </View>
              )
            }}
          />
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  table_head: { flex: 1, flexDirection: 'row', width: '100%', height: '100%', marginBottom: 10, backgroundColor: 'silver' },
  table_body: { flex: 1, flexDirection: 'row', width: '100%', height: '100%', marginLeft: 10, marginBottom: 15 }
});