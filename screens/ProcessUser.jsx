import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  updateUserReset,
  clearErrors,
  updateUser,
} from "../reducers/userReducer";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { Button } from "react-native-paper";
import Loader from "../components/Loader";
import { Picker } from "@react-native-picker/picker";

const ProcessUser = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id } = route.params;

  const processUserSubmitHandler = () => {
    dispatch(updateUser(id, { role }));
  };

  useEffect(() => {
    if (!loading) {
      const fetchData = async () => {
        if (user && user._id !== id) {
          await dispatch(getUserDetails(id));
        }
      };
      fetchData();
    }

    if (user && !loading && user._id === id) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      setRole("");
      alert("User Updated Successfully");
      navigation.navigate("dashboard");
      dispatch(updateUserReset());
    }
  }, [dispatch, error, alert, id, loading, navigation, isUpdated, updateError]);

  return (
    <View style={styles.mainContainer}>
      {loading || updateLoading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <SafeAreaView>
            <View style={styles.headingContainer}>
              <Button
                style={styles.backBtn}
                onPress={() => navigation.navigate("allusers")}
              >
                <View>
                  <Icon2 name="arrow-back" size={30} color="white" />
                </View>
              </Button>
              <Text style={styles.userHeading}>Process User</Text>
            </View>

            <View>
              <Text style={styles.input}>{name}</Text>
              <Text style={styles.input}>{email}</Text>
              <Picker
                style={styles.input}
                selectedValue={role}
                onValueChange={setRole}
              >
                <Picker.Item label="Choose Role" value="" />
                <Picker.Item label="Admin" value="admin" />
                <Picker.Item label="User" value="user" />
              </Picker>
            </View>
            <Button
              style={styles.processBtn}
              onPress={processUserSubmitHandler}
            >
              <View>
                <Text style={styles.processBtnText}>Change</Text>
              </View>
            </Button>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

export default ProcessUser;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#283148",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 10,
    justifyContent: "center",
  },

  headingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  userHeading: {
    fontSize: 40,
    fontWeight: "900",
    margin: 10,
    color: "#fff",
    marginLeft: 20,
    marginBottom: 20,
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
  },
  processBtn: {
    backgroundColor: "#FF9B42",
    padding: 10,
    paddingTop: 15,
    borderRadius: 50,
    marginBottom: 30,
  },

  processBtnText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "900",
  },
});
