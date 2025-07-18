import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [response, setResponse] = useState();
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();

  const isLoginButtonDisabled = !phone;

  const handleLogin = async () => {
    if (!phone) {
      Alert.alert('Please enter your phone number');
      return;
    }

    const formData = new FormData();
    formData.append('phone', phone);

    try {
      const response = await axios.post(
        'https://argosmob.uk/uaw-auto/public/api/v1/auth/verify-phone',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('API Response:', response.data); // Debugging log

      if (response.data.status) {
        // Save response data if needed
        setResponse(response.data);

        // Check if user data exists and save it
        if (response?.data) {
          saveUserData(response.data.user);
        }

        // Handle navigation based on isRegister flag
        if (response.data.isRegister) {
          // User is registered - navigate to Main screen
          setResponse(response.data);
          // saveUserData(user);
          navigation.navigate('Main');
        } else {
          // User is not registered - navigate to Registration screen
          navigation.navigate('Registration', {
            phone: phone,
            otp: response.data.otp,
          });
        }
      } else {
        Alert.alert(
          'Verification Failed',
          response.data.message || 'Invalid phone number',
        );
      }
    } catch (error) {
      console.error('Error during API call:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'An error occurred, please try again',
      );
    }
  };

  // const handleLogin = async () => {
  //   if (!phone) {
  //     Alert.alert('Please enter your phone number');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('phone', phone);

  //   try {
  //     const response = await axios.post(
  //       'https://argosmob.uk/uaw-auto/public/api/v1/auth/verify-phone',
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       },
  //     );

  //     console.log('API Response:', response.data); // Debugging log

  //     if (response.data.status) {
  //       const user = response.data.user;

  //       // Check if the user exists
  //       if (user) {
  //         setResponse(response.data);
  //         saveUserData(user);
  //         navigation.navigate('OTP', {response});
  //         // navigation.navigate('Main');
  //       } else {
  //         Alert.alert('Login Failed', 'User data not found in the response');
  //       }
  //     } else {
  //       Alert.alert('Verification Failed', 'Invalid phone number');
  //     }
  //   } catch (error) {
  //     console.error('Error during API call:', error);
  //     Alert.alert('An error occurred, please try again');
  //   }
  // };

  // const saveUserData = async user => {
  //   try {
  //     if (!user) {
  //       console.error(
  //         'Error saving user data: User object is null or undefined',
  //       );
  //       return;
  //     }

  //     // Convert the user object to a JSON string
  //     const jsonValue = JSON.stringify(user);

  //     // Save it in AsyncStorage with a key, e.g., 'userData'
  //     await AsyncStorage.setItem('userData', jsonValue);

  //     console.log('User data saved successfully!');
  //   } catch (error) {
  //     console.error('Error saving user data:', error);
  //   }
  // };

  const saveUserData = async user => {
  try {
    console.log('Attempting to save user data:', user); // Debug log
    
    if (!user || user.length === 0) {
      console.error('No user data to save');
      return;
    }

    const jsonValue = JSON.stringify(user);
    console.log('JSON data to save:', jsonValue); // Debug log
    
    await AsyncStorage.setItem('userData', jsonValue);
    console.log('User data saved successfully!');
    
    // Verify it was saved
    const savedData = await AsyncStorage.getItem('userData');
    console.log('Retrieved after save:', savedData);
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>We are always happy to serve you!</Text>

      <View style={styles.inputContainer}>
        <Icon
          name="call-outline"
          size={20}
          color="#8A8A8A"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          placeholderTextColor="#A6A6A6"
          keyboardType="number-pad"
          value={phone}
          maxLength={10}
          onChangeText={setPhone}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.loginButton,
          isLoginButtonDisabled && styles.disabledButton,
        ]}
        disabled={isLoginButtonDisabled}
        onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.guestBtn}
        onPress={() => {
          navigation.navigate('Main');
        }}>
        <Text style={{color: '#111'}}>Enter as a Guest</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD580',
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  loginButton: {
    backgroundColor: 'black',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 100,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#D3B5D5',
  },
  loginButtonText: {
    color: '#FFD580',
    fontSize: 18,
    fontWeight: '700',
  },
  guestBtn: {
    marginVertical: 10,
    alignSelf: 'center',
    // backgroundColor: 'red',
    // justifyContent: 'center',
    width: '30%',
    // alignItems: 'center',
  },
});

export default Login;
