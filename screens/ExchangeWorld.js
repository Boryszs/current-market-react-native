import React, { Component } from 'react';
import { Button, View, Text, FlatList, SafeAreaView, ScrollView, StyleSheet, RefreshControl } from 'react-native';

export default class ExchangeWorld extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      wExchange: []
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
      await this.getWExchamge();
    } catch (err) {
      console.error(err);
    }
  }

  async getWExchamge() {
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

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  table_head: { flex: 1, flexDirection: 'row', width: '100%', height: '100%', marginBottom: 10, backgroundColor:'silver'  },
  table_body: { flex: 1, flexDirection: 'row', width: '100%', height: '100%', marginLeft: 10, marginBottom: 15 }
});