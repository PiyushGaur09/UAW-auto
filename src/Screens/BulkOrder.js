import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BulkOrder = () => {
  const [form, setForm] = useState({
    customerName: '',
    customerAddress: '',
    shippedTo: '',
    shippedAddress: '',
    // expectedDeliveryDate: new Date(),
    remarks: '',
    partNo: '',
  });

  const [showPicker, setShowPicker] = useState(false);
  const navigation = useNavigation();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState();

  // console.log('userData', userData);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const removeProduct = id => {
    setSelectedProducts(prev => prev.filter(item => item.id !== id));
  };

  const fetchPartData = async input => {
    setLoading(true);
    setError(null);
    setData([]);

    try {
      const formData = new FormData();
      formData.append('part_no', input);

      const response = await axios.post(
        'https://argosmob.uk/uaw-auto/public/api/v1/product/pure-part-no',
        formData,
        {headers: {'Content-Type': 'multipart/form-data'}},
      );

      if (response.data.status && response.data.products) {
        setData(response.data.products);
      } else {
        setError('No products found.');
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  console.log('Selected Items', selectedProducts);
  const ProductCard = ({product, onSelect, isSelected}) => (
    <TouchableOpacity
      onPress={() => onSelect(product)}
      style={[styles.card, isSelected ? styles.selectedCard : {}]}>
      <View style={{marginRight: 10}}>
        <Image
          source={{
            uri: product.image_path
              ? `https://argosmob.uk/uaw-auto/public/${product.image_path}`
              : 'https://via.placeholder.com/100',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>
          Serial No: <Text style={styles.value}>{product.sr_no}</Text>
        </Text>
        <Text style={styles.title}>
          Series & Cross:{' '}
          <Text style={styles.value}>{product.series_and_cross}</Text>
        </Text>
        <Text style={styles.title}>
          Vehicle: <Text style={styles.value}>{product.vehicle}</Text>
        </Text>
        <Text style={styles.title}>
          OEM No: <Text style={styles.value}>{product.oem}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedData = JSON.parse(userData);
          console.log(parsedData);
          setUserData(parsedData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
  }, []);

  const handleChange = (name, value) => {
    setForm(prev => ({...prev, [name]: value}));
  };
  const handleProductSelect = product => {
    setSelectedProducts(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, {...product, quantity: 1}];
      }
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 0) return; // Prevent negative values
    setSelectedProducts(prev =>
      prev.map(item =>
        item.id === id ? {...item, quantity: newQuantity} : item,
      ),
    );
  };

  const filteredData = selectedProducts.map(item => ({
    product_id: item.id,
    qty: item.quantity,
    other_details: JSON.stringify({sr_no: item.sr_no}),
  }));
  console.log('filtered Data', filteredData);
  // console.log('date', form.expectedDeliveryDate.toISOString().split('T')[0]);
  const handleSubmit = async () => {
    setLoading(true);

    try {
      const orderData = {
        user_id: userData?.id,
        name: userData?.name,
        email: userData?.email || 'uaw@uawauto.com',
        phone: userData?.phone,
        city: userData?.city,
        address: 'N/A',
        type: 'bulk',
        shipped_to: form?.shippedTo,
        shipped_address: form?.shippedAddress,
        remark: form?.remarks,
        status: 'Pending',
        payment_term: 'N/A',
        items: filteredData,
      };

      console.log('hhhh', orderData);
      const response = await axios.post(
        'https://argosmob.uk/uaw-auto/public/api/v1/product/make-order',
        orderData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Order Response:', response.data);
      alert('Order placed successfully!');
      setForm({
        shippedTo: '',
        shippedAddress: '',
        remarks: '',
      });
      setInput('');
      setData([]);

      setSelectedProducts([]);
    } catch (error) {
      console.error(
        'Order Failed:',
        error.response ? error.response.data : error.message,
      );
      alert('Failed to place order. Please Login.');
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <MaterialCommunityIcons name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <Text style={[styles.header, {marginLeft: 20}]}>Bulk Order</Text>
      </View>
      {[
        'customerName',
        'customerAddress',
        'shippedTo',
        'shippedAddress',
        'remarks',
      ].map(field => (
        <View style={styles.inputContainer} key={field}>
          <Text style={styles.label}>
            {field.replace(/([A-Z])/g, ' $1').trim()}
          </Text>
          <TextInput
            style={styles.input}
            placeholder={`Enter ${field}`}
            placeholderTextColor="#888"
            value={form[field]}
            onChangeText={text => handleChange(field, text)}
          />
        </View>
      ))}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter Part No</Text>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={text => {
            setInput(text);
            text.trim() !== '' ? fetchPartData(text) : setData([]);
          }}
          placeholder="Type here..."
          placeholderTextColor="black"
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="#ff9900" />
      ) : (
        <FlatList
          data={data.slice(0, 4)}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <ProductCard
              product={item}
              onSelect={handleProductSelect}
              isSelected={selectedProducts.some(p => p.id === item.id)}
            />
          )}
        />
      )}
      <View style={styles.selectedContainer}>
        <Text style={styles.header}>Selected Products:</Text>
        {selectedProducts.length === 0 ? (
          <Text style={styles.noData}>No products selected.</Text>
        ) : (
          <View style={styles.selectedContainer}>
            {/* <Text style={styles.header}>Selected Products:</Text> */}

            {selectedProducts.length === 0 ? (
              <Text style={styles.noData}>No products selected.</Text>
            ) : (
              <View style={styles.tableContainer}>
                {/* Table Header */}
                <View style={styles.tableRow}>
                  <Text style={[styles.tableHeader, {flex: 2}]}>Sr No</Text>
                  <Text style={[styles.tableHeader, {flex: 3}]}>Name</Text>
                  <Text style={[styles.tableHeader, {flex: 2}]}>Qty</Text>
                  <Text style={[styles.tableHeader, {flex: 2}]}>Actions</Text>
                </View>

                {/* Table Rows */}
                {selectedProducts.map(item => (
                  <View key={item.id} style={styles.tableRow}>
                    <Text style={[styles.tableCell, {flex: 2}]}>
                      {item.sr_no}
                    </Text>
                    <Text style={[styles.tableCell, {flex: 3}]}>
                      {item.name}
                    </Text>

                    {/* Quantity Controls */}
                    <View
                      style={[
                        styles.tableCell,
                        {flex: 2, flexDirection: 'row', alignItems: 'center'},
                      ]}>
                      <TextInput
                        style={styles.quantityInput}
                        keyboardType="numeric"
                        value={String(item.quantity)} // Ensure it's a string for TextInput
                        onChangeText={text => {
                          const newQuantity = parseInt(text) || 0; // Convert text to number and handle empty input
                          updateQuantity(item.id, newQuantity);
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => removeProduct(item.id)}
                      style={styles.deleteButton}>
                      <Text style={styles.deleteText}>X</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleSubmit();
        }}>
        <Text style={styles.buttonText}>
          {loading ? 'Loading...' : 'Submit'}
        </Text>
        {/* <Text style={styles.buttonText}>Submit Request</Text> */}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BulkOrder;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFD580', paddingHorizontal: 20},
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    // width:'100%'
    // marginBottom: 20,
  },
  inputContainer: {marginBottom: 15},
  label: {fontSize: 16, fontWeight: '500', marginBottom: 5, color: '#333'},
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    fontSize: 16,
    height: 40,
    marginBottom: 10,
  },
  dateBox: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  dateText: {fontSize: 16, color: '#555'},
  button: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 60,
  },
  buttonText: {color: '#000', fontSize: 18, fontWeight: 'bold'},
  error: {color: 'red', marginBottom: 10},
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFD580',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  image: {width: 100, height: 100, borderRadius: 8},
  title: {fontSize: 14, fontWeight: 'bold', color: 'black'},
  value: {fontSize: 14, color: 'black'},
  noData: {fontSize: 16, color: 'black', textAlign: 'center', marginTop: 20},
  selectedContainer: {
    // marginTop: 20,
    // padding: 10,
    backgroundColor: '#FFD580',
    borderRadius: 8,
  },

  selectedCard: {
    backgroundColor: '#ffcc00',
  },
  quantityInput: {
    width: 50,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    marginHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  selectedItemContainer: {
    padding: 10,
    backgroundColor: '#ffcc00',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    minWidth: 30,
    textAlign: 'center',
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },

  ///////////
  tableContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    // paddingVertical: 8,
    alignItems: 'center',
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
    borderBottomWidth: 1,
    backgroundColor: '#ffcc00',
  },
  tableCell: {
    fontSize: 14,
    padding: 5,
    textAlign: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  deleteButton: {
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  quantityInput: {
    width: 50,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#fff', // Optional for visibility
  },
});
