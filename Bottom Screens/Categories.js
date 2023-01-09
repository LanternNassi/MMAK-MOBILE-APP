import { ScreenHeight, ScreenWidth } from '@rneui/base'
import React  , {useEffect , useState}from 'react'
import {Text , View , StyleSheet , TextInput , ScrollView, Keyboard} from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios';
import DataTable, { COL_TYPES } from 'react-native-datatable-component';

export const Categories = (props) => {
  const [searchvalue , setsearchvalue] = useState('')
  const [products , setproducts] = useState(null)
  const [filtered_products , setfiltered_products] = useState(null)
  useEffect(()=>{
    // console.log('Products')
    getAllCategories()
  },[])

const getAllCategories = () => {
  axios({
    method: 'GET',
    url: 'http://192.168.43.189:8000/Categories',
    data : {},
    headers : {
      'content-type': 'application/json',
    }
  })
    .then(function (response) {
      setproducts(response.data)
      // setrealproducts(response.data)
      // console.log(response.data)
    });
  
}

const searchproduct =(keywords) => {
  axios({
    method: 'GET',
    url: 'http://192.168.43.189:8000/searchCategory/'+keywords +'/',
    data : {},
    headers : {
      'content-type': 'application/json',
    }
  })
    .then(function (response) {
      setproducts(response.data)
      // setrealproducts(response.data)
      // console.log(response.data)
    });
  
}

  return (
    <View style = {styles.container}>
      <View style = {styles.search}>
      <TextInput
      placeholder={'Search Products'}
      style={{ ...styles.search_comp}}
      
      onChangeText={e => {
        setsearchvalue(e)
        if (e == ""){
          getAllCategories()
        } else {
          searchproduct(e)
        }
      }
      }
      value={searchvalue}
    />
      </View>
      <View style = {styles.Table} >
        <View style = {{ 
          width : ScreenWidth,
          height : 30,
          justifyContent : 'center',
          alignItems : 'center'
         }}>
          <Text style = {{fontWeight : 'bold',fontSize : 20}} >Categories : {products?(products.length):(0)}</Text>
        </View>
        <ScrollView horizontal = {true}>
        <ScrollView  style = {{ width : 1.5 * ScreenWidth }}>
          <DataTable

              data={(products == null) ? [] : (filtered_products == null ? (products) : (filtered_products) ) }
              colNames={['id', 'title', 'description','added_date' , 'added_by']} //List of Strings
              colSettings={[
                { name: 'id', type: COL_TYPES.STRING, width: '10%' }, 
                { name: 'title', type: COL_TYPES.STRING, width: '20%' }, 
                {name: 'description', type: COL_TYPES.STRING, width: '30%'},
                {name: 'added_date', type: COL_TYPES.STRING, width: '20%'},
                {name: 'added_by', type: COL_TYPES.STRING, width: '20%'},


              ]}//List of Objects
              noOfPages={2} //number
              backgroundColor={'rgba(23,2,4,0.2)'} //Table Background Color
              headerLabelStyle={{ color: 'grey', fontSize: 12  }} //Text Style Works
          />
         </ScrollView>
        </ScrollView>
        
       
      </View>

    </View>
  )
}

const mapStateToProps = (state) => {
    return {store : state}
}

const mapDispatchToProps = (dispatch) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories)

const styles = StyleSheet.create({
  container : {
    height : 0.75 * ScreenHeight,
    width : ScreenWidth,
  },
  search : {
    height : 0.15 * ScreenHeight,
    width : ScreenWidth,
    justifyContent : 'center',
    alignItems : 'center'
  },
  Table : {
    height : 0.58 * ScreenHeight,
    width : ScreenWidth,
  },
  search_comp : {
    height: 40, 
    width : 0.7 * ScreenWidth,
    borderRadius : 25,
    borderColor: 'gray', 
    borderWidth: 1 ,
    paddingLeft : 20,
  }
})