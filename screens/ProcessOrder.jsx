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
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
  updateOrderReset,
} from "../reducers/orderReducer";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { Button } from "react-native-paper";
import Loader from "../components/Loader";
import { Picker } from "@react-native-picker/picker";

const ProcessOrder = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  const [status, setStatus] = useState("");

  const [purchasedItems, setPurchasedItems] = useState([]);

  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const { id } = route.params;

  const processOrderSubmitHandler = () => {
    dispatch(updateOrder(id, { status }));
  };

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
    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      setStatus("");
      alert("Order Updated Successfully");
      navigation.navigate("dashboard");
      dispatch(updateOrderReset());
    }
  }, [
    dispatch,
    error,
    alert,
    id,
    loading,
    order,
    navigation,
    isUpdated,
    updateError,
  ]);

  return (
    <View style={styles.mainContainer}>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <SafeAreaView>
            <View style={styles.headingContainer}>
              <Button
                style={styles.backBtn}
                onPress={() => navigation.navigate("allorders")}
              >
                <View>
                  <Icon2 name="arrow-back" size={30} color="white" />
                </View>
              </Button>
              <Text style={styles.orderHeading}>Process Order</Text>
            </View>

            <View style={styles.selectContainer}>
              <Picker
                style={styles.input}
                selectedValue={status}
                onValueChange={(itemValue) => setStatus(itemValue)}
              >
                <Picker.Item label="Choose Category" value="" />
                {order && order.orderStatus === "Processing" && (
                  <Picker.Item label="Shipped" value="Shipped" />
                )}
                {order && order.orderStatus === "Shipped" && (
                  <Picker.Item label="Delivered" value="Delivered" />
                )}
              </Picker>
              <Button
                style={styles.processBtn}
                onPress={processOrderSubmitHandler}
              >
                <View>
                  <Text style={styles.processBtnText}>Process</Text>
                </View>
              </Button>
            </View>

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
            <View style={{ height: 235, marginBottom: 10 }}>
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

export default ProcessOrder;

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
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  orderHeading: {
    fontSize: 40,
    fontWeight: "900",
    margin: 10,
    color: "#fff",
    marginLeft: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#F9F6EE",
    padding: 20,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 20,
    fontWeight: "900",
  },
  processBtn: {
    backgroundColor: "#FF9B42",
    padding: 10,
    paddingTop: 15,
    borderRadius: 50,
    marginBottom: 30,
  },

  processBtnText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "900",
  },
  subHeading: {
    fontSize: 35,
    marginBottom: 20,
    marginLeft: 5,
    color: "#fff",
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
  line: {
    height: 2,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#283148",
  },
  btn: {
    backgroundColor: "#fff",
    height: 50,
    marginTop: 20,
    paddingTop: 10,
  },
  btnText: {
    fontSize: 25,
    fontWeight: "900",
    color: "#283148",
  },
});
