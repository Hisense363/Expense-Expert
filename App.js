import React, { Component } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import * as d3 from 'd3'
import { ART } from 'react-native'
const { Surface, Group, Shape } = ART

class SignIn extends Component {
  render(){
    return (
       <View style={{flex: 1, backgroundColor: '#14c424', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 60, color: 'black', paddingBottom: 250}}>Budget Buddy</Text>
        <Button onPress={() => this.props.navigation.navigate('Details')} title="Sign in" style={{fontSize: 30}} color="black"/>
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  super(props){
    constructor(props)
    this.state = {
      userPurchases : []
    }
  }
  render() {
    const width = 450
    const height = 450
    const userPurchases = [
      {
        itemName: 'Mountain Dew',
        price: 3
      },
      {
        itemName: 'Shoes',
        price: 50
      },
      {
        itemName: 'Kit Kat',
        price: 1
      },
      {
        itemName: 'Taxi',
        price: 24
      },
      {
        itemName: 'Watch',
        price: 100
      },
      {
        itemName: 'Headphones',
        price: 15
      },
      {
        itemName: 'Wine',
        price: 16
      }
    ]
    const sectionAngles = d3.pie().value(d => d.price)(userPurchases)
    const path = d3.arc().outerRadius(150).padAngle(.05).innerRadius(100)
    return (
      <View style={{flex: 1, backgroundColor: '#14c424', justifyContent: 'center', alignItems: 'center'}}>
        <Text>Expense Ratio</Text>
        <Surface width={width} height={height}>
          <Group x={width/2} y={height/2}>
          {
            sectionAngles.map((section, i) => (
              <Shape
                key={section.index}
                d={path(section)}
                stroke="#000"
                fill={`rgb(0,0,255)`}
                strokeWidth={1}
              />
            ))
          }  
          </Group>
        </Surface>
        <Button onPress={() => this.props.navigation.navigate('Add')} title="Add Expenses" style={{fontSize: 30}} color="black"/>
        <Button onPress={() => this.props.navigation.navigate('Remove')} title="Remove Expenses" style={{fontSize: 30}} color="black"/>
        <Button onPress={() => this.props.navigation.navigate('Settings')} title="Settings" style={{fontSize: 30}} color="black"/>
      </View>
    );
  }
}

class Add extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#14c424', justifyContent: 'center', alignItems: 'center'}}>
        <Text>Add Screen</Text>
      </View>
    );
  }
}

class Remove extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#14c424', justifyContent: 'center', alignItems: 'center'}}>
        <Text>Remove Screen</Text>
      </View>
    );
  }
}

class Settings extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#14c424', justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: SignIn,
    Details: DetailsScreen,
    Add: Add,
    Remove: Remove,
    Settings: Settings
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}