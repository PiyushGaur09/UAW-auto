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
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [responseData, setResponseData] = useState({});

  const navigation = useNavigation();

  const handleSendOTP = async () => {
    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('email', email);

      // Make API call using axios
      const response = await axios.post(
        'https://argosmob.uk/uaw-auto/public/api/v1/auth/forget-password',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.data.status) {
        setResponseData(response.data); 

        navigation.navigate('OTP', {responseData}); 
      } else {
        console.log('Error', response.data.message || 'Failed to send OTP.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your registered email address to receive an OTP.
      </Text>

      <View style={styles.inputContainer}>
        <Icon
          name="mail-outline"
          size={22}
          color="black"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="black"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <TouchableOpacity
        style={[styles.sendOtpButton, !email && styles.disabledButton]}
        onPress={handleSendOTP}
        disabled={!email}>
        <Text style={styles.sendOtpButtonText}>Send OTP</Text>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    height: 50,
  },
  sendOtpButton: {
    backgroundColor: 'black',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
  },
  disabledButton: {
    backgroundColor: '#D3B5D5',
  },
  sendOtpButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default ForgotPassword;
