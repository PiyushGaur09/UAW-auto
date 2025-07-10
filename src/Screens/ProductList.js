import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import ProductItem from '../Utils/ProductItem';

const ProductList = ({route}) => {
  const {name} = route.params;

  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantity, setQuantity] = useState(1); // State for quantity

  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const formData = new FormData();
        formData.append('company', name);
        const response = await axios.post(
          'https://argosmob.uk/uaw-auto/public/api/v1/product/get-company-product',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        if (response.status) {
          const productList = response?.data?.products || [];
          setProducts(productList);
          setFilteredProducts(productList);
        } else {
          console.log('status', response.message);
        }
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredData = products.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredProducts(filteredData);
  }, [searchText, products]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder="Search"
          placeholderTextColor="#A7A9BE"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00AEEF" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={({item}) => (
            <ProductItem item={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      )}
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FFF',
  },
  inputBox: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFF',
    borderColor: '#A7A9BE',
    borderWidth: 1.5,
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 8,
    color: '#333',
  },
  row: {
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    color: '#0A1034',
    fontWeight: '600',
    textAlign: 'center',
  },
  price: {
    marginTop: 4,
    color: '#0001FC',
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
  //cart styling
  cartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    width: 60,
    textAlign: 'center',
    marginRight: 10,
  },
  cartIcon: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default ProductList;
