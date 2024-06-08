import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';

const OrderItemCard = (props) => {

    const navigation = useNavigation();

    const isoDateString = props.item.paidAt;
    const date = new Date(isoDateString);
    const formattedDate = date.toISOString().split('T')[0];

    const id = props.item._id;

  return (
    <View style={styles.orderItemContainer}>
        <View style={styles.orderIdInfo}>
            <Text style={styles.orderId}>Order#{props.item._id}</Text>
            <Button onPress={() => navigation.navigate("order",{id})} style={{marginTop:10}}><View><Icon2 name="arrow-outward" size={25}/></View></Button>
        </View>
        <View style={styles.twoViews}>
            <View>
            <View style={styles.orderItemInfo}>
                <Text style={styles.subHeading}>Quantity:</Text>
                <Text style={styles.subText}>{props.item.orderItems[0].quantity}</Text>
            </View>
            <View style={styles.orderItemInfo}>
                <Text style={styles.subHeading}>Amount:</Text>
                <Text style={styles.subText}>${props.item.totalPrice}</Text>
            </View>
            </View>
            <View>
            <View style={styles.orderItemInfo}>
                <Text style={styles.subHeading}>Status:</Text>
                <Text style={styles.subText}>{props.item.orderStatus}</Text>
            </View>
            <View style={styles.orderItemInfo}>
                <Text style={styles.subHeading}>Paid At:</Text>
                <Text style={styles.subText}>{formattedDate}</Text>
            </View>
            </View>
        </View>
    </View>
  )
}

export default OrderItemCard;

const styles = StyleSheet.create({

    orderItemContainer:{
      backgroundColor:"#fff",
      borderRadius:10,
      marginBottom:17.5,
      padding:10,
      paddingLeft:20,
      paddingBottom:30
    },
    orderIdInfo:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    orderId:{
        fontSize:20,
        fontWeight:"900",
        color:"#FF9B42"
    },
    twoViews:{
        flexDirection:"row",
        justifyContent:"flex-start",
        gap:50
    },
    orderItemInfo:{
        flexDirection:"row",
        alignItems:"center",
        gap:10
    },
    subHeading:{
        fontSize:20,
        fontWeight:"900",
    },
    subText:{
        fontSize:17,
        fontWeight:"600"
    }
});