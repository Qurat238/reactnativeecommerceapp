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
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  loadUser,
  updateProfile,
  updateProfileReset,
} from "../reducers/userReducer";
import mime from "mime";
import { Avatar, Button } from "react-native-paper";
import Loader from "../components/Loader";

const UpdateProfile = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  const { user, loading } = useSelector((state) => state.user);
  const { error, isUpdated, loading:updateLoading } = useSelector((state) => state.profile);

  const updateProfileHandler = () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    if (avatar) {
      myForm.append("avatar", {
        uri: avatar,
        type: mime.getType(avatar),
        name: avatar.split("/").pop(),
      });
    }
    dispatch(updateProfile(myForm));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar.url);
    }
    if (route.params && route.params.image) {
      setAvatar(route.params.image);
    }
    if (error) {
      alert(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert("Profile Updated Successfully");
      dispatch(loadUser());
      navigation.navigate("profile");
      dispatch(updateProfileReset());
    }
  }, [dispatch, route, error, isUpdated, navigation, user]);

  const handleImage = async () => {
    navigation.navigate("picker", {
      updateProfile: true,
    });
  };

  return (
    <View style={styles.container}>
      {loading | updateLoading ? (
        <Loader />
      ) : (
        <View style={styles.formContainer}>
          <SafeAreaView>
            <Avatar.Image
              size={130}
              source={{ uri: avatar ? avatar : null }}
              style={styles.avatar}
            />
            <TouchableOpacity onPress={handleImage}>
              <Text style={styles.avatarLink}>Change Photo</Text>
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
            </View>
            <Button style={styles.btn} onPress={updateProfileHandler}>
              <View>
                <Text style={styles.btnText}>Change</Text>
              </View>
            </Button>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

export default UpdateProfile;

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
    backgroundColor: "#000",
    alignSelf: "center",
  },
  avatarLink: {
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
    margin: 20,
    fontWeight: "600",
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
    fontWeight:"900"
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
