import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { clearError, register } from "../reducers/userReducer";
import mime from "mime";
import Loader from "../components/Loader";

const Register = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const registerHandler = () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("avatar", {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split("/").pop(),
    });
    dispatch(register(myForm));
    navigation.navigate("home");
  };

  useEffect(() => {
    if (route.params) {
      if (route.params.image) {
        setAvatar(route.params.image);
      }
    }
    if (isAuthenticated) {
      navigation.navigate("home");
    }
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [route, navigation, dispatch, error, isAuthenticated]);

  const handleImage = async () => {
    navigation.navigate("picker", {
      register: true,
    });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.formContainer}>
          <SafeAreaView>
            <Avatar.Image
              size={130}
              source={{ uri: avatar ? avatar : null }}
              style={styles.avatar}
            />

            <TouchableOpacity>
              <Text onPress={handleImage} style={styles.avatarLink}>
                Change Photo
              </Text>
            </TouchableOpacity>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />

              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />

              <TextInput
                secureTextEntry
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <Text style={styles.link}>Already have an account?</Text>
            </TouchableOpacity>
            <Button
              disabled={!email || !password || !name}
              style={styles.btn}
              onPress={registerHandler}
            >
              <View>
                <Text style={styles.btnText}>Signup</Text>
              </View>
            </Button>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#283148",
    justifyContent: "center",
    padding: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  avatar: {
    backgroundColor: "#fff",
    alignSelf: "center",
  },

  avatarLink: {
    color: "#900",
    textAlign: "center",
    fontSize: 25,
    margin: 20,
    color: "#fff",
    fontWeight: "900",
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
    fontWeight: "900",
  },
  link: {
    color: "#fff",
    height: 30,
    margin: 20,
    marginRight: 5,
    textAlign: "right",
    fontSize: 25,
    fontWeight: "900",
  },

  btn: {
    backgroundColor: "#FF9B42",
    padding: 10,
    borderRadius: 50,
  },

  btnText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "900",
  },
});
