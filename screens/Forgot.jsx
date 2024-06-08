import {
  View,
  Text,
  TextInput,
  Platform,
  StatusBar,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  clearErrors,
  forgotPasswordReset,
} from "../reducers/userReducer";
import { useNavigation } from "@react-navigation/native";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Loader from "../components/Loader";

const Forgot = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const forgotPasswordSubmit = () => {
    dispatch(forgotPassword({ email }));
    navigation.navigate("resetpassword");
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert(message);
      dispatch(forgotPasswordReset());
    }
  }, [dispatch, error, message]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.formContainer}>
          <SafeAreaView>
            <View style={styles.headingContainer}>
              <Button
                style={{ marginTop: 10 }}
                onPress={() => navigation.navigate("login")}
              >
                <View>
                  <Icon2 name="arrow-back" size={30} color="white" />
                </View>
              </Button>
              <Text style={styles.heading}>Forgot</Text>
            </View>

            <View>
              <TextInput
                style={styles.input}
                placeholder="Enter Email"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <Button style={styles.btn} onPress={forgotPasswordSubmit}>
              <View><Text style={styles.btnText}>Send</Text></View>
            </Button>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

export default Forgot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#283148",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 20,
    justifyContent: "center",
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  heading: {
    fontSize: 50,
    fontWeight: "900",
    margin: 40,
    marginLeft: 50,
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
    marginBottom: 40,
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
