import { StatusBar } from 'expo-status-bar';
import {useEffect} from 'react'
import { StyleSheet, Text, View ,Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Categories from './Bottom Screens/Categories';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Credits from './Bottom Screens/Credits';
import { NavigationContainer } from '@react-navigation/native';
import DealersAndCustomers from './Bottom Screens/DealersAndCustomers';
import Products from './Bottom Screens/Products';
import Transactions from './Bottom Screens/Transactions';
import {Provider , connect} from 'react-redux';
import store from './redux/Store.js'
import Header from './Components/Header';

const Tab = createMaterialBottomTabNavigator();
export default function App() {
 
  useEffect( ()=>{
    
  },[])
  return (
    <Provider store = {store}>
    <StatusBar style="auto" />
    <Header/>
    <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'white' }}
    >
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          tabBarLabel: 'Products',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          tabBarLabel: 'Transactions',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="money" color={color} size={26} />
          ),
        }}
      />
     
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="tasks" color={color} size={26} />
          ),
        }}
      />
       <Tab.Screen
        name="Credits"
        component={Credits}
        options={{
          tabBarLabel: 'Credits',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
    </NavigationContainer>

    </Provider>


   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
