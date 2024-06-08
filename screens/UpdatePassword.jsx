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
import {
  clearError,
  updatePassword,
  updatePasswordReset,
} from "../reducers/userReducer";
import Loader from "../components/Loader";
import Icon2 from "react-native-vector-icons/MaterialIcons";

const UpdatePassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = () => {
    const passwords = { oldPassword, newPassword, confirmPassword };
    dispatch(updatePassword(passwords));
  };
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert("Password Updated Successfully");
      navigation.navigate("profile");
      dispatch(updatePasswordReset());
    }
  }, [dispatch, error, isUpdated, navigation]);

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
                onPress={() => navigation.navigate("profile")}
              >
                <View>
                  <Icon2 name="arrow-back" size={30} color="white" />
                </View>
              </Button>
              <Text style={styles.heading}>Update</Text>
            </View>
            <View>
              <TextInput
                secureTextEntry
                style={styles.input}
                placeholder="Old Password"
                value={oldPassword}
                onChangeText={setOldPassword}
              />
              <TextInput
                secureTextEntry
                style={styles.input}
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TextInput
                secureTextEntry
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <Button style={styles.btn} onPress={updatePasswordSubmit}>
                <View>
                  <Text style={styles.btnText}>Change</Text>
                </View>
              </Button>
            </View>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

export default UpdatePassword;

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
    fontWeight: "900",
  },
  btn: {
    backgroundColor: "#FF9B42",
    padding: 10,
    paddingTop: 15,
    borderRadius: 50,
    marginTop: 20,
  },
  btnText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "900",
  },
});
