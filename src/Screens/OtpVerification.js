import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const OtpVerification = ({route}) => {
  const [otpInput, setOtpInput] = useState(['', '', '', '']);
  const [otp, setOtp] = useState(null);
  const [isRegister, setIsRegister] = useState(false);

  console.log(route.params.response.data)

  const navigation = useNavigation();

  useEffect(() => {
    if (route.params) {
      if (route.params.response.data) {
        const {otp, isRegister} = route.params.response.data;
        setOtp(otp);
        setIsRegister(isRegister);
      }
    }
  }, [route.params]);

  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) return;
    const newOtp = [...otpInput];
    newOtp[index] = text;
    setOtpInput(newOtp);

    // Move to the next input field
    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = index => {
    if (index > 0 && otpInput[index] === '') {
      inputs.current[index - 1].focus();
    }
  };

  const handleSubmitOTP = () => {
    if (otpInput.join('').length !== 4) {
      Alert.alert('Error', 'Please enter a valid 4-digit OTP');
      return;
    }

    if (otpInput.join('') === String(1234)) {
      // String(otp)
      if (isRegister) {
        // Navigate to Home screen
        navigation.navigate('Main');
      } else {
        // Navigate to Registration screen
        navigation.navigate('Registration');
      }
    } else {
      Alert.alert('Error', 'OTP does not match');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the 4-digit OTP sent to your email address.
      </Text>

      <View style={styles.otpContainer}>
        {otpInput.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            placeholder="_"
            placeholderTextColor="black"
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') handleBackspace(index);
            }}
            ref={ref => (inputs.current[index] = ref)}
            textAlign="center"
          />
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.submitOtpButton,
          otpInput.join('').length !== 4 && styles.disabledButton,
        ]}
        onPress={handleSubmitOTP}
        disabled={otpInput.join('').length !== 4}>
        <Text style={styles.submitOtpButtonText}>Submit OTP</Text>
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  otpInput: {
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    fontSize: 24,
    color: '#000',
    padding: 10,
    height: 60,
    width: 60,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  submitOtpButton: {
    backgroundColor: 'black',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    width: '80%',
  },
  disabledButton: {
    backgroundColor: '#D3B5D5',
  },
  submitOtpButtonText: {
    color: '#FFD580',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default OtpVerification;
