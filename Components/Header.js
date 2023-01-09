import { ScreenHeight, ScreenWidth } from '@rneui/base'
import React from 'react'
import {View , Text , StyleSheet} from 'react-native'
import { connect } from 'react-redux'

export const Header = (props) => {
  return (
    <View style = {styles.container}>
        <Text style = {styles.title}>MMAK AGRO CHEMICALS Ltd</Text>
    </View>
  )
}

const mapStateToProps = (state) => {
    return {store : state}
}

const mapDispatchToProps = (dispatch) => ({
    
})



export default connect(mapStateToProps, mapDispatchToProps)(Header)

const styles = StyleSheet.create({
    container : {
        height : 0.15 * ScreenHeight,
        width : ScreenWidth,
        elevation : 5,
        justifyContent : 'center',
        alignItems : 'center',
    },
    title : {
        fontSize : 20,
        fontWeight : 'bold'
    }
})