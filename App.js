import React, { Component } from 'react';
import { Button, View ,Text} from 'react-native';
import AppContainer from './routes/StackNavigator';

export default class App extends Component {
  constructor(props) {
    super(props);
    }

  render(){
    return(
     <AppContainer/>
    )
  }
}


  

