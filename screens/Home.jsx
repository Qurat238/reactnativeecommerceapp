import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import Icon1 from "react-native-vector-icons/Octicons";
import image from "../assets/shop.png";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, clearErrors } from "../reducers/productReducer";
import NavBar from "../components/NavBar";
import Slider from "@react-native-community/slider";
import { Keyboard } from "react-native";
import Loader from "../components/Loader";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const [price, setPrice] = useState([0, 25000]);
  const [modalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isKeyboardActive, setKeyboardActive] = useState(false);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.user);

  const totalPages = Math.ceil(productsCount / resultPerPage);

  const categories = [
    "Tops",
    "Bottoms",
    "Hand Bags",
    "Shoes",
    "Rings",
    "Wrist Watches",
    "Tracksuits",
  ];

  const { width, height } = Dimensions.get("window");

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handlePriceChange = (value) => {
    setPrice([0, value]);
  };

  const handleRatingChange = (value) => {
    setRatings(value);
  };

  const stateHandler = () => {
    setState(true);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate("login");
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
    setState(false);
  }, [dispatch, alert, error, keyword, currentPage, category, state]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardActive(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardActive(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  let count = filteredProductsCount;

  return (
    <View style={styles.mainContainer}>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <SafeAreaView>
          <ScrollView>
              <View style={styles.header}>
                <TextInput
                  placeholder="Search Products..."
                  onChangeText={(text) => setKeyword(text)}
                  value={keyword}
                  style={styles.search}
                />
                <Icon1
                  name="filter"
                  size={40}
                  onPress={toggleModal}
                  style={{ color: "#FF9B42" }}
                />
              </View>
              {modalVisible && (
                <View style={[styles.modalOverlay, {width, height}]}>
                  <View style={[styles.modal, {width:width*0.75, height:height*0.425}]}>
                    <Text style={styles.modalText}>Price</Text>
                    <Slider
                      style={[styles.slider, {width: width*0.67}]}
                      minimumValue={0}
                      maximumValue={25000}
                      minimumTrackTintColor="#FFFFFF"
                      maximumTrackTintColor="#000000"
                      step={1}
                      onValueChange={handlePriceChange}
                    />
                    <Text style={styles.modalLabel}>0$                                     25000$</Text>
                    <Text style={styles.modalText}>Rating</Text>
                    <Slider
                      style={[styles.slider, {width: width*0.67}]}
                      minimumValue={0}
                      maximumValue={5}
                      minimumTrackTintColor="#FFFFFF"
                      maximumTrackTintColor="#000000"
                      step={1}
                      onValueChange={handleRatingChange}
                    />
                    <Text style={styles.modalLabel}>1                                                   5</Text>
                    <Button
                      style={styles.modalBtn}
                      onPress={() => {
                        toggleModal();
                        stateHandler();
                      }}
                    >
                      <View><Text style={styles.modalBtnText}>Apply</Text></View>
                    </Button>
                  </View>
                  </View>
              )}
              <View style={styles.banner}>
                <Image
                  style={styles.bannerImage}
                  source={image}
                  alt="shopping"
                />
                <View style={styles.bannerHeadingContainer}>
                  <Text style={styles.bannerHeading}>Shop</Text>
                  <Text style={styles.bannerHeading}>Online</Text>
                </View>
              </View>

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.tags}>
                  <Button onPress={() => setCategory("")} style={styles.tagBtn}>
                    <View><Text style={styles.tagText}>All</Text></View>
                  </Button>
                  {categories.map((category, index) => {
                    return (
                      <Button
                        key={index}
                        onPress={() => setCategory(category)}
                        style={styles.tagBtn}
                      >
                        <View><Text style={styles.tagText}>{category}</Text></View>
                      </Button>
                    );
                  })}
                </View>
              </ScrollView>
              <View style={styles.productContainer}>
                {products &&
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </View>
              {resultPerPage < count && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPageNo}
                />
              )}
              
          </ScrollView>
          </SafeAreaView>
          {!isKeyboardActive && <NavBar />}
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#283148",
    padding: 10,
    paddingTop: Platform.OS==="android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop:10
  },
  search: {
    flex: 0.95,
    backgroundColor: "#fff",
    fontWeight: "900",
    borderWidth: 1,
    fontSize:20,
    borderColor: "rgba(0,0,0,0.3)",
  },
  modalOverlay:{
    backgroundColor: "rgba(0,0,0,0.5)", 
    position:"absolute", 
    zIndex:1000, 
    alignItems:"center", 
    justifyContent:"center"
  },
  modal:{
    padding:15, 
    paddingLeft:20, 
    backgroundColor:"#fff",
    justifyContent:"center"
  },
  modalText: {
    fontSize: 27,
    fontWeight: "900",
  },
  modalLabel: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 20,
  },
  slider: {
    marginTop: 20,
  },
  modalBtn: {
    backgroundColor: "#283148",
    width: 150,
    alignSelf: "center",
    padding: 10,
    paddingTop:15,
    borderRadius:30
  },
  modalBtnText: {
    color: "#fff",
    fontSize: 23,
    fontWeight:"900"
  },
  banner: {
    backgroundColor: "#FF9B42",
    marginTop: 15,
    borderRadius: 30,
    height: 200,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 25,
    gap: 10,
  },
  bannerImage: {
    flex: 0.5,
    width: 240,
    height: 240,
    marginTop: -40,
  },
  bannerHeadingContainer: {
    flex: 0.5,
  },
  bannerHeading: {
    fontSize: 50,
    fontWeight: "900",
    color: "#fff",
  },
  tags: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    overflow: "scroll",
  },
  tagBtn: {
    backgroundColor: "#FF9B42",
    padding: 10,
    paddingTop:15
  },
  tagText: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "900",
  },
  productContainer: {
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginBottom: 40,
    paddingBottom:20
  },
});


