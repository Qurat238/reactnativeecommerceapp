import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Button, TextInput } from 'react-native-paper';
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { addItemsToCart } from "./../reducers/cartReducer";
import { useDispatch } from 'react-redux';

const CartItemCard = (props) => {

  const dispatch = useDispatch();
  

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if(stock <= quantity) return;
    dispatch(addItemsToCart(id,newQty));
}

const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if(1 >= quantity) return;
    dispatch(addItemsToCart(id,newQty));
}
    
  return (
      <View style={styles.cartItemContainer}>
        <View>
        <Image
            source={{uri: props.item ? props.item.image : null}}
            style={styles.image}
        /> 
        </View>
        <View>
            <View style={styles.cartItemInfo}>
                <Text style={styles.name}>{props.item.name}</Text>
                <Button onPress={() => props.deleteCartItems(props.item.product)} style={{marginTop:10}}><View><Icon2 name="delete" size={30}/></View></Button>
            </View>
            <View style={styles.cartItemPriceContainer}>
                <View style={styles.cartItemQuantity}>
                    <TouchableOpacity style={styles.btn} onPress={() => decreaseQuantity(props.item.product,props.item.quantity)}><Text style={styles.btnText}>-</Text></TouchableOpacity>
                    <TextInput readOnly value={String(props.item.quantity)} style={styles.input}/>
                    <TouchableOpacity style={styles.btn} onPress={() => increaseQuantity(props.item.product,props.item.quantity,props.item.stock)}><Text style={styles.btnText}>+</Text></TouchableOpacity>
                </View>
                <Text style={styles.price}>{`$${props.item.price * props.item.quantity}`}</Text>
            </View>
        </View>
      </View>
  )
}

export default CartItemCard;

const styles = StyleSheet.create({

  cartItemContainer:{
    backgroundColor:"#fff",
    flexDirection:"row",
    gap:20,
    marginBottom:10,
    borderRadius:10,
    padding:10
  },
  image:{
    height:90, 
    objectFit:"contain", 
    width:90, 
    borderWidth:1, 
    borderRadius:100, 
    borderColor:"grey"
  },
  input:{
    backgroundColor:"#fff", 
    width:50, 
    height:50
  },
  cartItemInfo:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"flex-start",
    width:"85%"
  },
  name:{
    fontSize:25,
    fontWeight:"900",
  },
  cartItemPriceContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    width:"85%"
  },
  cartItemQuantity:{
    flexDirection:"row"
  },
  btn:{
    backgroundColor:"#283148", 
    borderRadius:0, 
    height:50, 
    width:40
  },
  btnText:{
    fontSize:30, 
    textAlign:"center",
    color:"#fff"
  },
  price:{
    fontSize:20,
    fontWeight:"900",
    marginRight:15
  }
});