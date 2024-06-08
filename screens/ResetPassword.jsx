import {
  View,
  Text,
  TextInput,
  Platform,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  clearErrors,
  resetPassword,
  resetPasswordReset,
} from "../reducers/userReducer";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Loader from "../components/Loader";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { error, loading, success } = useSelector(
    (state) => state.forgotPassword
  );

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = () => {
    const passwords = { otp, password, confirmPassword };
    dispatch(resetPassword(passwords));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert("Password Updated Successfully");
      navigation.navigate("login");
      dispatch(resetPasswordReset());
    }
  }, [dispatch, error, success, navigation]);

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
              <Text style={styles.heading}>Reset</Text>
            </View>

            <View>
              <TextInput
                secureTextEntry
                style={styles.input}
                placeholder="OTP"
                value={otp}
                onChangeText={setOtp}
              />
              <TextInput
                secureTextEntry
                style={styles.input}
                placeholder="New Password"
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                secureTextEntry
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <Button style={styles.btn} onPress={resetPasswordSubmit}>
                <View><Text style={styles.btnText}>Reset</Text></View>
              </Button>
            </View>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

export default ResetPassword;

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
    marginLeft: 60,
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
  btn: {
    backgroundColor: "#FF9B42",
    padding: 10,
    borderRadius: 50,
    marginTop: 20,
  },
  btnText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "900",
  },
});
