import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Icon1 from "react-native-vector-icons/AntDesign";
import Icon4 from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import {useDispatch} from "react-redux";
import { logout } from '../reducers/userReducer';


const NavBar = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logoutHandler = async() => {
    dispatch(logout());
    alert("Logged Out Successfully");
    navigation.navigate("login");
  }


  return (
    <View style={Styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("home")}>
          <Icon1 name="home" size={40} style={Styles.icon}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("cart")}>
          <Icon1 name="shoppingcart" size={40} style={Styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("profile")}>
          <Icon1 name="user" size={40} style={Styles.icon}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={logoutHandler}>
          <Icon4 name="logout" size={40} style={Styles.icon} />
      </TouchableOpacity>
    </View>
  )
}

export default NavBar;

const Styles = StyleSheet.create({

  container: {
      display:"flex",
      flexDirection:"row",
      backgroundColor:"#FF5959",
      height:70,
      justifyContent:"space-evenly",
      alignItems:"center",
      margin:5,
      borderWidth:5,
      position:"absolute",
      bottom:0,
      left:0,
      right:0
  },
  icon: {
    fontWeight:"900",
  }
})