import React , {useEffect} from 'react'
import {Text , View} from 'react-native'
import { connect } from 'react-redux'

export const DealersAndCustomers = (props) => {
  useEffect(()=>{
    // console.log('Cust')
  },[])
  return (
    <View>

    </View>
  )
}

const mapStateToProps = (state) => {
    return {store : state}
}

const mapDispatchToProps = (dispatch) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(DealersAndCustomers)