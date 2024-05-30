import { View, Text, TextInput, Platform, StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { clearError, updatePassword, updatePasswordReset } from '../reducers/userReducer';

const UpdatePassword = ({navigation}) => {

  const dispatch = useDispatch();
  const {error, isUpdated} = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = () => {
        const passwords = { oldPassword, newPassword, confirmPassword };
        dispatch(updatePassword(passwords));
    }
    useEffect(()=>{
        if(error){
            alert(error);
            dispatch(clearError());
        } 
        if(isUpdated){
            alert("Password Updated Successfully")
            navigation.navigate("profile");
            dispatch(updatePasswordReset());
        }
    },[dispatch, error, isUpdated, navigation]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.heading}>Update</Text>
        <View>
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Old Password"
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Button
            style={styles.btn}
            onPress={updatePasswordSubmit}
          >
            <Text style={styles.btnText}>Change</Text>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default UpdatePassword;

const styles = StyleSheet.create({

  container: {
      flex: 1,
      backgroundColor: "#E8E7E8",
      justifyContent: "center",
      padding:20,
      paddingTop: Platform.OS==="android" ? StatusBar.currentHeight : 0
  },
  heading: {
    fontSize: 45, 
    fontWeight: "900",
    margin:40, 
    marginLeft:5,
    alignSelf:"center"
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
    marginTop:20
},
btnText: {
    color: "#fff", 
    fontSize: 20
}
});