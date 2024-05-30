import { View, Text, Image, StyleSheet,Platform, TouchableOpacity } from 'react-native';
import React from 'react';
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';

const ProductCard = (props) => {

  const navigation = useNavigation();
  const id = props.product._id;

  return (
    <TouchableOpacity onPress={() => navigation.navigate("product",{id})}>
      <View style={Styles.container}>
      <View style={Styles.imageContainer}>
      <Image style={Styles.image} source={{uri: `${props.product.images[0].url}`}} alt={props.product.name}/>
      </View>
      <View style={Styles.productContentContainer}>
        <Text style={Styles.productText}>{props.product.name}</Text>
        <View style={{display:"flex",flexDirection:"row", alignItems:"center"}}>
        <Rating tintColor='#283148' ratingCount={5} imageSize={20} readonly={true} startingValue={`${props.product.ratings}`} style={Styles.rating}/>
        <Text style={Styles.reviews}>{props.product.noOfReviews === 1 || props.product.noOfReviews === 0 ? `(${props.product.noOfReviews} review)` : `(${props.product.noOfReviews} reviews)`}</Text>
        </View>
        <Text style={Styles.price}>₹{props.product.price}</Text>
      </View>
    </View>
    </TouchableOpacity>
)}

export default ProductCard;


const Styles = StyleSheet.create({
  container: {
    width:210,
    minHeight:290,
    borderRadius: 10,
    borderWidth:1,
    backgroundColor: '#fff',
    overflow:"hidden",
    marginVertical: 5,
    // iOS shadow properties
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 10,
      },
    })
  },
  imageContainer:{
    height:190,
    overflow:"hidden",
  },
  image: {
    height:180,
    objectFit:"contain"
  },
  productContentContainer: {
    padding:5,
    paddingBottom:18,
    backgroundColor:"#283148",
  },
  reviews: {
    fontSize: 19,
    fontWeight:"900",
    color:"white"
  },
  productText: {
    fontSize: 21,
    marginBottom: 5,
    fontWeight:"900",
    color:"white"
  },
  price: {
    fontWeight:"900",
    fontSize: 17,
    marginTop:5,
    color:"white"
  }
});

