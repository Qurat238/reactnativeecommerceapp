import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Dimensions
} from "react-native";
import React from "react";
import { Rating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";

const ProductCard = (props) => {
  const navigation = useNavigation();
  const id = props.product._id;

  const { width, height } = Dimensions.get("window");

  return (
    <TouchableOpacity onPress={() => navigation.navigate("product", { id })}>
      <View style={[styles.container, {width:width*0.46}]}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: `${props.product.images[0].url}` }}
            alt={props.product.name}
          />
        </View>
        <View style={styles.productContentContainer}>
          <Text style={styles.productText}>{props.product.name}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Rating
              tintColor="#283148"
              ratingCount={5}
              imageSize={17}
              readonly={true}
              startingValue={`${props.product.ratings}`}
              style={styles.rating}
            />
            <Text style={styles.reviews}>
              {props.product.noOfReviews === 1 ||
              props.product.noOfReviews === 0
                ? `(${props.product.noOfReviews} review)`
                : `(${props.product.noOfReviews} reviews)`}
            </Text>
          </View>
          <Text style={styles.price}>₹{props.product.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    // width: 180,
    minHeight: 290,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginVertical: 5,
    // iOS shadow properties
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  imageContainer: {
    height: 190,
    padding: 10,
    overflow: "hidden",
  },
  image: {
    height: 180,
    objectFit: "contain",
  },
  productContentContainer: {
    padding: 10,
    paddingBottom: 13,
    backgroundColor: "#283148",
    borderBottomWidth: 5,
    borderBottomColor: "#fff",
  },
  productText: {
    fontSize: 24,
    marginBottom: 5,
    fontWeight: "900",
    color: "#fff",
  },
  reviews: {
    fontSize: 20,
    fontWeight: "900",
    color: "#fff",
  },
  price: {
    fontWeight: "900",
    fontSize: 20,
    marginTop: 5,
    color: "#fff",
  },
});
