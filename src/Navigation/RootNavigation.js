import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../Screens/Splash';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Home from '../Screens/Home';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import BottomTabNavigator from './BottomNavigation';
import ProductList from '../Screens/ProductList';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductDescription from '../Screens/ProductDescription';
import Main from '../Screens/Main';
import ForgotPassword from '../Screens/ForgotPassword';
import OtpVerification from '../Screens/OtpVerification';
import ResetPassword from '../Screens/ResetPassword';
import WebViewScreen from '../Utils/WebView';
import ViewAllCompanies from '../Screens/ViewAllCompanies';
import SearchByProduct from '../Screens/SearchByProduct';
import SearchByDimension from '../Screens/SearchByDimension';
import SearchByORM from '../Screens/SearchByORM';
import SearchByParts from '../Screens/SearchByParts';
import SearchProductsDetails from '../Screens/SearchProductsDetails';
import SearchProductsDes from '../Screens/SeachProductDes';
import RequestOrder from '../Screens/RequestOrder';
import OrderHistory from '../Screens/OrderHistory';
import ContactUs from '../Screens/ContactUs';
import RegistrationForm from '../Screens/RegistrationForm';
import BulkOrder from '../Screens/BulkOrder';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CartScreen from '../Screens/Cart';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Bottom Navigation"
            component={BottomTabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Product List"
            component={ProductList}
            options={{
              header: () => <CustomHeader title="Product List" />,
            }}
          />
          <Stack.Screen
            name="Product Description"
            component={ProductDescription}
            options={{
              header: () => <CustomHeader title="Product Description" />,
            }}
          />
          <Stack.Screen
            name="Forgot Password"
            component={ForgotPassword}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OTP"
            component={OtpVerification}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Reset Password"
            component={ResetPassword}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="View All Companies"
            component={ViewAllCompanies}
            options={{
              header: () => <CustomHeader title="All Companies" />,
            }}
          />
          <Stack.Screen
            name="Search By Product"
            component={SearchByProduct}
            options={{
              header: () => <CustomHeader title="Search By Category" />,
            }}
          />
          <Stack.Screen
            name="Search By Dimension"
            component={SearchByDimension}
            options={{
              header: () => <CustomHeader title="Search By Vehicle Name" />,
            }}
          />
          <Stack.Screen
            name="OEM Search"
            component={SearchByORM} 
            options={{
              header: () => <CustomHeader title="Search By Product Name" />,
            }}
          />
          <Stack.Screen
            name="Parts Search"
            component={SearchByParts}
            options={{
              header: () => <CustomHeader title="Parts Search" />,
            }}
          />
          <Stack.Screen
            name="Search Product Details"
            component={SearchProductsDetails}
            options={{
              header: () => <CustomHeader title="Search Product Details" />,
            }}
          />
          <Stack.Screen
            name="Search Product Des"
            component={SearchProductsDes}
            options={{headerShown: false}}

          />
          <Stack.Screen
            name="Request Order"
            component={RequestOrder}
            options={{
              header: () => <CustomHeader title="Request Order" />,
            }}
          />
          <Stack.Screen
            name="Order History"
            component={OrderHistory}
            options={{
              header: () => <CustomHeader title="Order History" />,
            }}
          />

          <Stack.Screen
            name="Contact Us"
            component={ContactUs}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Bulk Order"
            component={BulkOrder}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Registration"
            component={RegistrationForm}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Web Screen" component={WebViewScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default RootNavigation;

const CustomHeader = ({title}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {/* Back Arrow */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    backgroundColor: '#FFD580',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    elevation: 4, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    color: 'black',
  },
});
