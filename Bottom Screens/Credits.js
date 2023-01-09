import { ScreenHeight, ScreenWidth } from '@rneui/base'
import React  , {useEffect , useState}from 'react'
import {Text , View , StyleSheet , ScrollView} from 'react-native'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Avatar } from '@rneui/themed';
import { connect } from 'react-redux'
import DataTable, { COL_TYPES } from 'react-native-datatable-component';
import axios from 'axios';
import { Overlay } from '@rneui/themed'

export const Credits = (props) => {
    const [active_date , setactive_date] = useState(new Date().getDate() + '-' + (new Date().getMonth() +1) + '-' + new Date().getFullYear() )
    const [transactions , settransactions] = useState(null)
    const [grandtotal , setgrandtotal] = useState(0)
    const [profit , setprofits] = useState(0)
    const [rowdate , setrowdate] = useState(null)

    const [isVisible , setIsVisible] = useState(false)
    const [activetransaction , setactivetransaction] = useState(null)
    const [activetransactiondetails , setactivetransactiondetails] = useState(null)
  useEffect(()=>{
    getAllCreditTransactions(new Date().getDate() , new Date().getMonth() +1, new Date().getFullYear())
    setrowdate(new Date())
    // console.log('Categories')
  },[])

  const calculate_grandtotal = (transactions) => {
    let total = 0
        for(let i = 0; i<transactions.length; i++){
            if(transactions[i]['paid'] == 'True'){
                total += parseInt(transactions[i]['grandtotal'])
            }
        }
        setgrandtotal(total)
    
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

 const calculate_profits = (transactions) => {
    let total = 0
        for(let i = 0; i<transactions.length; i++){
            if(transactions[i]['paid'] == 'True'){
                total += parseInt(transactions[i]['total_profit'])
            }
        }
        setprofits(total)
    
  }
  const getAllCreditTransactions = () => {
    axios({
        method : 'GET',
        url : 'http://192.168.43.189:8000/credits/',
        data : {
           
        },
        headers : {
            'content-type': 'application/json',
          }
    }).then((response)=>{
        // console.log(response.data)
        settransactions(response.data)
        // calculate_grandtotal(response.data)
        // calculate_profits(response.data)
    
    })
   
  }


  const getSpecificCreditTransactions = (day , month , year) => {
    axios({
        method : 'GET',
        url : 'http://192.168.43.189:8000/credits/' + day + '/' + month + '/' + year + '/',
        data : {
           
        },
        headers : {
            'content-type': 'application/json',
          }
    }).then((response)=>{
        // console.log(response.data)
        settransactions(response.data)
        // calculate_grandtotal(response.data)
        // calculate_profits(response.data)
    
    })
   
  }

  const getTransactiontracks = (id) => {
    axios({
        method : 'GET',
        url : 'http://192.168.43.189:8000/transactiontracker/' + id + '/',
        data : {
           
        },
        headers : {
            'content-type': 'application/json',
          }
    }).then((response)=>{
        setactivetransactiondetails(response.data)        
    })
  }
//   setInterval(()=>{
//     getTransactions(new Date().getDate() , new Date().getMonth() +1, new Date().getFullYear())
//   },25000)
  return (
    <View  style = {styles.container} >
        <View style = {styles.date}>
        <Avatar
                size={48}
                rounded
                icon={{ name: "info", type: "font-awesome" }}
                containerStyle={{ backgroundColor: "#9700b9" }}
                onPress = {()=>{
                    // alert('A total of UGX ' + numberWithCommas(grandtotal) + ' has been recorded so far with net profit of UGX ' + numberWithCommas(profit))
                    // console.log(profit , grandtotal)
                }}/>

        <Avatar  
            size = {48}
            rounded
            onPress = {()=>{
                getAllCreditTransactions()
            }}
            icon={{ name: "refresh", type: "font-awesome" }}
            containerStyle={{ backgroundColor: "#9700b9" }}
        />
        <Avatar
                size={48}
                rounded
                onPress = {async()=>{
                    DateTimePickerAndroid.open({
                        value : new Date(),
                        mode : 'date',
                        display : 'calendar',
                        onChange : (e,date)=>{
                            // getTransactions(date.getDate() , date.getMonth()+1 , date.getFullYear())
                            // setactive_date(date.getDate() + '-' + (date.getMonth() +1) + '-' + date.getFullYear())
                            // setrowdate(date)
                            getSpecificCreditTransactions(date.getDate() , date.getMonth()+1 , date.getFullYear())
                        }
                    })
                }}
                icon={{ name: "calendar", type: "font-awesome" }}
                containerStyle={{ backgroundColor: "#9700b9" }}
            />
        </View>
        <View style = {styles.table}>
                <Text style = {{
                    fontSize : 19,
                    fontWeight : 'bold'
                }}>ACTIVE DATE IS {active_date}</Text>

<ScrollView horizontal = {true}>
        <ScrollView  style = {{ width : 2.8* ScreenWidth }}>
          <DataTable
              onRowSelect={(transaction)=>{
                setactivetransaction(transaction)
                getTransactiontracks(transaction['id'])
                // getTransactions(rowdate.getDate() , rowdate.getMonth()+1 , rowdate.getFullYear())
                setIsVisible(true)

              }}
              data={transactions != null ? transactions : []}
              colNames={['select' ,'id', 'type', 'dea_cust_name' , 'grandtotal', 'transaction_date' ,'discount' , 'added_by' , 'paid_amount' , 'return_amount' , 'total_profit', 'paid' , 'taken']} //List of Strings
              colSettings={[
                { name: 'select', type: COL_TYPES.CHECK_BOX, width: '3.5%' }, 
                { name: 'id', type: COL_TYPES.STRING, width: '4.5%' }, 
                { name: 'type', type: COL_TYPES.STRING, width: '9%' }, 
                {name: 'dea_cust_name', type: COL_TYPES.STRING, width: '9.2%'},
                {name: 'grandtotal', type: COL_TYPES.STRING, width: '9.2%'},
                {name: 'transaction_date', type: COL_TYPES.INT, width: '10%'},
                {name: 'discount', type: COL_TYPES.INT, width: '8.2%'},
                {name: 'added_by', type: COL_TYPES.INT, width: '8.2%'},
                {name: 'paid_amount', type: COL_TYPES.STRING, width: '8%'},
                {name: 'return_amount', type: COL_TYPES.STRING, width: '8%'},
                {name: 'total_profit', type: COL_TYPES.INT, width: '8%'},
                {name: 'paid', type: COL_TYPES.INT, width: '8%'},
                {name: 'taken', type: COL_TYPES.INT, width: '8%'},


              ]}//List of Objects
              noOfPages={1} //number
              backgroundColor={'rgba(23,2,4,0.2)'} //Table Background Color
              headerLabelStyle={{ color: 'grey', fontSize: 12  }} //Text Style Works
          />
         </ScrollView>
        </ScrollView>
                <Overlay isVisible = {isVisible} onBackdropPress={()=>{setIsVisible(false)}} >
                    <View style = {styles.overlay} >
                        <Text style = {{ fontSize : 15 , fontWeight :'bold' }}>Track overview for {activetransaction ? (activetransaction['dea_cust_name']) : ('')}</Text>
                        <ScrollView>
                        <ScrollView horizontal = {true} >
                            <DataTable                   
                            data={activetransactiondetails ? (activetransactiondetails) : ([])}
                            colNames={['paid_amount', 'added_date', 'updated_by']} //List of Strings
                            colSettings={[
                                {name: 'paid_amount', type: COL_TYPES.STRING, width: '33.3%' }, 
                                {name: 'added_date', type: COL_TYPES.STRING, width: '33.3%'},
                                {name: 'updated_by', type: COL_TYPES.STRING, width: '33.3%'},
                               
                            


                            ]}//List of Objects
                            noOfPages={1} //number
                            backgroundColor={'rgba(23,2,4,0.2)'} //Table Background Color
                            headerLabelStyle={{ color: 'grey', fontSize: 12  }} //Text Style Works
                        />
                </ScrollView>
                </ScrollView>
              </View>
        </Overlay>
        </View>
    </View>
  )
}

const mapStateToProps = (state) => {
    return {store : state}
}

const mapDispatchToProps = (dispatch) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Credits)

const styles = StyleSheet.create({
    container : {
        flexGrow : 1,
        alignItems : 'center'
        // backgroundColor : 'red'
    },
    date : {
        height : 0.1 * ScreenHeight,
        width : 0.8 * ScreenWidth,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    pick_date_text : {
        fontSize : 20,
        fontWeight : 'bold'
    },
    table : {
        height : 0.6 * ScreenHeight,
        width :ScreenWidth,
        alignItems : 'center',
        justifyContent : 'space-between'
    },
    overlay : {
        height : 0.7 * ScreenHeight,
        width : 0.8 * ScreenWidth,
        justifyContent : 'space-around',
        alignItems : 'center'
    }
})