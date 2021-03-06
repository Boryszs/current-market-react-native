import * as React from 'react';
import { Button, View ,Text} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import CryptoCurrencyScreen from '../screens/CryptoCurrencyScrenn';
import CurrencyScreen from '../screens/CurrencyScrenn';
import ExchangeScreen from '../screens/ExchangeScreen';

const HomeStack = createStackNavigator();
const CryptoCurrencyStack = createStackNavigator();
const CurrencyStack = createStackNavigator();
const ExchangeStack = createStackNavigator();
const Drawer = createDrawerNavigator();


const HomeStackScrenn = ({navigation}) => (
  <HomeStack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor:'grey',
      },
      headerTintColor:"#fff",
      headerTitleStyle:{
        marginLeft:100,
        fontWeight:'bold'
      }
  }}>
    <HomeStack.Screen name="Home" component = {HomeScreen}
    options={{
      headerLeft:() => (
        <Icon.Button name = "menu-outline" size ={36} backgroundColor = "grey" onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }}/>
</HomeStack.Navigator>
);

const CryptoCurrencyStackScrenn = ({navigation}) => (
  <CryptoCurrencyStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor:'grey',
    },
    headerTintColor:"#fff",
    headerTitleStyle:{
      marginLeft:60,
      fontWeight:'bold'
    }
  }}>
    <CryptoCurrencyStack.Screen name="Crypto Currency" component = {CryptoCurrencyScreen}
    options={{
      headerLeft: () =>(
        <Icon.Button name = "menu-outline" size ={36} backgroundColor = "grey" onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }}/>
</CryptoCurrencyStack.Navigator>
);


const CurrencyStackScrenn = ({navigation}) => (
  <CurrencyStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor:'grey',
    },
    headerTintColor:"#fff",
    headerTitleStyle:{
      marginLeft:100,
      fontWeight:'bold'
    }
  }}>
    <CurrencyStack.Screen name="Currency" component = {CurrencyScreen}
    options={{
      headerLeft: () =>(
        <Icon.Button name = "menu-outline" size ={36} backgroundColor = "grey" onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }}/>
</CurrencyStack.Navigator>
);


const ExchangeStackkScrenn = ({navigation}) => (
  <ExchangeStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor:'grey',
    },
    headerTintColor:"#fff",
    headerTitleStyle:{
      marginLeft:80,
      fontWeight:'bold'
    }
  }}>
    <ExchangeStack.Screen name="Exchange" component = {ExchangeScreen}
    options={{
      headerLeft: () =>(
        <Icon.Button name = "menu-outline" size ={36} backgroundColor = "grey" onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }}/>
</ExchangeStack.Navigator>
);

export default AppContainer = () =>{
return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStackScrenn} options={{ title: 'Home', drawerIcon: () =>(<Icon name="md-home" size={26} color="#4F8EF7"/>)}} />
        <Drawer.Screen name="Crypto Currency" component={CryptoCurrencyStackScrenn} options={{ title: 'Crypto Currency', drawerIcon: () =>(<Icon name="card-outline" size={26} color="#4F8EF7"/>)}}/>
        <Drawer.Screen name="Currency" component={CurrencyStackScrenn} options={{ title: 'Currency', drawerIcon: () =>(<Icon name="logo-euro" size={26} color="#4F8EF7"/>)}}/>
        <Drawer.Screen name="Exchange" component={ExchangeStackkScrenn} options={{ title: 'Exchange', drawerIcon: () =>(<Icon name="bar-chart-outline" size={26} color="#4F8EF7"/>)}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


