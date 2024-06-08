import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Icon1 from "react-native-vector-icons/AntDesign";
import Icon4 from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/userReducer";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logoutHandler = async () => {
    dispatch(logout());
    alert("Logged Out Successfully");
    navigation.navigate("login");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("home")}>
        <Icon1 name="home" size={45} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("cart")}>
        <Icon1 name="shoppingcart" size={45} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("profile")}>
        <Icon1 name="user" size={45} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={logoutHandler}>
        <Icon4 name="logout" size={45} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FF9B42",
    height: 80,
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  icon: {
    fontWeight: "900",
    color: "#fff",
  },
});
