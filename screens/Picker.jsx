import { View, Text, StyleSheet } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

const Picker = ({ navigation, route }) => {
  const imagePickerHandler = async () => {
    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!data.canceled) {
      if (route.params.register)
        return navigation.navigate("register", { image: data.assets[0].uri });
      else if (route.params.updateProfile)
        return navigation.navigate("updateprofile", {
          image: data.assets[0].uri,
        });
      else if (route.params.createProduct)
        return navigation.navigate("createproduct", {
          image: data.assets[0].uri,
        });
      else if (route.params.updateProduct)
        return navigation.navigate("processproduct", {
          id: route.params.id,
          image: data.assets[0].uri,
        });
      else console.log("OK");
    }
  };
  return (
    <View style={styles.container}>
      <Text name="image" style={styles.pickerText} onPress={imagePickerHandler}>
        Click To Select
      </Text>
    </View>
  );
};

export default Picker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#283148",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerText: {
    fontSize: 30,
    backgroundColor: "#FF9B42",
    color: "#fff",
    padding: 15,
  },
});
