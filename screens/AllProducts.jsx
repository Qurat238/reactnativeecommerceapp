import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import Loader from "../components/Loader";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteProduct,
  deleteProductReset,
  getAdminProduct,
} from "../reducers/productReducer";

const AllProducts = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { error, products, loading } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const { width } = Dimensions.get("window");

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getAdminProduct());
    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert("Product Deleted Successfully");
      navigation.navigate("dashboard");
      dispatch(deleteProductReset());
    }
  }, [dispatch, error, deleteError, isDeleted, navigation]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
              <Text style={styles.heading}>All Products</Text>
            </View>

            <ScrollView>
              {products &&
                products.map((item) => (
                  <View
                    style={styles.productItemContainer}
                    key={item && item._id}
                  >
                    <View style={styles.ImageContainer}>
                      <Image
                        source={{ uri: item && item.images[0].url }}
                        style={styles.userDP}
                      />
                    </View>
                    <View>
                      <View
                        style={[styles.productInfo, { width: width * 0.74 }]}
                      >
                        <View>
                          <Text style={styles.name}>{item && item.name}</Text>
                          <Text style={styles.idBtnText}>{item._id}</Text>
                        </View>
                        <View style={styles.btn}>
                          <Button
                            onPress={() =>
                              navigation.navigate("processproduct", {
                                id: item._id,
                              })
                            }
                          >
                            <View>
                              <Icon2 name="edit" size={30} />
                            </View>
                          </Button>
                          <Button
                            onPress={() => deleteProductHandler(item._id)}
                          >
                            <View>
                              <Icon2 name="delete" size={30} />
                            </View>
                          </Button>
                        </View>
                      </View>
                      <View style={[styles.twoViews, { width: width * 0.7 }]}>
                        <View style={styles.productItemInfo}>
                          <Text style={styles.subHeading}>Price:</Text>
                          <Text style={styles.subText}>
                            ${item && item.price}
                          </Text>
                        </View>
                        <View style={styles.productItemInfo}>
                          <Text style={styles.subHeading}>Stock:</Text>
                          <Text style={styles.subText}>
                            {item && item.stock}
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

export default AllProducts;

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
    marginLeft: 40,
  },
  productItemContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 17.5,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  ImageContainer: {
    marginRight: 10,
  },
  userDP: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "black",
    objectFit: "contain",
  },
  productInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  name: {
    fontSize: 23,
    fontWeight: "900",
  },
  idBtnText: {
    fontWeight: "900",
    fontSize: 16,
    color: "#FF9B42",
  },
  btn: {
    flexDirection: "row",
    marginLeft: -10,
  },
  twoViews: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -10,
  },
  productItemInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "900",
  },
  subText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
