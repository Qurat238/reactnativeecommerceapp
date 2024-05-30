import { View, Text, SafeAreaView, Platform, StatusBar, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import Icon1 from "react-native-vector-icons/Octicons";
import image from "../assets/banner.png";
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, clearErrors } from "../reducers/productReducer";
import NavBar from '../components/NavBar';
import Slider from '@react-native-community/slider';
import { Keyboard } from 'react-native';


const Home = ({navigation}) => {

  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [ratings, setRatings] = useState(0);
  const [price, setPrice] = useState([0,25000]);
  const [modalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isKeyboardActive, setKeyboardActive] = useState(false);

  const {products,loading,error,productsCount, resultPerPage, filteredProductsCount} = useSelector(state => state.products);
  const { isAuthenticated } = useSelector((state) => state.user);

  const totalPages = Math.ceil(productsCount / resultPerPage);

  const categories = [
    "Tops",
    "Bottoms",
    "Hand Bags",
    "Shoes",
    "Rings",
    "Wrist Watches",
    "Tracksuits"
];


const setCurrentPageNo = (e) => {
  setCurrentPage(e);
}

const toggleModal = () => {
  setModalVisible(!modalVisible);
};

const handlePriceChange = (value) => {
  setPrice([0,value]);
}

const handleRatingChange = (value) => {
  setRatings(value);
}

const stateHandler = () => {
  setState(true);
}


  useEffect(()=>{
    if(!isAuthenticated){
      navigation.navigate("login");
  }
    if(error){
        alert(error);
        dispatch(clearErrors());
    }
   dispatch(getProduct(keyword, currentPage,price, category,ratings));
    setState(false);
},[dispatch, alert,error, keyword, currentPage, category, state]);

useEffect(() => {
  const keyboardDidShowListener = Keyboard.addListener(
    'keyboardDidShow',
    () => {
      setKeyboardActive(true);
    }
  );
  const keyboardDidHideListener = Keyboard.addListener(
    'keyboardDidHide',
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
  <View style={Styles.container}>
  <ScrollView>
    <SafeAreaView>
    <View>
    <TextInput
      placeholder="Search Products..."
      onChangeText={(text) => setKeyword(text)}
      value={keyword}
      style={Styles.search}
    />
    </View>
      <Icon1 name="filter" size={40}  style={Styles.filter} onPress={toggleModal}/>
      {
        modalVisible && (
          <View style={Styles.modalOverlay}>
              <View style={Styles.modal}>
                <Text style={Styles.modalText}>Price</Text>
                <Slider
                  style={Styles.slider}
                  minimumValue={0}
                  maximumValue={25000}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  step={1}
                  onValueChange={handlePriceChange}
                />
                <Text style={Styles.modalLabel}>0$                                                           25000$</Text>
                <Text style={Styles.modalText}>Rating</Text>
                <Slider
                  style={Styles.slider}
                  minimumValue={0}
                  maximumValue={5}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  step={1}
                  onValueChange={handleRatingChange}
                />
                <Text style={Styles.modalLabel}>1                                                                        5</Text>
                <Button style={Styles.modalBtn} onPress={() => {toggleModal();  stateHandler();}}><Text style={Styles.modalBtnText}>Apply</Text></Button>
              </View>
          </View>
        )
      }

<View style={Styles.banner}>
            <Image style={Styles.bannerImage} source={image} alt='shopping'/>
            <View style={Styles.bannerHeadingContainer}>
              <Text style={Styles.bannerHeading}>Shop</Text>
              <Text style={Styles.bannerHeading}>Online</Text>
            </View>
          </View>


      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={Styles.tags}>
          <Button onPress={() => setCategory("")} style={Styles.tagBtn}><Text style={Styles.tagText}>All</Text></Button>
            {categories.map((category, index) => {
              return(
                <Button key={index} onPress={() => setCategory(category)} style={Styles.tagBtn}>
                <Text style={Styles.tagText}>{category}</Text>
              </Button>
              )
            })}
          </View>
          </ScrollView>
      <View style={Styles.productContainer}>
        {products && products.map((product) => <ProductCard key={product._id} product={product}/>)}
      </View>
      {resultPerPage < count && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPageNo} />
      )}
    </SafeAreaView>
  </ScrollView>
  {!isKeyboardActive && <NavBar/>}
  </View>
)
}

export default Home;

const Styles = StyleSheet.create({

  container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingTop: Platform.OS==="android" ? StatusBar.currentHeight : 0,
      padding:10,
  },
  filter: {
    position: "absolute",
    right: 10,
    top: 5
  },
  search :{
    width: 370,
    color:"black",
    fontSize:20,
  },
  modalOverlay:{
    backgroundColor:"rgba(0, 0, 0, .5)", 
    zIndex:1000, 
    height:1400, 
    width:430, 
    position:"absolute"
  },
  modal:{
    backgroundColor:"white", 
    width:350, 
    height:330, 
    marginTop:300, 
    marginLeft:40, 
    padding:15, 
    paddingLeft:20
  },
  modalText:{
    fontSize:23, 
    fontWeight:"900"
  },
  modalLabel:{
    marginLeft:10, 
    fontSize:15, 
    fontWeight:"900", 
    marginBottom:20
  },
  modalBtn:{
    backgroundColor:"#283148", 
    width:100, 
    alignSelf:"center", 
    padding:10
  },
  modalBtnText:{
    color:"white", 
    fontSize:20
  },
  slider:{
    width: 300, 
    marginTop:20
  },
  tags: {
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    overflow:"scroll"
  },
  productContainer: {
    marginTop:10,
    flex:1,
    flexDirection:"row",
    flexWrap:"wrap",
    gap:8,
    marginBottom:70
  },
  tagBtn:{
    backgroundColor:"#FF5959",
    padding: 10
},
tagText: {
    fontSize: 20,
    color:"black",
    fontWeight:"900"
},
banner: {
  backgroundColor: "#FF5959",
  marginTop:50,
  borderRadius:30,
  height: 200,
  display: "flex",
  flexDirection: "row"
},
bannerImage : {
   width: 300,
   height: 300,
   marginTop: -90,
   marginLeft: 20
},
bannerHeadingContainer: {
  marginTop: 30,
  marginLeft: -60
},
bannerHeading: {
  fontSize: 45,
  fontWeight:"900",
}
});