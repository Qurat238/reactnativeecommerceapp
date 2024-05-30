import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import { deleteProduct } from '../reducers/productReducer';
import { useDispatch } from 'react-redux';

const ProductListCard = (props) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    }
    
  return (
    <View style={styles.productItemContainer}>
        <View style={styles.ImageContainer}>
            <Image source={{uri:props.item.images[0].url}} style={styles.userDP}/>
        </View>
        <View>
        <View style={styles.productInfo}>
            <Text style={styles.name}>{props.item.name}</Text>
            <View style={styles.btn}>
            <Button onPress={() => navigation.navigate("dashboard")} style={{marginTop:10}}><View><Icon2 name="edit" size={25}/></View></Button>
            <Button style={{marginTop:10}} onPress={deleteProductHandler(props.item._id)}><View><Icon2 name="delete" size={25}/></View></Button>
            </View>
        </View>
        <View style={styles.twoViews}>
            <View style={styles.orderItemInfo}>
                <Text style={styles.subHeading}>Price:</Text>
                <Text style={styles.subText}>${props.item.price}</Text>
            </View>
            <View style={styles.orderItemInfo}>
                <Text style={styles.subHeading}>Stock:</Text>
                <Text style={styles.subText}>{props.item.stock}</Text>
            </View>
        </View>
        </View>
    </View>
  )
}

export default ProductListCard;

const styles = StyleSheet.create({

    productItemContainer:{
      backgroundColor:"#fff",
      borderRadius:10,
      marginBottom:17.5,
      padding:20,
      paddingTop:10,
      flexDirection:"row",
      alignItems:"center"
    },
    ImageContainer:{
        marginRight:20
    },
    userDP:{
        width:70,
        height:70,
        borderRadius:50,
        borderWidth:3,
        borderColor:"black",
    },
    twoViews:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:275,
    },
    productInfo:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:300
    },
    orderItemInfo:{
        flexDirection:"row",
        alignItems:"center",
        gap:10
    },
    name:{
        fontSize:20,
        fontWeight:"900",
        color:"red"
    },
    btn:{
        flexDirection:"row",
    },
    subHeading:{
        fontSize:20,
        fontWeight:"900"
    },
    subText:{
        fontSize:19
    }
});