import React, { Component } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

export default class App extends Component {
  render(){
    return (
       <View style={{flex: 1, backgroundColor: '#14c424', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 60, color: 'black', paddingBottom: 250}}>Budget Buddy</Text>
        <Button title="Sign in" style={{fontSize: 30}} color="black"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 80,
    fontWeight: 'bold',
    color: 'black',
    position: 'relative',
  },
});
