import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Platform, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login } from '../reducers/userReducer';

const Login = ({navigation}) => {

    const dispatch = useDispatch();
    const {error, loading, isAuthenticated} = useSelector(state => state.user);


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = () => {
        dispatch(login(email, password))
        navigation.navigate("home")
    }

    useEffect(() => {
        if(isAuthenticated){
            navigation.navigate("home");
        }
        if (error) {
            alert(error)
            dispatch(clearErrors());
        }

    }, [error, dispatch, alert, navigation, isAuthenticated])

    return (
            <View style={Styles.container}>
                <SafeAreaView>
                <Text style={Styles.heading}>Welcome</Text>
                <View>
                    <TextInput
                        style={Styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
    
                    <TextInput
                        secureTextEntry
                        style={Styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("register")}>
                    <Text style={Styles.link}>Create Account</Text>
                </TouchableOpacity>
                <Button
                    disabled={!email || !password}
                    style={Styles.btn}
                    onPress={loginHandler}
                >
                    <Text style={Styles.btnText}>Login</Text>
                </Button>
                
    
                <TouchableOpacity onPress={() => navigation.navigate("forgot")}>
                    <Text style={Styles.forgotLink}>Forget Password</Text>
                </TouchableOpacity>
                </SafeAreaView>
            </View>
    )
}

export default Login;

const Styles = StyleSheet.create({

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

    link: {
        color: "#000",
        height: 30,
        margin: 20,
        marginRight: 5,
        textAlign:"right",
        fontSize:20,
        fontWeight:"600"
    },

    forgotLink: {
        color: "#000",
        height: 30,
        margin: 20,
        textAlign:"center",
        fontSize:20,
        fontWeight:"600",
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
})