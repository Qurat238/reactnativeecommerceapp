import { View, Text, StyleSheet, Platform, SafeAreaView, StatusBar, Image, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { clearErrors, getOrderDetails } from '../reducers/orderReducer';
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { Button } from 'react-native-paper';
import Loader from '../components/Loader';

const Order = () => {

    const dispatch = useDispatch();
    const route = useRoute();
    const navigation = useNavigation();

    const {order, loading, error} = useSelector((state) => state.orderDetails);

    const { id } = route.params;
       
    useEffect(()=>{
        if(error){
           alert(error);
           dispatch(clearErrors());
        }
        dispatch(getOrderDetails(id));
    },[dispatch, error,id, alert]);

  return (
    <View style={styles.container}>
      {loading ? <Loader/> : 
        <SafeAreaView>
            <View style={styles.headingContainer}>
        <Button
              style={styles.backBtn}
              onPress={() => navigation.navigate("profile")}
            >
              <View><Icon2 name="arrow-back" size={30} color="white" /></View>
            </Button>
            <Text style={styles.orderHeading}>Order Details</Text>
            </View>
        <Text style={styles.subHeading}>Shipping Details</Text>
          <View style={styles.orderDetailsContainer}>
              <View style={styles.details}>
                  <Text style={styles.detail}>Name</Text>
                  <Text style={styles.detail}>{order.user.name}</Text>
              </View>
              <View style={styles.details}>
                  <Text style={styles.detail}>Phone No</Text>
                  <Text style={styles.detail}>{order.shippingInfo.phoneNo}</Text>
              </View>
              <View style={styles.details}>
                  <Text style={styles.detail}>Address</Text>
                  <Text style={styles.detail}>{order.shippingInfo.address}</Text>
              </View>
          </View>
  
        <Text style={styles.subHeading}>Payment Details</Text>
          <View style={styles.detailsContainer}>
              <View style={styles.details}>
                  <Text style={styles.detail}>Status</Text>
                  <Text style={styles.detail}>PAID</Text>
              </View>
              <View style={styles.details}>
                  <Text style={styles.detail}>Amount</Text>
                  <Text style={styles.detail}>${order.totalPrice}</Text>
              </View>
          </View>
          
          <Text style={styles.subHeading}>Purchased Items</Text>
          <View style={{height:350, marginBottom:10}}>
              <ScrollView>
                  {order && order.orderItems.map((item) => (
                  <View key={item.product} style={styles.purchasedItem}>
                      <View>
                          <Image  src={item.image} alt="Product" style={styles.image}/>
                      </View>
                      <View style={styles.itemContentContainer}>
                          <Text style={styles.name}>{item.name}</Text>
                          <Text style={styles.price}>{item.quantity} X ${item.price} = ${item.price*item.quantity}</Text>
                      </View>
                  </View>
              ))}
              </ScrollView>
          </View> 
        </SafeAreaView>  
    }
    </View>
  )
}

export default Order;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#283148",
        paddingTop: Platform.OS==="android" ? StatusBar.currentHeight : 0,
        padding:15,
        paddingTop:40,
    },
    headingContainer:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start"
      },
      orderHeading:{
        fontSize:40,
        fontWeight:"900",
        margin:10,
        color:"#fff",
        marginLeft:50,
        marginBottom:20
      },
    subHeading:{
        fontSize: 35, 
        marginBottom:20,
        marginLeft:5,
        color:"#fff"
    },
    purchasedItem:{
        backgroundColor:"#fff",
        flexDirection:"row",
        gap:20,
        marginBottom:10,
        borderRadius:10,
        padding:10
    },
    image:{
        height:90, 
        objectFit:"contain", 
        width:90, 
        borderWidth:1, 
        borderRadius:100, 
        borderColor:"grey"
    },
    itemContentContainer:{
        width:"70%",
        justifyContent:"center",
    },
    name:{
        fontSize:25,
        fontWeight:"900",
    },
    price:{
        fontSize:20,
        marginRight:15
    },
    orderDetailsContainer:{
        backgroundColor:"#fff",
        padding:20,
        marginBottom:10,
        borderRadius:10
    },
    detailsContainer:{
        backgroundColor:"#fff",
        padding:20,
        borderRadius:10,
        marginBottom:10
    },
    details:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    detail:{
        fontSize:23,
    },
    line:{
        height:2,
        marginTop:10,
        marginBottom:10,
        backgroundColor:"#283148"
    },
    btn:{
        backgroundColor:"#fff",
        height:50,
        marginTop:20,
        paddingTop:10
    },
    btnText:{
        fontSize:25,
        fontWeight:"900",
        color:"#283148"
    },
});