import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";
import { clearErrors, getOrderDetails } from "../reducers/orderReducer";
import Loader from "../components/Loader";

const Order = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [purchasedItems, setPurchasedItems] = useState([]);

  const { order, loading, error } = useSelector((state) => state.orderDetails);

  const { id } = route.params;

  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    if (!loading) {
      const fetchData = async () => {
        if (order && order._id !== id) {
          await dispatch(getOrderDetails(id));
        }
      };
      fetchData();
    }

    if (order && !loading && order._id === id) {
      setName(order.user.name);
      setPhoneNo(order.shippingInfo.phoneNo);
      setAddress(order.shippingInfo.address);
      setAmount(order.totalPrice);
      setPurchasedItems(order.orderItems);
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert, id, loading, order]);

  return (
    <View style={styles.mainContainer}>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <SafeAreaView>
            <Text style={styles.subHeading}>Shipping Details</Text>
            <View style={styles.orderDetailsContainer}>
              <View style={styles.details}>
                <Text style={styles.detail}>Name</Text>
                <Text style={styles.detail}>{name}</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detail}>Phone No</Text>
                <Text style={styles.detail}>{phoneNo}</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.detail}>Address</Text>
                <Text style={styles.detail}>{address}</Text>
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
                <Text style={styles.detail}>${amount}</Text>
              </View>
            </View>

            <Text style={styles.subHeading}>Purchased Items</Text>
            <View style={{ height: height * 0.388, marginBottom: 10 }}>
              <ScrollView>
                {purchasedItems.map((item) => (
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
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#283148",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 15,
    paddingTop: 40,
  },
  subHeading: {
    fontSize: 35,
    marginBottom: 20,
    marginLeft: 5,
    color: "#fff",
    marginTop: 25,
  },
  orderDetailsContainer: {
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
});
