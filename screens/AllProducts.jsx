import { View, Text, ScrollView, SafeAreaView, Platform, StatusBar, Image, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Loader from '../components/Loader';
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, deleteProduct, deleteProductReset, getAdminProduct } from '../reducers/productReducer';
// import ProductListCard from '../components/ProductListCard';

const AllProducts = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {error, products, loading} = useSelector((state) => state.products);
    const {error:deleteError, isDeleted} = useSelector((state) => state.product);

    useEffect(() => {
        if(error){
            alert(error);
            dispatch(clearErrors());
        }
        dispatch(getAdminProduct());
        if(deleteError){
            alert(deleteError);
            dispatch(clearErrors());
        }
        if(isDeleted){
            alert("Product Deleted Successfully");
            navigation.navigate("dashboard");
            dispatch(deleteProductReset());
        }
    },[dispatch,error,deleteError,isDeleted,navigation]);

    const deleteProductHandler = (id) => {
      dispatch(deleteProduct(id));
  }

  return (
    <View style={styles.container}>
        <SafeAreaView>
        <View style={styles.headingContainer}>
          <Button
            style={styles.backBtn}
            onPress={() => navigation.navigate("dashboard")}
          >
            <View><Icon2 name="arrow-back" size={30} color="white" /></View>
          </Button>
          <Text style={styles.heading}>All Products</Text>
          </View>

          <ScrollView>
          {products && products.map((item) => (
            // <ProductListCard key={item._id} item={item}/>

      <View style={styles.productItemContainer} key={item._id}>
        <View style={styles.ImageContainer}>
            <Image source={{uri:item.images[0].url}} style={styles.userDP}/>
        </View>
        <View>
        <View style={styles.productInfo}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.btn}>
            <Button onPress={() => navigation.navigate("dashboard")} style={{marginTop:10}}><View><Icon2 name="edit" size={25}/></View></Button>
            <Button style={{marginTop:10}}><View><Icon2 name="delete" size={25}/></View></Button>
            </View>
        </View>
        <View style={styles.twoViews}>
            <View style={styles.orderItemInfo}>
                <Text style={styles.subHeading}>Price:</Text>
                <Text style={styles.subText}>${item.price}</Text>
            </View>
            <View style={styles.orderItemInfo}>
                <Text style={styles.subHeading}>Stock:</Text>
                <Text style={styles.subText}>{item.stock}</Text>
            </View>
        </View>
        </View>
    </View>

          ))}
          </ScrollView>
        </SafeAreaView>
    </View>
  )
}

export default AllProducts;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#283148",
        paddingTop: Platform.OS==="android" ? StatusBar.currentHeight : 0,
        padding:20,
        paddingBottom:90
    },
    headingContainer:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
        marginBottom:15
      },
      heading:{
        fontSize:40,
        fontWeight:"900",
        margin:10,
        color:"#fff",
        marginLeft:70
      },
      productItemContainer:{
        backgroundColor:"#fff",
        borderRadius:10,
        marginBottom:17.5,
        padding:20,
        paddingTop:10,
        flexDirection:"row",
        alignItems:"center"
      },
      ImageContainer:{
          marginRight:20
      },
      userDP:{
          width:70,
          height:70,
          borderRadius:50,
          borderWidth:3,
          borderColor:"black",
      },
      twoViews:{
          flexDirection:"row",
          justifyContent:"space-between",
          width:275,
      },
      productInfo:{
          flexDirection:"row",
          justifyContent:"space-between",
          alignItems:"center",
          width:300
      },
      orderItemInfo:{
          flexDirection:"row",
          alignItems:"center",
          gap:10
      },
      name:{
          fontSize:20,
          fontWeight:"900",
          color:"red"
      },
      btn:{
          flexDirection:"row",
      },
      subHeading:{
          fontSize:20,
          fontWeight:"900"
      },
      subText:{
          fontSize:19
      }
});