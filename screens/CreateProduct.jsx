import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  createProduct,
  newProductReset,
} from "../reducers/productReducer";
import { Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { Avatar } from "react-native-paper";
import mime from "mime";
import Loader from "../components/Loader";
import Icon2 from "react-native-vector-icons/MaterialIcons";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);

  const categories = [
    "Tops",
    "Bottoms",
    "Hand Bags",
    "Shoes",
    "Rings",
    "Wrist Watches",
    "Tracksuits",
  ];

  const createProductSubmitHandler = () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("price", price);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("stock", stock);

    images.forEach((image, index) => {
      myForm.append("images", {
        uri: image,
        type: mime.getType(image),
        name: image.split("/").pop(),
      });
    });
    dispatch(createProduct(myForm));
  };

  const handleImage = async () => {
    navigation.navigate("picker", {
      createProduct: true,
      onSelectImages: onSelectImages,
    });
  };

  const onSelectImages = (selectedImages) => {
    setImages(selectedImages);
  };

  useEffect(() => {
    if (route.params && route.params.image) {
      const selectedImage = route.params.image;
      setImages((prevImages) => [...prevImages, selectedImage]);
    }

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert("Product Created Successfully");
      navigation.navigate("dashboard");
      dispatch(newProductReset());
    }
  }, [route, alert, dispatch, error, success, navigation]);

  return (
    <View style={styles.mainContainer}>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <SafeAreaView>
            <View style={styles.headingContainer}>
              <Button
                style={{ marginTop: 10 }}
                onPress={() => navigation.navigate("dashboard")}
              >
                <View>
                  <Icon2 name="arrow-back" size={30} color="white" />
                </View>
              </Button>
              <Text style={styles.heading}>Create</Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Price"
                value={price.toString()}
                onChangeText={setPrice}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
              />
              <Picker
                style={styles.input}
                selectedValue={category}
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
              >
                <Picker.Item label="Choose Category" value="" />
                {categories.map((cate, index) => (
                  <Picker.Item key={index} label={cate} value={cate} />
                ))}
              </Picker>
              <TextInput
                style={styles.input}
                placeholder="Stock"
                value={stock.toString()}
                onChangeText={setStock}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 30,
                marginTop: 20,
              }}
            >
              <ScrollView horizontal={true}>
                {images ? (
                  images.map((avatar, index) => (
                    <Avatar.Image
                      key={index}
                      size={60}
                      source={{ uri: avatar ? avatar : "" }}
                      style={styles.avatar}
                    />
                  ))
                ) : (
                  <View style={styles.circle}></View>
                )}
              </ScrollView>
              <TouchableOpacity>
                <Text onPress={handleImage} style={styles.avatarLink}>
                  Select
                </Text>
              </TouchableOpacity>
            </View>

            <Button style={styles.btn} onPress={createProductSubmitHandler}>
              <View>
                <Text style={styles.btnText}>Create</Text>
              </View>
            </Button>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

export default CreateProduct;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#283148",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    padding: 15,
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
    marginLeft: 70,
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
  avatar: {
    backgroundColor: "#000",
    objectFit: "contain",
  },
  circle: {
    backgroundColor: "#fff",
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  avatarLink: {
    backgroundColor: "#fff",
    padding: 20,
    fontSize: 20,
    marginLeft: 37,
  },
  btn: {
    backgroundColor: "#FF9B42",
    padding: 10,
    paddingTop: 15,
    borderRadius: 50,
  },

  btnText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "900",
  },
});
