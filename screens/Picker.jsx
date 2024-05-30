import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import * as ImagePicker from 'expo-image-picker';

const Picker = ({navigation, route}) => {

  const imagePickerHandler = async() => {

    const data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!data.canceled) {
        if (route.params.updateProfile) return navigation.navigate("updateprofile", { image: data.assets[0].uri })
        else return navigation.navigate("register", { image: data.assets[0].uri })
      }
  }
  return (
      <View style={Styles.container}>
        <Text name="image" style={Styles.pickerText} onPress={imagePickerHandler}>Click To Select</Text>
    </View>
  )
}


export default Picker;

const Styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#E8E7E8",
      justifyContent: "center",
      alignItems: "center"
  },
  pickerText: {
    fontSize:30,
    color:"white",
    backgroundColor: "#900",
    padding:15,
  }
});



