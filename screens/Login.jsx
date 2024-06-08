import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../reducers/userReducer";
import Loader from "../components/Loader";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    dispatch(login(email, password));
    navigation.navigate("home");
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("home");
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert, navigation, isAuthenticated]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.formContainer}>
          <SafeAreaView>
            <Text style={styles.heading}>Welcome</Text>
            <View>
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
            <TouchableOpacity onPress={() => navigation.navigate("register")}>
              <Text style={styles.link}>Create Account</Text>
            </TouchableOpacity>
            <Button
              disabled={!email || !password}
              style={styles.btn}
              onPress={loginHandler}
            >
              <View>
                <Text style={styles.btnText}>Login</Text>
              </View>
            </Button>

            <TouchableOpacity onPress={() => navigation.navigate("forgot")}>
              <Text style={styles.forgotLink}>Forget Password</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

export default Login;

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
  heading: {
    fontSize: 50,
    fontWeight: "900",
    margin: 40,
    marginLeft: 5,
    alignSelf: "center",
    color: "#fff",
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
    height: 30,
    margin: 20,
    marginRight: 5,
    textAlign: "right",
    fontSize: 25,
    fontWeight: "900",
    color: "#fff",
  },
  forgotLink: {
    height: 30,
    margin: 20,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "900",
    color: "#fff",
  },
  btn: {
    backgroundColor: "#FF9B42",
    borderRadius: 50,
    padding: 10,
  },
  btnText: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "900",
  },
});
