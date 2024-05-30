import { View, Text, TextInput, Platform, StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearError } from '../reducers/userReducer';
import { useNavigation } from '@react-navigation/native';

const Forgot = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [email, setEmail ] = useState(""); 

    const {error, message} = useSelector((state) => state.forgotPassword);


    const forgotPasswordSubmit = () => {
        dispatch(forgotPassword({email}));
        navigation.navigate("resetpassword");
    } 

    useEffect(() => {
        if(error){
            alert(error);
            dispatch(clearError());
        }
        if(message){
            alert(message);
        }
    },[dispatch,error,message]);

  return (
            <View style={styles.container}>
            <SafeAreaView>
            <View>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}
             />
            </View>
            <Button
              style={styles.btn}
              onPress={forgotPasswordSubmit}
             >
                  <Text style={styles.btnText}>Send</Text>
              </Button>
            </SafeAreaView>
          </View>
  )
}

export default Forgot;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#E8E7E8",
        paddingTop: Platform.OS==="android" ? StatusBar.currentHeight : 0,
        padding:20,
        justifyContent:"center"
    },
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#F9F6EE",
        padding: 20,
        paddingLeft: 15,
        borderRadius: 5,
        marginVertical: 15,
        fontSize: 20,
        marginBottom:40
    },
    btn: {
        backgroundColor: "#900",
        padding: 13,
        borderRadius: 50,
    },

    btnText: {
        color: "#fff", 
        fontSize: 20
    }
});