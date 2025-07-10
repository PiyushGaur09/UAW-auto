import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import CartScreen from '../Screens/Cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState();

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');

      if (userData) {
        const parsedData = JSON.parse(userData);
        setUserData(parsedData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  console.log('userData', userData);

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          let iconName;

          // Assign different icons to each tab
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Cart') {
            iconName = 'cart-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#aa8e55',
        tabBarStyle: {
          backgroundColor: '#FFD580',
          height: 60,
          paddingBottom: 5,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: {width: 0, height: 2},
          shadowRadius: 10,
          elevation: 10,
          borderColor: 'black', // Border color
          borderTopWidth: 2,
        },
      })}>
      {/* Home Screen */}
      <Tab.Screen name="Home" component={Home} />

      {/* Search Screen */}
      <Tab.Screen name="Cart" component={CartScreen} />

      {/* Profile Screen */}
      {/* <Tab.Screen name="Profile" component={Profile} /> */}

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                if (!userData) {
                  Alert.alert(
                    'Login Required',
                    'Please login to access your profile.',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'OK',
                        onPress: () => navigation.navigate('Login'), 
                      },
                    ],
                    {cancelable: true},
                  );
                } else {
                  props.onPress(); 
                }
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#522C90',
  },
});
