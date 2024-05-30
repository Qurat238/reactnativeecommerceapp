import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StripeProvider } from '@stripe/stripe-react-native';
import axios from 'axios';
import  {useDispatch, useSelector}  from 'react-redux';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Profile from './screens/Profile';
import Picker from './screens/Picker';
import Cart from './screens/Cart';
import Orders from './screens/Orders';
import Loader from './components/Loader';
import { loadUser } from './reducers/userReducer';
import Product from './screens/Product';
import Forgot from './screens/Forgot';
import Reset from './screens/Reset';
import UpdatePassword from './screens/UpdatePassword';
import UpdateProfile from './screens/UpdateProfile';
import Shipping from './screens/Shipping';
import ConfirmOrder from './screens/ConfirmOrder';
import Order from './screens/Order';
import ResetPassword from './screens/ResetPassword';
import Dashboard from './screens/Dashboard';
import AllProducts from './screens/AllProducts';
import AllOrders from './screens/AllOrders';
import AllUsers from './screens/AllUsers';
import AllReviews from './screens/AllReviews';
import CreateProduct from './screens/CreateProduct';

const Stack = createNativeStackNavigator();

const Main = () => {
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState('');
  const { isAuthenticated, loading } = useSelector(state => state.user);

  
  useEffect(() => {
    dispatch(loadUser());
    const getStripeApiKey = async () => {
      try {
        const { data } = await axios.get('https://backend-gray-sigma.vercel.app/api/v1/stripeapikey');
        setStripeApiKey(data.stripeApiKey);
      } catch (error) {
        console.error('Error retrieving Stripe API key:', error);
      }
    };
    if(isAuthenticated) {
      getStripeApiKey();
    }
  }, [dispatch]);


  // if (loading || !stripeApiKey) {
  //   return <Loader />;
  // } 
 
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName={isAuthenticated?"home":"login"}>
        <Stack.Screen name='home' component={Home} options={{headerShown: false}}/>
        <Stack.Screen name='login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='forgot' component={Forgot} options={{headerShown: false}}/>
        <Stack.Screen name='reset' component={Reset} options={{headerShown: false}}/>
        <Stack.Screen name='updatepassword' component={UpdatePassword} options={{headerShown: false}}/>
        <Stack.Screen name='resetpassword' component={ResetPassword} options={{headerShown: false}}/>
        <Stack.Screen name='updateprofile' component={UpdateProfile} options={{headerShown: false}}/>
        <Stack.Screen name='register' component={Register} options={{headerShown: false}}/>
        <Stack.Screen name='profile' component={Profile} options={{headerShown: false}}/>
        <Stack.Screen name='picker' component={Picker} options={{headerShown: false}}/>
        <Stack.Screen name='product' component={Product} options={{headerShown: false}}/>
        <Stack.Screen name='cart' component={Cart} options={{headerShown: false}}/>
        <Stack.Screen name='shipping' component={Shipping} options={{headerShown: false}}/>
        <Stack.Screen name='orders' component={Orders} options={{headerShown: false}}/>
        <Stack.Screen name='order' component={Order} options={{headerShown: false}}/>
        <Stack.Screen name='confirmorder' options={{ headerShown: false }}>
            {props => (
              <PaperProvider>
              <StripeProvider publishableKey={stripeApiKey}>
                <ConfirmOrder {...props} />
              </StripeProvider>
              </PaperProvider>
            )}
        </Stack.Screen>
        <Stack.Screen name='dashboard' component={Dashboard} options={{headerShown: false}}/>
        <Stack.Screen name='allproducts' component={AllProducts} options={{headerShown: false}}/>
        <Stack.Screen name='createproduct' component={CreateProduct} options={{headerShown: false}}/>
        <Stack.Screen name='allorders' component={AllOrders} options={{headerShown: false}}/>
        <Stack.Screen name='allusers' component={AllUsers} options={{headerShown: false}}/>
        <Stack.Screen name='allreviews' component={AllReviews} options={{headerShown: false}}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default Main;

