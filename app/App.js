import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppNavigator from './navigator/StackNavigator';
import { createAppContainer } from 'react-navigation';

import ModalExample from './screens/ModalExample';

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component{
  render() {
    return (
      <AppContainer />
      //<ModalExample/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
