import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState();
  const navigation = useNavigation();

  // Fetch cart items from AsyncStorage
  const fetchCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      const parsedCart = storedCart ? JSON.parse(storedCart) : [];
      setCartItems(parsedCart);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');

      if (userData) {
        const parsedData = JSON.parse(userData);
        setUserData(parsedData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

   useFocusEffect(
    useCallback(() => {
      fetchCart();
      getUserData();
    }, [])
  );


  // Use useFocusEffect to refresh cart items when the screen gains focus
  // useFocusEffect(
  //   useCallback(() => {
  //     fetchCart();
  //   }, []),
  // );

  // Handle Delete Function
  const handleDelete = async itemToDelete => {
    try {
      const updatedCart = cartItems.filter(item => item.id !== itemToDelete.id);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      Alert.alert(
        'Success',
        `${itemToDelete.name} has been removed from the cart!`,
      );
    } catch (error) {
      console.error('Error deleting item from cart:', error);
      Alert.alert(
        'Error',
        'Unable to delete the item from the cart. Please try again.',
      );
    }
  };

  // Clear Cart Function
  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('cart');
      setCartItems([]);
      Alert.alert('Success', 'Cart has been cleared!');
    } catch (error) {
      console.error('Error clearing cart:', error);
      Alert.alert('Error', 'Unable to clear the cart. Please try again.');
    }
  };

  // Handle Order Button Press
  const handleOrder = () => {
    navigation.navigate('Request Order', {cartItems});
  };

  // Render Cart Item
  const renderItem = ({item}) => {
    console.log('item', item);
    return (
      <View style={styles.cartItem}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.image_path
                ? `https://argosmob.uk/uaw-auto/public/${item.image_path}`
                : 'https://imgs.search.brave.com/K7TdjciLTAmvqtg6-fqKm20muPAAzRMj1OonJ6HIhME/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg5LzU1LzE1/LzM2MF9GXzg5NTUx/NTk2X0xkSEFaUnd6/M2k0RU00SjBOSE5I/eTJoRVVZRGZYYzBq/LmpwZw',
            }}
            style={styles.productImage}
          />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.details}>
            <Text style={styles.detailText} numberOfLines={3}>
              <Text style={styles.label}>Product Name:</Text> {item?.name}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.label}>Series and Cross:</Text>{' '}
              {item?.series_and_cross}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.label}>Length:</Text> {item?.length_inch}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.label}>Quantity:</Text> {item.quantity}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Back Arrow */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.headerTitle}>Cart</Text>
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()} // Ensure your item has an id field
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Cart is empty</Text>}
        contentContainerStyle={styles.listContent}
      />

      {/* Footer Buttons */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.clearCartButton} onPress={clearCart}>
          <Text style={styles.clearCartButtonText}>Clear Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => {
            if (userData) {
              handleOrder();
            } else {
              Alert.alert(
                'Login Required',
                'Please login to place an order.',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('Login'),
                  },
                ],
                {cancelable: true},
              );
            }
          }}>
          <Text style={styles.orderButtonText}>Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD580',
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFD580',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  details: {
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
  },
  deleteButton: {
    backgroundColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#FFD580',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 50,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  clearCartButton: {
    backgroundColor: 'black',
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  clearCartButtonText: {
    color: '#FFD580',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: 'black',
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  orderButtonText: {
    color: '#FFD580',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerContainer: {
    height: 60,
    backgroundColor: '#FFD580',
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
    color: 'black',
  },
});

export default CartScreen;
