import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import Loader from "../components/Loader";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteOrder,
  deleteOrderReset,
  getAllOrders,
  clearErrors,
} from "../reducers/orderReducer";

const AllOrders = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { error, orders, loading } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getAllOrders());
    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert("Order Deleted Successfully");
      navigation.navigate("dashboard");
      dispatch(deleteOrderReset());
    }
  }, [dispatch, error, deleteError, isDeleted, navigation]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toISOString().split("T")[0];
  };

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
                onPress={() => navigation.navigate("dashboard")}
              >
                <View>
                  <Icon2 name="arrow-back" size={30} color="white" />
                </View>
              </Button>
              <Text style={styles.heading}>All Orders</Text>
            </View>

            <ScrollView>
              {orders &&
                orders.map((item) => (
                  <View style={styles.orderItemContainer} key={item._id}>
                    <View style={styles.orderIdInfo}>
                      <Text style={styles.idBtnText}>{item._id}</Text>
                      <View style={styles.btn}>
                        <Button
                          onPress={() =>
                            navigation.navigate("processorder", {
                              id: item._id,
                            })
                          }
                        >
                          <View>
                            <Icon2 name="edit" size={30} />
                          </View>
                        </Button>
                        <Button onPress={() => deleteOrderHandler(item._id)}>
                          <View>
                            <Icon2 name="delete" size={30} />
                          </View>
                        </Button>
                      </View>
                    </View>
                    <View style={styles.twoViews}>
                      <View>
                        <View style={styles.orderItemInfo}>
                          <Text style={styles.subHeading}>Quantity:</Text>
                          <Text style={styles.subText}>
                            {item.orderItems[0].quantity}
                          </Text>
                        </View>
                        <View style={styles.orderItemInfo}>
                          <Text style={styles.subHeading}>Amount:</Text>
                          <Text style={styles.subText}>${item.totalPrice}</Text>
                        </View>
                      </View>
                      <View>
                        <View style={styles.orderItemInfo}>
                          <Text style={styles.subHeading}>Status:</Text>
                          <Text style={styles.subText}>{item.orderStatus}</Text>
                        </View>
                        <View style={styles.orderItemInfo}>
                          <Text style={styles.subHeading}>Paid At:</Text>
                          <Text style={styles.subText}>
                            {formatDate(item.paidAt)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
            </ScrollView>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

export default AllOrders;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#283148",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 10,
    paddingBottom: 90,
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 15,
  },
  heading: {
    fontSize: 40,
    fontWeight: "900",
    margin: 10,
    color: "#fff",
    marginLeft: 60,
  },
  orderItemContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 17.5,
    padding: 10,
    paddingLeft: 20,
    paddingBottom: 30,
  },
  idBtnText: {
    fontWeight: "900",
    fontSize: 19,
    color: "#FF9B42",
  },
  btn: {
    flexDirection: "row",
  },
  twoViews: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 70,
  },
  orderIdInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderItemInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "900",
  },
  subText: {
    fontSize: 17,
    fontWeight: "600",
  },
});
