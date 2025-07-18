import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const RequestOrder = ({route}) => {
  const navigation = useNavigation();
  const items = route.params.cartItems;
  const [userId, setUserId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [remark, setRemark] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const extractedData = items.map(item => ({
    product_id: item.id,
    qty: item.quantity,
    other_details: '',
  }));

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      console.log('userData', userData);
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUserId(parsedData.id);
        setName(parsedData.name);
        setEmail(parsedData.email);
        setPhone(parsedData.phone);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('cart');
      // Alert.alert('Success', 'Cart has been cleared!');
    } catch (error) {
      console.error('Error clearing cart:', error);
      Alert.alert('Error', 'Unable to clear the cart. Please try again.');
    }
  };

  // const submitOrder = async () => {
  //   const url = 'https://argosmob.uk/uaw-auto/public/api/v1/product/make-order';

  //   const formatDate = isoDate => {
  //     const date = new Date(isoDate);
  //     return date.toISOString().split('T')[0]; // Extract YYYY-MM-DD part
  //   };

  //   const data = {
  //     user_id: userId,
  //     name: name,
  //     email: email || 'example123@gmail.com',
  //     phone: phone,
  //     city: city,
  //     address: address,
  //     remark: remark,
  //     status: 'Pending',
  //     expected_delivery_date: formatDate(deliveryDate),
  //     items: extractedData,
  //   };

  //   setLoading(true);

  //   try {
  //     const response = await axios.post(url, data, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     console.log('Response Data:', response.data);

  //     Alert.alert(
  //       'Success',
  //       response?.data?.message || 'Order submitted successfully.',
  //     );
  //     clearCart();
  //     navigation.goBack();
  //   } catch (error) {
  //     console.error(
  //       'API Error:',
  //       error.response ? error.response.data : error.message,
  //     );
  //     Alert.alert('Error', 'Failed to submit the order. Please try again.');
  //   }
  //   setLoading(false);
  // };

  const submitOrder = async () => {
    const url = 'https://argosmob.uk/uaw-auto/public/api/v1/product/make-order';

    const formatDate = isoDate => {
      const date = new Date(isoDate);
      return date.toISOString().split('T')[0];
    };

    const data = {
      user_id: userId,
      name: name,
      email: email || 'example123@gmail.com',
      phone: phone,
      city: city,
      address: address,
      remark: remark,
      status: 'Pending',
      expected_delivery_date: formatDate(deliveryDate),
      items: extractedData,
    };

    setLoading(true);

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response Data:', response.data);

      // First clear the cart
      await clearCart(); // Wait for cart to clear

      // Then show alert and navigate
      Alert.alert(
        'Success',
        response?.data?.message || 'Order submitted successfully.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(), // Navigate after alert is dismissed
          },
        ],
      );
    } catch (error) {
      console.error(
        'API Error:',
        error.response ? error.response.data : error.message,
      );
      Alert.alert('Error', 'Failed to submit the order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isValidForm = () => {
    return name && phone && address && city;
  };

  const handleSubmit = () => {
    if (!isValidForm()) {
      Alert.alert('Error', 'Please fill out all fields correctly.');
      return;
    }

    submitOrder();
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Order Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#A6A6A6"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor="#A6A6A6"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#A6A6A6"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#A6A6A6"
        value={address}
        multiline={true}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="City"
        placeholderTextColor="#A6A6A6"
        value={city}
        multiline={true}
        onChangeText={setCity}
      />

      <TextInput
        style={styles.input}
        placeholder="Remark"
        placeholderTextColor="#A6A6A6"
        value={remark}
        multiline={true}
        onChangeText={setRemark}
      />

      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}>
        <Text style={styles.datePickerText}>
          {`Expected Delivery Date: ${deliveryDate.toDateString()}`}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={deliveryDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDeliveryDate(selectedDate);
          }}
        />
      )}

      <TouchableOpacity
        style={[
          styles.submitButton,
          {backgroundColor: isValidForm() ? '#007BFF' : '#CCC'},
        ]}
        onPress={handleSubmit}
        disabled={!isValidForm()}>
        {/* <Text style={styles.submitButtonText}>Submit Request</Text> */}
        <Text style={styles.buttonText}>
          {loading ? 'Submiting...' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFD580',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 60,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  datePickerButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    borderRadius: 8,
    marginBottom: 15,
  },
  datePickerText: {
    color: '#555',
  },
  submitButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#ffa500',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RequestOrder;
