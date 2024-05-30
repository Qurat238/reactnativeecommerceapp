import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Avatar, Button } from 'react-native-paper';
import  {useDispatch, useSelector}  from 'react-redux';
import { clearError, register } from '../reducers/userReducer';
import mime from 'mime';
import Loader from "../components/Loader";

const Register = ({navigation, route}) => {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");

    const dispatch = useDispatch()
    const {error, loading, isAuthenticated} = useSelector(state => state.user);

    const registerHandler = () => {
        const myForm = new FormData();
        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("password", password);
            myForm.append("avatar", {
                uri: avatar,
                type: mime.getType(avatar),
                name: avatar.split("/").pop()
            })
        dispatch(register(myForm));
        navigation.navigate("home");
    }

    useEffect(() => {
        if (route.params) {
            if (route.params.image) {
                setAvatar(route.params.image)
            }
        }
        if(isAuthenticated){
            navigation.navigate("home");
        }
        if(error){
            alert(error);
            dispatch(clearError());
        }

    }, [route, navigation, dispatch, error, isAuthenticated])

    const handleImage = async() => {
        navigation.navigate("picker", {
            updateProfile: false
        })
    }

    return (
        <View style={Styles.container}>
            {loading ? <Loader/> : (
                <SafeAreaView>
                    <Avatar.Image
                        size={130}
                        source={{uri: avatar ? avatar : null}}
                        style={Styles.avatar}
                    />    
                
                <TouchableOpacity >
                    <Text onPress={handleImage} style={Styles.avatarLink}>Change Photo</Text>
                </TouchableOpacity>
                <View>
                <TextInput
                        style={Styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />
    
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
                <TouchableOpacity onPress={() => navigation.navigate("login")}>
                    <Text style={Styles.link}>Already have an account?</Text>
                </TouchableOpacity>
                <Button
                    disabled={!email || !password || !name}
                    style={Styles.btn}
                    onPress={registerHandler}
                >
                    <Text style={Styles.btnText}>Signup</Text>
                </Button>
                </SafeAreaView>
            )}
        </View>
    )
}

export default Register;

const Styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#E8E7E8",
        justifyContent: "center",
        padding:20,
        paddingTop: Platform.OS==="android" ? StatusBar.currentHeight : 0
    },

    avatar: {
        backgroundColor: "#000", 
        alignSelf:"center",
    },

    avatarLink: {
        color: "#900", 
        textAlign: "center", 
        fontSize: 20, margin: 20, 
        color:"#000",
        fontWeight:"600"
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