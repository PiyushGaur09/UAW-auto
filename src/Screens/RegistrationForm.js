import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const IndianStates = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
];

const RegistrationForm = ({navigation}) => {
  const [form, setForm] = useState({
    name: '',
    companyName: '',
    mobile: '',
    dob: '',
    country: 'India',
    state: '',
    city: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setForm({...form, dob: selectedDate.toISOString().split('T')[0]});
    }
  };

  const handleSubmit = async () => {
    const {name, companyName, mobile, dob, country, state, city} = form;

    if (!name || !companyName || !mobile || !dob || !state || !city) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', mobile);
    formData.append('dob', dob);
    formData.append('company_name', companyName);
    formData.append('country', country);
    formData.append('state', state);
    formData.append('city', city);

    try {
      const response = await fetch(
        'https://argosmob.uk/uaw-auto/public/api/v1/auth/signup',
        {
          method: 'POST',
          body: formData,
        },
      );

      const result = await response.json();

      if (result.status) {
        Alert.alert('Success', 'Registration Successful! Now You can Login');
        navigation.navigate('Login');
        // console.log("ggggg",result)
      } else {
        Alert.alert('Error', result.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Unable to process your request.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Image style={styles.logo} source={require('../Assests/logoWork1.png')} />

      <View style={styles.textContainer}>
        <Text style={[styles.infoText, {fontSize: 18, color: 'red'}]}>
          You are not a registered User
        </Text>
        <Text style={styles.infoText}>First Register, Then Login</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="grey"
          value={form.name}
          onChangeText={text => setForm({...form, name: text})}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Company Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Company Name"
          placeholderTextColor="grey"
          value={form.companyName}
          onChangeText={text => setForm({...form, companyName: text})}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="10 Digit Mobile Number"
          placeholderTextColor="grey"
          keyboardType="numeric"
          maxLength={10}
          value={form.mobile}
          onChangeText={text => setForm({...form, mobile: text})}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}>
          <Text style={{color: form.dob ? '#000' : 'grey'}}>
            {form.dob || 'Select Date of Birth'}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            value={new Date()}
            maximumDate={new Date()}
            onChange={handleDateChange}
          />
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Country</Text>
        <TextInput
          style={styles.input}
          placeholder="Country"
          placeholderTextColor="grey"
          value={form.country}
          editable={false}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>State</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={form.state}
            onValueChange={value => setForm({...form, state: value})}
            style={styles.picker}>
            <Picker.Item label="Select State" value="" color="black" />
            {IndianStates.map((state, index) => (
              <Picker.Item
                label={state}
                value={state}
                key={index}
                color="black"
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="City"
          placeholderTextColor="grey"
          value={form.city}
          onChangeText={text => setForm({...form, city: text})}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
    // <ScrollView contentContainerStyle={styles.container}>
    //   <Image style={styles.logo} source={require('../Assests/logoWork1.png')} />

    //   <View style={styles.textContainer}>
    //     <Text style={[styles.infoText, {fontSize: 18, color: 'red'}]}>
    //       You are not a registered User
    //     </Text>
    //     <Text style={styles.infoText}>First Register,Then Login</Text>
    //     {/* <Text style={styles.infoText}>Then Login</Text> */}
    //   </View>

    //   <TextInput
    //     style={styles.input}
    //     placeholder="Name"
    //     placeholderTextColor='grey'
    //     value={form.name}
    //     onChangeText={text => setForm({...form, name: text})}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Company Name"
    //     placeholderTextColor='grey'
    //     value={form.companyName}
    //     onChangeText={text => setForm({...form, companyName: text})}
    //   />
    //   <TextInput
    //     style={styles.input}
    //     placeholder="10 Digit Mobile Number"
    //     placeholderTextColor='grey'
    //     keyboardType="numeric"
    //     maxLength={10}
    //     value={form.mobile}
    //     onChangeText={text => setForm({...form, mobile: text})}
    //   />
    //   <TouchableOpacity
    //     style={styles.input}
    //     onPress={() => setShowDatePicker(true)}>
    //     <Text style={{color: form.dob ? '#000' : 'grey'}}>
    //       {form.dob || 'Select Date of Birth'}
    //     </Text>
    //   </TouchableOpacity>
    //   {showDatePicker && (
    //     <DateTimePicker
    //       mode="date"
    //       value={new Date()}
    //       maximumDate={new Date()}
    //       onChange={handleDateChange}
    //     />
    //   )}
    //   <TextInput
    //     style={styles.input}
    //     placeholder="Country"
    //     placeholderTextColor='grey'
    //     value={form.country}
    //     editable={false}
    //   />
    //   <View style={styles.pickerContainer}>
    //     <Picker
    //       selectedValue={form.state}
    //       onValueChange={value => setForm({...form, state: value})}
    //       style={styles.picker}>
    //       <Picker.Item label="Select State" value="" />
    //       {IndianStates.map((state, index) => (
    //         <Picker.Item label={state} value={state} key={index} />
    //       ))}
    //     </Picker>
    //   </View>
    //   <TextInput
    //     style={styles.input}
    //     placeholder="City"
    //     placeholderTextColor='grey'
    //     value={form.city}
    //     onChangeText={text => setForm({...form, city: text})}
    //   />
    //   <TouchableOpacity style={styles.button} onPress={handleSubmit}>
    //     <Text style={styles.buttonText}>Next</Text>
    //   </TouchableOpacity>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF8E1',
    padding: 20,
    justifyContent: 'center',
  },
  logo: {alignSelf: 'center', marginBottom: '5%'},
  input: {
    borderWidth: 1,
    borderColor: '#FFA726',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#FFA726',
    borderRadius: 5,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    height: 55,
    backgroundColor: '#FFF',
    // color:'red'
  },
  button: {
    backgroundColor: '#FFA726',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "#f8f9fa", // Light background color
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
  infoText: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 5,
  },
  inputGroup: {
    marginBottom: 5,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
});

export default RegistrationForm;
