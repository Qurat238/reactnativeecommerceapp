import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import Loader from "../components/Loader";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUser,
  deleteUserReset,
  getAllUsers,
  clearErrors,
} from "../reducers/userReducer";

const AllUsers = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { error, users, loading } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const { width } = Dimensions.get("window");

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getAllUsers());
    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert(message);
      navigation.navigate("dashboard");
      dispatch(deleteUserReset());
    }
  }, [dispatch, error, deleteError, isDeleted, navigation]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <View style={styles.mainContainer}>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <SafeAreaView>
            <View style={styles.headingContainer}>
              <Button
                style={styles.backBtn}
                onPress={() => navigation.navigate("dashboard")}
              >
                <View>
                  <Icon2 name="arrow-back" size={30} color="white" />
                </View>
              </Button>
              <Text style={styles.heading}>All Users</Text>
            </View>

            <ScrollView>
              {users &&
                users.map((item) => (
                  <View style={styles.userItemContainer} key={item && item._id}>
                    <View style={styles.ImageContainer}>
                      <Image
                        source={{ uri: item && item.avatar.url }}
                        style={styles.userDP}
                      />
                    </View>
                    <View>
                      <View style={[styles.userInfo, { width: width * 0.75 }]}>
                        <Text style={styles.name}>{item && item.name}</Text>
                        <View style={styles.btn}>
                          <Button
                            onPress={() =>
                              navigation.navigate("processuser", {
                                id: item._id,
                              })
                            }
                          >
                            <View>
                              <Icon2 name="edit" size={30} />
                            </View>
                          </Button>
                          <Button
                            onPress={() => deleteUserHandler(item && item._id)}
                          >
                            <View>
                              <Icon2 name="delete" size={30} />
                            </View>
                          </Button>
                        </View>
                      </View>
                      <View>
                        <Text style={styles.email}>{item && item.email}</Text>
                      </View>
                    </View>
                  </View>
                ))}
            </ScrollView>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

export default AllUsers;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#283148",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 10,
    paddingBottom: 90,
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 15,
  },
  heading: {
    fontSize: 40,
    fontWeight: "900",
    margin: 10,
    color: "#fff",
    marginLeft: 70,
  },
  userItemContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 17.5,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  ImageContainer: {
    marginRight: 10,
  },
  userDP: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "black",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 23,
    fontWeight: "900",
  },
  btn: {
    flexDirection: "row",
    marginLeft: -10,
  },
  email: {
    fontSize: 18,
    fontWeight: "700",
  },
});
