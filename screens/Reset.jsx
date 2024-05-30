// screens/Reset.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../reducers/userReducer'; 

const Reset = ({ route, navigation }) => {
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { token } = route.params;
  const { loading, success, error } = useSelector(state => state.forgotPassword);

  const handleResetPassword = () => {
    dispatch(resetPassword(token, { password }));
  };

  return (
    <View>
      <Text>Reset Password</Text>
      <TextInput
        placeholder="New Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      {success && (
        <>
          <Text>Password reset successful!</Text>
          <Button title="Go to Login" onPress={() => navigation.navigate('login')} />
        </>
      )}
    </View>
  );
};

export default Reset;
