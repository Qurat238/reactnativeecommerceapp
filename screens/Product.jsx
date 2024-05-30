import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Platform, StatusBar, Dimensions, ScrollView, SafeAreaView, Modal, TouchableOpacity, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import ReviewCard from '../components/ReviewCard';
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getProductDetails, newReviewReset } from '../reducers/productReducer';
import { newReview } from '../reducers/productReducer';
import { addItemsToCart } from "../reducers/cartReducer";
import { useRoute } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import Loader from '../components/Loader';

const Product = ({ navigation }) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { product, loading, error } = useSelector((state) => state.productDetails);
  const { success, error:reviewError } = useSelector((state) => state.newReview);
  const width = Dimensions.get('window').width;
  const { id } = route.params;


  const addToCartHandler = () => {
    dispatch(addItemsToCart(id,1));
    alert("Item added To Cart");
  }

  useEffect(() => {
    if(error){
      alert(error);
      dispatch(clearError());
    }
    if(reviewError){
      alert(reviewError);
      dispatch(clearError());
    }
    if (success) {
      alert('Review Submitted Successfully');
      dispatch(newReviewReset());
      setSubmitModalVisible(false);
    }
    dispatch(getProductDetails(id));
  }, [id, success, dispatch, reviewError,error]);

  const submitReviewHandler = () => {
    const reviewData = {
      rating,
      comment,
      productId: id,
    };
    dispatch(newReview(reviewData));
  };

  const images = product?.images?.map((image) => image.url) || [];

  return (
    <View style={styles.container}>
     {loading ? <Loader/> : 
         <View>
          <ScrollView>
         <SafeAreaView>
           <View style={styles.imageContainer}>
             <Button
               style={styles.backBtn}
               onPress={() => navigation.navigate("home")}
             >
               <View><Icon2 name="arrow-back" size={30} /></View>
             </Button>
             <Carousel
               loop
               width={width}
               height={width}
               autoPlay={true}
               data={images}
               scrollAnimationDuration={1000}
               renderItem={({ item }) => (
                 <Image style={styles.image} source={{ uri: item }} />
               )}
             />
           </View>
 
           <View style={styles.contentContainer}>
             <View style={styles.productDetails}>
               <View style={styles.nameContainer}>
                 <Text style={styles.productName}>{product.name}</Text>
                 <Text style={styles.productPrice}>${product.price}</Text>
               </View>
               <View style={styles.productRating}>
                 <Rating tintColor='#283148' ratingCount={5} imageSize={30} readonly={true} startingValue={product.ratings} />
                 <Text style={styles.reviews}>{product.noOfReviews === 1 ? `(${product.noOfReviews} review)` : `(${product.noOfReviews} reviews)`}</Text>
               </View>
               <View style={styles.statusContainer}>
                 <Text style={styles.statusKey}>Status</Text>
                 <Text style={styles.statusValue}>{product.stock < 1 ? "OutOfStock" : "InStock"}</Text>
               </View>
               <Text style={styles.productDescription}>{product.description}</Text>
             </View>
             <View style={{display:"flex", flexDirection:"column", gap:30}}>
             <View style={styles.Btn}>
                 <Text style={styles.BtnText}>Reviews</Text>
                 <Button onPress={() => setModalVisible(true)}><View><Icon2 name="arrow-forward" size={30} /></View></Button>
               </View>
               <View style={styles.Btn}>
                 <Text style={styles.BtnText}>Add To Cart</Text>
                 <Button onPress={addToCartHandler}><View><Icon2 name="arrow-forward" size={30} /></View></Button>
               </View>
             </View>
           </View>
         </SafeAreaView>
       </ScrollView>
 
       <Modal
         animationType="slide"
         transparent={true}
         visible={modalVisible}
         onRequestClose={() => setModalVisible(false)}
       >
         <View style={styles.modalContainer}>
           <View style={styles.modalContent}>
             <View style={styles.modalHeader}>
               <TouchableOpacity onPress={() => setModalVisible(false)}>
                 <Icon2 name="arrow-back" size={40} color="white"/>
               </TouchableOpacity>
               <Button style={styles.submitReviewBtn} onPress={() => setSubmitModalVisible(true)}>
                 <View><Text style={styles.submitReviewText}>Submit Review</Text></View>
               </Button>
             </View>
             <ScrollView contentContainerStyle={styles.reviewContainer}>
               {product.reviews && product.reviews.length > 0 ? (
                 product.reviews.map((review) => (
                   <ReviewCard key={review._id} review={review} />
                 ))
               ) : (
                 <Text style={styles.noReviewsText}>No Reviews Yet...</Text>
               )}
             </ScrollView>
           </View>
         </View>
       </Modal>
 
 
       <Modal
         animationType="slide"
         transparent={true}
         visible={submitModalVisible}
         onRequestClose={() => setSubmitModalVisible(false)}
       >
         <View style={styles.modalContainer}>
           <View style={styles.modalContent}>
             <View style={styles.modalHeader}>
               <TouchableOpacity onPress={() => setSubmitModalVisible(false)}>
                 <Icon2 name="arrow-back" size={40} color="white"/>
               </TouchableOpacity>
               <Button style={styles.submitBtn} onPress={submitReviewHandler}>
                 <View><Text style={styles.submitText}>Submit</Text></View>
               </Button>
             </View>
             <View style={styles.reviewForm}>
               <Rating
                 onFinishRating={(rating) => setRating(rating)}
                 startingValue={rating}
                 imageSize={30}
                 style={styles.submitRating}
               />
               <TextInput
                 style={styles.textArea}
                 placeholder="Write your review here..."
                 multiline={true}
                 numberOfLines={5}
                 value={comment}
                 onChangeText={(text) => setComment(text)}
               />
             </View>
           </View>
         </View>
       </Modal>
         </View>
     }

    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backBtn: {
    marginTop:20
  },
  imageContainer: {
    width: 450,
    height: 350,
    backgroundColor: "#fff",
    display:"flex",
    flexDirection:"row",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginTop:20
  },
  contentContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#283148",
    marginTop: -15,
    paddingBottom: 20,
    height:600,
    paddingTop:30
  },
  productDetails: {
    padding: 20,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 30,
    fontWeight: "900",
    color: "white",
  },
  productPrice: {
    fontSize: 25,
    fontWeight: "900",
    color: "white",
  },
  productRating: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "white",
    padding: 5,
    marginVertical: 10,
  },
  reviews: {
    fontSize: 23,
    fontWeight: "900",
    color: "white",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  statusKey: {
    fontSize: 25,
    fontWeight: "900",
    color: "white",
  },
  statusValue: {
    fontSize: 25,
    color: "white",
    fontWeight: "900",
  },
  productDescription: {
    fontWeight: "600",
    fontSize: 20,
    color: "white",
    textAlign: "justify",
    marginTop:20,
    marginBottom:20
  },
  Btn:{
    display:"flex", 
    flexDirection:"row", 
    backgroundColor:"#fff", 
    justifyContent:"space-between", 
    alignItems:"center", 
    marginLeft:20, 
    marginRight:20, 
    height:100, 
    borderRadius:10,
  },
  BtnText: {
    color: "#283148",
    fontSize:30,
    fontWeight:"900",
    marginLeft:20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 570,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding:10,
    paddingTop:0,
    paddingRight:0,
    backgroundColor:"#283148",
  },
  modalTitle: {
    fontSize: 40,
    fontWeight: "900",
    textAlign: "center",
    flex: 1,
  },
  reviewContainer: {
    padding: 20,
  },
  noReviewsText: {
    fontSize: 30,
    textAlign: "center",
    color: "black",
    marginBottom: 5,
  },
  submitReviewBtn: {
    backgroundColor: "#fff",
    padding:10,
    paddingTop:15,
    margin: 15,
    marginTop: 30,
  },
  submitReviewText: {
    fontSize: 25,
    fontWeight: "900",
    color: "#283148",
    textAlign: "center",
  },
  submitBtn: {
    backgroundColor: "#fff",
    padding:10,
    paddingTop:15,
    margin: 15,
    marginTop: 30,
  },
  submitText: {
    fontSize: 25,
    fontWeight: "900",
    color: "#283148",
    textAlign: "center",
  },
  reviewForm:{
    padding:40,
    flexDirection: 'column',
    marginBottom: 10, 
    gap:30
  },
  submitRating: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textArea: {
    height: 300, 
    fontSize:30,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    padding: 10, 
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black',  
  },
});
