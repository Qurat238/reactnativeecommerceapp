import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { useStripe } from "@stripe/stripe-react-native";
import axios from "axios";
import { clearErrors, createOrder } from "../reducers/orderReducer";
import Loader from "./../components/Loader";

const ConfirmOrder = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user, loading } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal < 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const paymentData = {
    amount: Math.round(totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: subtotal,
    taxPrice: tax,
    shippingPrice: shippingCharges,
    totalPrice: totalPrice,
  };

  function generateRandomId() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const prefix = "pi_";
    const length1 = 7;
    const length2 = 12;

    const randomChars = (length) => {
      let result = "";
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    return prefix + randomChars(length1) + randomChars(length2);
  }

  const randomId = generateRandomId();

  const paymentHandler = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "https://backend-gray-sigma.vercel.app/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      // 2. Initialize the Payment sheet
      const initResponse = await initPaymentSheet({
        merchantDisplayName: "qs.dev",
        paymentIntentClientSecret: client_secret,
        defaultBillingDetails: {
          name: user.name,
          email: user.email,
          address: {
            line1: shippingInfo.address,
            city: shippingInfo.city,
            postal_code: shippingInfo.pinCode,
            country: shippingInfo.country,
          },
        },
      });
      if (initResponse.error) {
        console.log(initResponse.error);
        alert("Something went wrong");
        return;
      }

      // 3. Present the Payment Sheet from Stripe
      const paymentResponse = await presentPaymentSheet();

      if (paymentResponse.error) {
        alert(
          `Error code: ${paymentResponse.error.code}`,
          paymentResponse.error.message
        );
        return;
      }

      // 4. If payment ok -> create the order

      order.paymentInfo = {
        id: randomId,
        status: "succeeded",
      };

      dispatch(createOrder(order));
      alert("Order Created Successfully");
      navigation.navigate("profile");
    } catch (error) {
      console.error("Payment Error:", error);
      alert(`Payment failed: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <SafeAreaView>
          <Text style={styles.subHeading}>Shipping Details</Text>
          <View style={styles.shippingDetailsContainer}>
            <View style={styles.details}>
              <Text style={styles.detail}>Name</Text>
              <Text style={styles.detail}>{user.name}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detail}>Phone No</Text>
              <Text style={styles.detail}>{shippingInfo.phoneNo}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detail}>Address</Text>
              <Text style={styles.detail}>{shippingInfo.address}</Text>
            </View>
          </View>

          <Text style={styles.subHeading}>Order Details</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.details}>
              <Text style={styles.detail}>Subtotal</Text>
              <Text style={styles.detail}>${subtotal}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detail}>Shipping Charges</Text>
              <Text style={styles.detail}>${shippingCharges}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detail}>GST</Text>
              <Text style={styles.detail}>${tax}</Text>
            </View>
            <View style={styles.line}></View>
            <View style={styles.details}>
              <Text style={styles.detail}>Total</Text>
              <Text style={styles.detail}>${totalPrice}</Text>
            </View>
          </View>

          <Text style={styles.subHeading}>Purchased Items</Text>
          <View style={{ height: 240, marginBottom: 10 }}>
            <ScrollView>
              {cartItems &&
                cartItems.map((item) => (
                  <View key={item.product} style={styles.purchasedItem}>
                    <View>
                      <Image
                        src={item.image}
                        alt="Product"
                        style={styles.image}
                      />
                    </View>
                    <View style={styles.itemContentContainer}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.price}>
                        {item.quantity} X ${item.price} = $
                        {item.price * item.quantity}
                      </Text>
                    </View>
                  </View>
                ))}
            </ScrollView>
          </View>

          <Button style={styles.btn} onPress={paymentHandler}>
            <View>
              <Text style={styles.btnText}>Proceed To Payment</Text>
            </View>
          </Button>
        </SafeAreaView>
      )}
    </View>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#283148",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 15,
    paddingTop: 70,
  },
  subHeading: {
    fontSize: 35,
    marginBottom: 20,
    marginLeft: 5,
    color: "#fff",
  },
  shippingDetailsContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  detailsContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detail: {
    fontSize: 23,
  },
  line: {
    height: 2,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#283148",
  },
  purchasedItem: {
    backgroundColor: "#FF9B42",
    flexDirection: "row",
    gap: 20,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  image: {
    height: 90,
    objectFit: "contain",
    width: 90,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "grey",
  },
  itemContentContainer: {
    width: "70%",
    justifyContent: "center",
  },
  name: {
    fontSize: 25,
    fontWeight: "900",
    color: "#fff",
  },
  price: {
    fontSize: 20,
    marginRight: 15,
    color: "#fff",
  },
  btn: {
    backgroundColor: "#FF9B42",
    height: 60,
    padding: 10,
    paddingTop: 15,
    borderRadius: 30,
    marginTop: 10,
  },
  btnText: {
    fontSize: 25,
    fontWeight: "900",
    color: "#fff",
  },
});
