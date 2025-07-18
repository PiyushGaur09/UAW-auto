import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/Slices/UserSlice';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [userData, setUserData] = useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const formData = new FormData();
    formData.append('name', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);

    try {
      const response = await axios.post(
        'https://argosmob.uk/uaw-auto/public/api/v1/auth/signup',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.data.status) {
        dispatch(setUser(response.data.data));

        Alert.alert('Success', 'Registration successful');
        navigation.navigate('Main'); 
      } else {
        const emailError = response.data.errors?.email?.[0];
        const message =
          emailError || response.data.message || 'Registration failed';
        Alert.alert('Error', message);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again later.');
      console.error('Registration Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Let’s help you buy auto spare parts!</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.inactiveTab}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.activeTab}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Full Name"
          placeholderTextColor="black"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Email Address"
          placeholderTextColor="black"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          placeholderTextColor="black"
          keyboardType="numeric"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="black"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Icon
            name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
            size={22}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="black"
          secureTextEntry={!isPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Icon
            name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
            size={22}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      {/* <Text style={styles.connectText}>or connect with</Text>
      <View style={styles.socialIconsContainer}>
        <Image
          source={require('../Assests/facebook.png')}
          style={styles.socialIcon}
        />
        <Image
          source={require('../Assests/instagram.png')}
          style={styles.socialIcon}
        />
        <Image
          source={require('../Assests/google.png')}
          style={styles.socialIcon}
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD580',
    paddingHorizontal: 30,
    paddingTop: '10%',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginTop: '5%',
    fontWeight: '400',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10%',
  },
  activeTab: {
    color: 'black',
    fontWeight: '700',
    fontSize: 18,
    marginHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#522C90',
  },
  inactiveTab: {
    color: 'black',
    marginHorizontal: 10,
    fontWeight: '400',
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginTop: '5%',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#4A4A4A',
  },
  registerButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: '10%',
  },
  registerButtonText: {
    color: '#FFD580',
    fontSize: 18,
    fontWeight: 'bold',
  },
  connectText: {
    textAlign: 'center',
    color: '#8A8A8A',
    marginBottom: 15,
    fontSize: 18,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
});

export default Register;
