import { View, Text, TextInput, StyleSheet, Platform, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearError, loadUser, updateProfile, updateProfileReset } from '../reducers/userReducer';
import mime from 'mime';
import { Avatar, Button } from 'react-native-paper';
import Loader from '../components/Loader';

const UpdateProfile = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  const {user, loading} = useSelector((state) => state.user);
  const {error, isUpdated} = useSelector((state) => state.profile);

  const updateProfileHandler = () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    if (avatar) {
      myForm.append("avatar", {
        uri: avatar,
        type: mime.getType(avatar),
        name: avatar.split("/").pop()
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

  const handleImage = async() => {
    navigation.navigate("picker", {
      updateProfile: true
    });
  };

  return (
    <View style={styles.container}>
      {loading ? <Loader/> : 
        <SafeAreaView>
        <Avatar.Image
          size={130}
          source={{uri: avatar ? avatar : null}}
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
        <Button
          style={styles.btn}
          onPress={updateProfileHandler}
        >
          <Text style={styles.btnText}>Change</Text>
        </Button>
      </SafeAreaView>
      }
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8E7E8",
    justifyContent: "center",
    padding: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  avatar: {
    backgroundColor: "#000",
    alignSelf: "center",
  },
  avatarLink: {
    color: "#900",
    textAlign: "center",
    fontSize: 20,
    margin: 20,
    color: "#000",
    fontWeight: "600"
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
  btn: {
    backgroundColor: "#900",
    padding: 13,
    borderRadius: 50,
    marginTop: 20
  },
  btnText: {
    color: "#fff",
    fontSize: 20
  }
});
