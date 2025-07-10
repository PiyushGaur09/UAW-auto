import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ResetPassword = ({route}) => {
  const {userName} = route.params;
  // console.log("params",route.params)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  const handleUpdatePassword = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const response = await axios.post(
        'https://argosmob.uk/uaw-auto/public/api/v1/auth/change-password',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.data.status) {
        Alert.alert(
          'Success',
          response.data.message || 'Password updated successfully',
        );
        navigation.navigate('Login');
      } else {
        Alert.alert(
          'Error',
          response.data.message || 'Failed to update password',
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'An error occurred while updating the password. Please try again.',
      );
      console.error(error);
    }
  };

  const CustomHeader = () => {
    const navigation = useNavigation();

    return (
      <View style={styles.headerContainer}>
        {/* Back Arrow */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#007BFF" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.headerTitle}>Reset Password</Text>
      </View>
    );
  };

  return (
    <View style={{flex:1}}>
      {userName !== undefined && <CustomHeader />}
      <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Enter your details to reset your password
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#A6A6A6"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="#A6A6A6"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#A6A6A6"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          style={[
            styles.updateButton,
            (!email || !password || !confirmPassword) && styles.disabledButton,
          ]}
          onPress={handleUpdatePassword}
          disabled={!email || !password || !confirmPassword}>
          <Text style={styles.updateButtonText}>Update Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#522C90',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#747070',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
    padding: 10,
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  updateButton: {
    backgroundColor: '#522C90',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
  },
  disabledButton: {
    backgroundColor: '#D3B5D5',
  },
  updateButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  headerContainer: {
    height: 60,
    backgroundColor: '#FFF',
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
    color: '#007BFF',
  },
});

export default ResetPassword;
