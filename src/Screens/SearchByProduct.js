import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const SearchByProduct = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [detailedProduct, setDetailedProduct] = useState(null);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  const API_URL =
    'https://argosmob.uk/uaw-auto/public/api/v1/product/filter-product';

  const fetchProductData = async (productId = '') => {
    setLoading(true);
    setError(null);
    setProducts([]);
    setDetailedProduct(null);

    try {
      const formData = new FormData();
      if (productId != '') {
        formData.append('product_id', productId);
      } else {
        formData.append('product_id', '');
      }

      const response = await axios.post(API_URL, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      });

      if (response.data.status) {
        if (productId) {
          setDetailedProduct(response.data.response);
        } else {
          setProducts(response.data.response.products);
          setFilteredData(response.data.response.products);
        }
      } else {
        setError(response.data.message || 'No products found.');
      }
    } catch (err) {
      console.error('API Error:', err.message);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const handleSearch = text => {
    setInput(text);
    if (text !== '') {
      const results = products.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      );

      setFilteredData(results);
    } else if (text == '') {
      setFilteredData(products);
    }
  };

  // console.log("data",filteredData)

  const renderProductItem = ({item, navigation}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Search Product Details', {productId: item.id})
          // navigation.navigate('Search Product Details', {
          //   item,
          //   products: filteredData, // current list of products
          //   index: filteredData.findIndex(p => p.id === item.id),
          // })
        }
        style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  }; 
  

  const renderDetailedProduct = () => {
    if (!detailedProduct) return null;

    const product = detailedProduct.product;
    const imageUrl = product.image_path
      ? `https://argosmob.uk/uaw-auto/public/${product.image_path}`
      : 'https://via.placeholder.com/150';

    return (
      <View style={styles.detailContainer}>
        <Image source={{uri: imageUrl}} style={styles.itemImage} />
        <Text style={styles.detailText}>Name: {product.name}</Text>
        <Text style={styles.detailText}>Price: ₹{product.price}</Text>
        <Text style={styles.detailText}>
          Description: {product.description}
        </Text>
        <Text style={styles.detailText}>
          Vehicle: {detailedProduct.vehicle}
        </Text>
        <Text style={styles.detailText}>OEM: {detailedProduct.oem}</Text>
        <Text style={styles.detailText}>
          Series and Cross: {detailedProduct.series_and_cross.join(', ')}
        </Text>
        <Text style={styles.detailText}>
          Number of Teeth: {detailedProduct.no_of_teeth.join(', ')}
        </Text>
        <Text style={styles.detailText}>
          Total Length (Inch): {detailedProduct.total_length_inch.join(', ')}
        </Text>
        <Text style={styles.detailText}>
          Total Length (MM): {detailedProduct.total_length_mm.join(', ')}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Category Name</Text>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={handleSearch}
        placeholder="Type here..."
        placeholderTextColor="#999"
      />

      {error && <Text style={styles.error}>{error}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#00AEEF" />
      ) : detailedProduct ? (
        renderDetailedProduct()
      ) : (
        <FlatList
        showsVerticalScrollIndicator={false}
          data={filteredData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => renderProductItem({item, navigation})}
          ListEmptyComponent={
            !loading && <Text style={styles.noData}>No products found.</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD580',
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#00AEEF',
    fontSize: 16,
    color: '#333',
    height: 40,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  itemText: {
    fontSize: 14,
    color: 'black',
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  detailContainer: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  noData: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SearchByProduct;
