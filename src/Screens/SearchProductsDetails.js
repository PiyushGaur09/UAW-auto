import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const SearchProductsDetails = ({route}) => {
  const {productId} = route.params; // Destructure the parameter
  // console.log("product",productId)

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // console.log('Product', products);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('product_id', productId); // Replace with actual product_id

      const response = await axios.post(
        'https://argosmob.uk/uaw-auto/public/api/v1/product/filter-product',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('Product', response.data);

      const productData = response.data?.response?.product;

      if (Array.isArray(productData)) {
        setProducts(productData);
      } else {
        Alert.alert(
          'No Products Found',
          'No data available for the selected product.',
        );
        setProducts([]);
      }
    } catch (error) {
      console.error('API Error:', error.message);
      Alert.alert('Error', 'Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const ProductCard = ({product, navigation, products}) => (
    <TouchableOpacity
      onPress={() =>
        // navigation.navigate('Search Product Des', {product})
        navigation.navigate('Search Product Des', {
          product,
          products: products, // current list of products
          index: products.findIndex(p => p.id === product.id),
        })
      }
      style={styles.card}>
      {/* Placeholder for image */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: product.image_path
              ? `https://argosmob.uk/uaw-auto/public/${product?.image_path}`
              : 'https://imgs.search.brave.com/K7TdjciLTAmvqtg6-fqKm20muPAAzRMj1OonJ6HIhME/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg5LzU1LzE1/LzM2MF9GXzg5NTUx/NTk2X0xkSEFaUnd6/M2k0RU00SjBOSE5I/eTJoRVVZRGZYYzBq/LmpwZw',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.detailsContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.title}>Serial No. : </Text>
          <Text style={styles.value}>{product.sr_no}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.title}>Series & Cross : </Text>
          <Text style={styles.value}>{product.series_and_cross}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.title}>Vehicle : </Text>
          <Text style={styles.value}>{product.vehicle}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.title}>OEM No. : </Text>
          <Text style={styles.value}>{product.oem}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ProductCard
            product={item}
            navigation={navigation}
            products={products}
          />
        )}
        ListEmptyComponent={
          !loading && (
            <Text style={styles.noData}>
              No products found. Try a different product ID.
            </Text>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFD580',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noData: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'black',
  },
  listContainer: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFD580',
    borderRadius: 8,
    elevation: 10,
    marginBottom: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  detailsContainer: {
    // flex: 1,
    // justifyContent:'space-between'
  },
  title: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 14,
    color: 'black',
    marginBottom: 8,
  },
});

export default SearchProductsDetails;
