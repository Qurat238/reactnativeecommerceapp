import { View, Text, StyleSheet, Platform, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "./../reducers/orderReducer";
import { Button } from 'react-native-paper';
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import OrderItemCard from '../components/OrderItemCard';
import Loader from "./../components/Loader";

const Orders = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {orders, loading} = useSelector(state => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());
  }, [])
  

  return (
    <View style={styles.container}>
      {loading ? <Loader/> : 
        <SafeAreaView>
        <ScrollView>
        <View>
        <View style={styles.headingContainer}>
          <Button
            style={styles.backBtn}
            onPress={() => navigation.navigate("profile")}
          >
            <View><Icon2 name="arrow-back" size={30} color="white" /></View>
          </Button>
          <Text style={styles.orderHeading}>My Orders</Text>
          </View>

          <View>
          <ScrollView>
          {orders && orders.map((item) => (
            <OrderItemCard key={item._id} item={item}/>
          ))}
          </ScrollView>
          </View>
        </View>
        </ScrollView>
      </SafeAreaView>
      }
    </View>
  )
}

export default Orders;


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#283148",
    paddingTop: Platform.OS==="android" ? StatusBar.currentHeight : 0,
    padding:15
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
    marginLeft:70,
    marginBottom:30
  },
});