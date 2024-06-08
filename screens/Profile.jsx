import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button } from "react-native-paper";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../reducers/userReducer";
import Loader from "./../components/Loader";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  const { width, height } = Dimensions.get("window");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logoutHandler = async () => {
    dispatch(logout());
    alert("Logged Out Successfully");
    navigation.navigate("login");
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigation.navigate("login");
    }
  }, [isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <SafeAreaView>
          <View>
            <View style={styles.headingContainer}>
              <Button
                style={styles.backBtn}
                onPress={() => navigation.navigate("home")}
              >
                <View>
                  <Icon2 name="arrow-back" size={30} color="white" />
                </View>
              </Button>
              <Text style={styles.profileHeading}>My Profile</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoImage}>
                <Avatar.Image
                  size={100}
                  source={{ uri: user.avatar ? user.avatar.url : null }}
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
              </View>
            </View>
              <View style={{height:height*0.73}}>
              <ScrollView>
                <View style={styles.BtnContainer}>
                {user?.role === "admin" && (
                  <View style={styles.Btn}>
                    <Text style={styles.BtnText}>Dashboard</Text>
                    <Button onPress={() => navigation.navigate("dashboard")}>
                      <View>
                        <Icon2
                          name="arrow-forward"
                          size={30}
                          style={{ color: "#fff" }}
                        />
                      </View>
                    </Button>
                  </View>
                )}
                <View style={styles.Btn}>
                  <Text style={styles.BtnText}>My Orders</Text>
                  <Button onPress={() => navigation.navigate("orders")}>
                    <View>
                      <Icon2
                        name="arrow-forward"
                        size={30}
                        style={{ color: "#fff" }}
                      />
                    </View>
                  </Button>
                </View>
                <View style={styles.Btn}>
                  <Text style={styles.BtnText}>Update Password</Text>
                  <Button onPress={() => navigation.navigate("updatepassword")}>
                    <View>
                      <Icon2
                        name="arrow-forward"
                        size={30}
                        style={{ color: "#fff" }}
                      />
                    </View>
                  </Button>
                </View>
                <View style={styles.Btn}>
                  <Text style={styles.BtnText}>Update Profile</Text>
                  <Button onPress={() => navigation.navigate("updateprofile")}>
                    <View>
                      <Icon2
                        name="arrow-forward"
                        size={30}
                        style={{ color: "#fff" }}
                      />
                    </View>
                  </Button>
                </View>
                <View style={styles.Btn}>
                  <Text style={styles.BtnText}>Logout</Text>
                  <Button onPress={logoutHandler}>
                    <View>
                      <Icon2
                        name="arrow-forward"
                        size={30}
                        style={{ color: "#fff" }}
                      />
                    </View>
                  </Button>
                </View>
                </View>
                </ScrollView>
              </View>
              
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#283148",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileHeading: {
    fontSize: 40,
    fontWeight: "900",
    margin: 10,
    color: "#fff",
    marginLeft: 70,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
  },
  infoImage: {
    backgroundColor: "white",
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#fff",
  },
  infoContent: {
    marginLeft: 30,
  },
  name: {
    fontSize: 30,
    fontWeight: "900",
    color: "#fff",
  },
  email: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  BtnContainer: {
    flexDirection: "column",
    gap: 20,
  },
  Btn: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FF9B42",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    height: 100,
    borderRadius: 10,
  },
  BtnText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
    marginLeft: 20,
  },
});
