import { View, Text, TextInput, SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { saveShippingInfo } from '../reducers/cartReducer';


const Shipping = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const {shippingInfo} = useSelector((state) => state.cart);

    const [country, setCountry] = useState(shippingInfo.country);
    const [city, setCity] = useState(shippingInfo.city);
    const [address, setAddress] = useState(shippingInfo.address);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingHandler = () => {
        if(phoneNo.length < 10 || phoneNo.length > 10){
           alert("Phone No should be 10 digits long");
           return;
        }
        dispatch(saveShippingInfo({country, city, address, pinCode, phoneNo}));
        navigation.navigate("confirmorder");
    }

  return (
    <View style={styles.container}>
      <SafeAreaView>
      <Text style={styles.heading}>Shipping Details</Text>
      <View>
        <TextInput
            style={styles.input}
            placeholder="Country"
            value={country}
            onChangeText={setCountry}
        />
        <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
        />
        <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
        />
        <TextInput
            style={styles.input}
            placeholder="pinCode"
            value={pinCode}
            onChangeText={setPinCode}
        />
        <TextInput
            style={styles.input}
            placeholder="phoneNo"
            value={phoneNo}
            onChangeText={setPhoneNo}
        />
      </View>
      <Button
        style={styles.btn}
        onPress={shippingHandler}
      >
        <Text style={styles.btnText}>Continue</Text>
      </Button>
      </SafeAreaView>
    </View>
  )
}

export default Shipping;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#E8E7E8",
        justifyContent: "center",
        padding:20,
        paddingTop: Platform.OS==="android" ? StatusBar.currentHeight : 0
    },
    heading: {
        fontSize: 45, 
        fontWeight: "900",
        margin:40, 
        marginLeft:5,
        alignSelf:"center"
    },
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#F9F6EE",
        padding: 20,
        paddingLeft: 15,
        borderRadius: 5,
        marginVertical: 15,
        fontSize: 20
    },
    btn: {
        backgroundColor: "#900",
        padding: 13,
        borderRadius: 50,
        marginTop:20
    },
    btnText: {
        color: "#fff", 
        fontSize: 20
    }
});