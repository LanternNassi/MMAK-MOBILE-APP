import React , {useEffect} from 'react'
import {Text , View} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { connect } from 'react-redux'
import Sales from './Transactions_screens/Sales';
import Purchases from './Transactions_screens/Purchases';
import DataTable, { COL_TYPES } from 'react-native-datatable-component';



const Tab = createMaterialTopTabNavigator();
export const Transactions = (props) => {
  useEffect(()=>{
    // console.log('Transact')
  },[])
  return (
    <Tab.Navigator>
      <Tab.Screen name="Sales" component={Sales} />
      <Tab.Screen name="Purchases" component={Purchases} />
    </Tab.Navigator>
  )
}

const mapStateToProps = (state) => {
    return {store : state}
}

const mapDispatchToProps = (dispatch) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)