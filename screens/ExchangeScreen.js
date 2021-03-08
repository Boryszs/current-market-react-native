import React, { Component } from 'react';
import { Button, View, Text, FlatList, SafeAreaView, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ExchangePoland from './ExchangePoland';
import ExchangeWorld from './ExchangeWorld';

const initialLayout = { width: Dimensions.get('window').width };

export default function ExchangeScreen() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'poland', title: 'Poland Exchange' },
    { key: 'world', title: 'World Exchange' },
  ]);

  const renderScene = SceneMap({
    poland: ExchangePoland,
    world: ExchangeWorld,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});