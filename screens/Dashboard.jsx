import { View, Text, StyleSheet, StatusBar, Platform, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from "./../components/Loader";
import { getAdminProduct } from '../reducers/productReducer';
import { getAllOrders } from '../reducers/orderReducer';
import { getAllUsers } from '../reducers/userReducer';
import { Button } from 'react-native-paper';
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';


const Dashboard = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {products, loading:productLoading} = useSelector((state) => state.products);
  const {orders, loading:orderLoading} = useSelector((state) => state.allOrders);
  const {users, loading:userLoading} = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
},[dispatch])


let totalAmount = 0;
orders && orders.forEach((item) => {
    totalAmount+=item.totalPrice;
});


  return (
    <View style={styles.container}>
        {productLoading || orderLoading || userLoading ? <Loader/> : 
        <ScrollView>
          <SafeAreaView>
          
          <View style={styles.headingContainer}>
          <Button
            style={styles.backBtn}
            onPress={() => navigation.navigate("profile")}
          >
            <View><Icon2 name="arrow-back" size={30} color="white" /></View>
          </Button>
          <Text style={styles.heading}>Dashboard</Text>
          </View>

          <View style={styles.dashboardMainItemsContainer}>
            <View style={styles.dashboardMainItems}>
            <View style={styles.dashboardItems}>
              <Text style={styles.subHeading}>Earnings</Text>
              <Text style={styles.text}>${totalAmount}</Text>
            </View>
            <View style={styles.dashboardItems}>
              <Text style={styles.subHeading}>Products</Text>
              <Text style={styles.text}>{products && products.length}</Text>
            </View>
            </View>

            <View style={styles.dashboardMainItems}>
            <View style={styles.dashboardItems}>
              <Text style={styles.subHeading}>Orders</Text>
              <Text style={styles.text}>{orders && orders.length}</Text>
            </View>
            <View style={styles.dashboardItems}>
              <Text style={styles.subHeading}>Users</Text>
              <Text style={styles.text}>{users && users.length}</Text>
            </View>
            </View>
          </View>

        
          <View style={styles.BtnContainer}>
          <View style={styles.Btn}>
              <Text style={styles.BtnText}>All Products</Text>
              <Button onPress={() => navigation.navigate("allproducts")}><View><Icon2 name="arrow-forward" size={30} /></View></Button>
            </View>
            <View style={styles.Btn}>
              <Text style={styles.BtnText}>Create Product</Text>
              <Button onPress={() => navigation.navigate("createproduct")}><View><Icon2 name="arrow-forward" size={30} /></View></Button>
            </View>
            <View style={styles.Btn}>
              <Text style={styles.BtnText}>All Orders</Text>
              <Button onPress={() => navigation.navigate("allorders")}><View><Icon2 name="arrow-forward" size={30} /></View></Button>
            </View>
            <View style={styles.Btn}>
              <Text style={styles.BtnText}>All Users</Text>
              <Button onPress={() => navigation.navigate("allusers")}><View><Icon2 name="arrow-forward" size={30} /></View></Button>
            </View>
            <View style={styles.Btn}>
              <Text style={styles.BtnText}>All Reviews</Text>
              <Button onPress={() => navigation.navigate("allreviews")}><View><Icon2 name="arrow-forward" size={30} /></View></Button>
            </View>
          </View>
        </SafeAreaView>
        </ScrollView>
        }
    </View>
  )
}

export default Dashboard;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#283148",
        paddingTop: Platform.OS==="android" ? StatusBar.currentHeight : 0,
        paddingBottom:20
    },
    headingContainer:{
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"flex-start",
      marginBottom:15
    },
    heading:{
      fontSize:40,
      fontWeight:"900",
      margin:10,
      color:"#fff",
      marginLeft:70
    },
    dashboardMainItemsContainer:{
      gap:20,
      padding:20,
      marginBottom:40
    },
    dashboardMainItems:{
      flexDirection:"row",
      gap:20,
      justifyContent:"space-between"
    },
    dashboardItems:{
      backgroundColor:"#fff",
      width:190,
      height:100,
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      borderRadius:10
    },
    subHeading:{
      fontSize:25,
      fontWeight:"900"
    },
    text:{
      fontSize:20,
      fontWeight:"600"
    },
    BtnContainer:{
      display:"flex", 
      flexDirection:"column", 
      gap:30
    },
    Btn:{
      display:"flex", 
      flexDirection:"row", 
      backgroundColor:"#fff", 
      justifyContent:"space-between", 
      alignItems:"center", 
      marginLeft:20, 
      marginRight:20, 
      height:100, 
      borderRadius:10,
    },
    BtnText: {
      color: "#283148",
      fontSize:30,
      fontWeight:"900",
      marginLeft:20,
    },
});