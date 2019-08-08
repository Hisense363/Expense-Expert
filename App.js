import React, { Component } from 'react';
import { StyleSheet, Picker, Text, View, Button, TextInput} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import * as d3 from 'd3'
import { ART } from 'react-native'
const { Surface, Group, Shape } = ART

class SignIn extends Component {
  constructor(props){
    super(props)
    this.state = {
      username : 'username',
      password : 'password'
    }
  }
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render(){
    return (
      <View style={{flex: 1, backgroundColor: '#e2e3e2', alignItems: 'center'}}>
        <Text marginTop={200} style={{fontSize: 40, color: 'black'}}>Expense Expert</Text>
        <TextInput
          style={styles.TextInputStyle}
          onChangeText={(text) => this.setState({username : text})}
          placeholder={'username'}
          placeholderTextColor={'black'}
        />
        <TextInput
          style={styles.TextInputStyle}
          onChangeText={(text) => this.setState({password : text})}
          placeholder={'password'}
          placeholderTextColor={'black'}
          clearTextOnFocus={true}
        />
        <Button onPress={() => this.props.navigation.navigate('Details', {
          username : this.state.username,
          password : this.state.password
        })} title="Sign in" color="black"/>
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      color: ['blue', 'red', 'yellow', 'green', 'orange', 'purple', 'black', 'white', 'teal'],
      userPurchases : [      
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
      }]
    }
    this.getColor = this.getColor.bind(this);
    this.updateCategories = this.updateCategories.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.removeCategories = this.removeCategories.bind(this);
    this.removeValue = this.removeValue.bind(this);
  }
  static navigationOptions = {
    title: 'Details',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  getColor = (index) => {
    return this.state.color[index];
  }

  updateCategories = (obj) => {
    let arr = this.state.userPurchases;
    let inArr = false;
    for(let i = 0; i < arr.length; i++){
      if(arr[i].itemName === obj.itemName){
        inArr = true;
      }
    }
    if(!inArr && obj.itemName && arr.length !== 9){
      arr.push(obj);
      this.setState({userPurchases : arr});
    }
  }

  removeCategories = (name) => {
    let arr = this.state.userPurchases;
    let index = 0;
    for(let i = 0; i < arr.length; i++){
      if(arr[i].itemName === name){
        index = i;
      }
    }
    arr = arr.slice(0, index).concat(arr.slice(index + 1));
      this.setState({userPurchases : arr})
  }

  updateValue = (name, value) => {
    let index = 0;
    let arr = this.state.userPurchases;
    for(let i = 0; i < arr.length; i++){
      if(arr[i].itemName === name){
        index = i;
        break;
      }
    }
    let newVal = Number(value) + Number(arr[index].price)
    arr[index].price = newVal;
    this.setState({userPurchases : arr})
  }

  removeValue = (name, value) => {
    let index = 0;
    let arr = this.state.userPurchases;
    for(let i = 0; i < arr.length; i++){
      if(arr[i].itemName === name){
        index = i;
        break;
      }
    }
    value = Number(value);
    value = value > Number(arr[index].price) ? value : Number(arr[index].price);
    let newVal = Number(arr[index].price) - value;
    arr[index].price = newVal;
    this.setState({userPurchases : arr})
  }
  componentDidMount(props) {
    const { navigation } = this.props;
    this.setState({
      username : navigation.getParam('username', 'username'),
      password : navigation.getParam('password', 'password')
    })
  }

  render() {
    const width = 450
    const height = 450
    const sectionAngles = d3.pie().value(d => d.price)(this.state.userPurchases)
    const path = d3.arc().outerRadius(150).padAngle(.05).innerRadius(100)
    return (
      <View style={{flex: 1, backgroundColor: '#e2e3e2', alignItems: 'center'}}>
        <Surface width={width} height={height}>
          <Group x={width/2} y={height/2}>
          {
            sectionAngles.map((section, index) => (
              <Shape
                key={section.index}
                d={path(section)}
                stroke="#000"
                fill={this.getColor(index)}
                strokeWidth={1}
              />
            ))
          }  
          </Group>
        </Surface>
        <View style={{position: 'absolute', bottom: "12%", backgroundColor: 'darkgrey', width: 150, height: 175, justifyContent: 'center', borderWidth: 3, borderRadius: 5}}>
        {this.state.userPurchases.map((expense, key) => (
          <Text style={{color: this.state.color[key], paddingLeft: 5}} key={key}>
            {expense.itemName} - ${expense.price}
          </Text>
        ))}
        </View>
        <View style={{flex: 1, flexDirection: 'row', position: 'absolute', bottom: 0}}>
          <View style={{width: '33%', backgroundColor: 'black'}}>
            <Button onPress={() => this.props.navigation.navigate('Add',  {
              current : this.state.userPurchases,
              change : this.updateCategories,
              value : this.updateValue,
              color : this.state.color
            })} title="Add Expenses" color="black" style={{height : 50}}/>
          </View>
          <View style={{width: '34%', backgroundColor: 'black'}}>
            <Button onPress={() => this.props.navigation.navigate('Remove', {
              current : this.state.userPurchases,
              change : this.removeCategories,
              value: this.removeValue,
              color : this.state.color
            })} title="Remove Expenses" color="black"/>
          </View>
          <View style={{width: '33%', backgroundColor: 'black'}}>
            <Button onPress={() => this.props.navigation.navigate('Settings')} title="Settings" color="black"/>
          </View>             
        </View>
      </View>
    );
  }
}

