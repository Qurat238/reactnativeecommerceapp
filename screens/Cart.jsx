import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import CartItemCard from "../components/CartItemCard";
import { removeItemsFromCart } from "../reducers/cartReducer";

const Cart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigation.navigate("shipping");
  };

  const { width, height } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View>
          <View style={styles.headingContainer}>
            <Button
              style={styles.backBtn}
              onPress={() => navigation.navigate("home")}
            >
              <View>
                <Icon2 name="arrow-back" size={30} color="white" />
              </View>
            </Button>
            <Text style={styles.cartHeading}>My Cart</Text>
          </View>

          <View
            style={{ height: height * 0.75, justifyContent: "space-between" }}
          >
            <View style={{ height: height * 0.555 }}>
              <ScrollView>
                {cartItems &&
                  cartItems.map((item) => (
                    <CartItemCard
                      key={item.product}
                      item={item}
                      deleteCartItems={deleteCartItems}
                    />
                  ))}
              </ScrollView>
            </View>
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalPriceHeading}>Gross Total</Text>
              <Text style={styles.totalPrice}>{`$${cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}`}</Text>
            </View>
          </View>

          <View style={[styles.line, { width: width * 0.93 }]}></View>
          <Button
            style={styles.checkOutBtn}
            onPress={isAuthenticated ? checkoutHandler : ""}
          >
            <View>
              <Text style={styles.checkOutBtnText}>Checkout</Text>
            </View>
          </Button>
          <View></View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#283148",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 15,
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cartHeading: {
    fontSize: 40,
    fontWeight: "900",
    margin: 10,
    color: "#fff",
    marginLeft: 70,
    marginBottom: 30,
  },
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalPriceHeading: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "900",
  },
  totalPrice: {
    fontSize: 30,
    color: "#fff",
  },
  line: {
    backgroundColor: "#fff",
    height: 1,
    marginTop: 30,
  },
  checkOutBtn: {
    backgroundColor: "#FF9B42",
    marginTop: 20,
    height: 60,
    paddingTop: 15,
    borderRadius: 30,
  },
  checkOutBtnText: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "900",
  },
});