class Add extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      current : [],
      change : x => x,
    }
  }

  static navigationOptions = {
    title: 'Add Expenses',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  componentDidMount(props) {
    const { navigation } = this.props;
    this.setState({
      current : navigation.getParam('current'),
      change : navigation.getParam('change'),
      changeVal : navigation.getParam('value'),
      color: navigation.getParam('color'),
      expense : '',
      newCategory : '',
      value: 0
    })
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#e2e3e2', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{paddingBottom: 10}}>Enter a Category name, and press the Add Category button to create a new Category</Text>
        <TextInput
          style={styles.TextInputStyle}
          onChangeText={(text) => this.setState({newCategory : text})}
          placeholder={'add a category'}
          placeholderTextColor={'black'}
        />
        <Button onPress={() => {
          this.state.change({itemName : this.state.newCategory, price : 0});
          this.forceUpdate()
          }} title="Add Category" style={{fontSize: 30}} color="black"/>
        <Text style={{ paddingTop: 20}}>Select a Category from the dropdown, and enter an expense value to add an Expense</Text>
        <Picker
          selectedValue={this.state.expense}
          style={{height: 50, width: 400}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({expense: itemValue})
          }>
          {this.state.current.map((expense, key) => (
            <Picker.Item key={key} label={expense.itemName} value={expense.itemName} />
          ))}
        </Picker>
        <TextInput proptype='number'
          style={styles.TextInputStyle}
          onChangeText={(text) => this.setState({value : text})}
          placeholder={'please enter expense amount'}
          placeholderTextColor={'black'}
          keyboardType={'numeric'}
        />
        <Button onPress={() => {
          this.state.changeVal(this.state.expense, this.state.value);
          this.forceUpdate()
          }} title="Add Expense" style={{fontSize: 30}} color="black"/>
      </View>
    );
  }
}

class Remove extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      current : [],
      change : x => x,
      color : [],
    }
  }

  static navigationOptions = {
    title: 'Remove Expenses',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  componentDidMount(props) {
    const { navigation } = this.props;
    this.setState({
      current : navigation.getParam('current'),
      change : navigation.getParam('change'),
      changeVal : navigation.getParam('value'),
      color: navigation.getParam('color'),
      expense : '',
      newCategory : '',
      value: 0
    })
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#e2e3e2', justifyContent: 'center', alignItems: 'center'}}>
        <Text>
          Select a Category to edit
        </Text>
        <Picker
          selectedValue={this.state.expense}
          style={{height: 50, width: 400, paddingBottom: 20}}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({expense: itemValue})
          }
          }>
          {this.state.current.map((expense, key) => (
            <Picker.Item key={key} label={expense.itemName} value={expense.itemName} />
          ))}
        </Picker>
        <Button onPress={() => {
          this.state.change(this.state.expense)
        }} title="Remove Category" color="black"/>
        <Text style={{paddingTop : 20, paddingBottom: 10}}>
          Enter an amount to reduce
        </Text>
        <TextInput proptype='number'
          style={styles.TextInputStyle}
          onChangeText={(text) => this.setState({value : text})}
          placeholder={'please enter expense amount'}
          placeholderTextColor={'black'}
          keyboardType={'numeric'}
        />
        <Button onPress={() => {
          this.state.changeVal(this.state.expense, this.state.value);
          this.forceUpdate()
          }} title="Reduce Expense" style={{fontSize: 30}} color="black"/>
      </View>
    );
  }
}

class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#e2e3e2', justifyContent: 'center', alignItems: 'center'}}>
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

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    justifyContent: 'center',  
},  
  headerText: {  
    fontSize: 20,  
    textAlign: "center",  
    margin: 10,  
    fontWeight: "bold"  
},  
TextInputStyle: {  
    textAlign: 'center',  
    height: 40,  
    borderRadius: 10,  
    borderWidth: 2,  
    borderColor: '#009688',  
    marginBottom: 10,  
    width: 300
}  
});
