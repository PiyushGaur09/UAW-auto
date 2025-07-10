// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Install react-native-vector-icons if not already

// const ProductItem = ({item, navigation}) => {
//   const [quantity, setQuantity] = useState(1); // State for quantity

//   return (
//     //     <View style={styles.itemContainer}>
//     //       <TouchableOpacity
//     //         onPress={() => navigation.navigate('Product Description', {item})}
//     //         style={styles.touchableArea}>
//     //         {/* Product Image */}
//     //         <Image
//     //           source={{
//     //             uri: `https://argosmob.uk/uaw-auto/public/${item.image_path}`,
//     //           }}
//     //           style={styles.image}
//     //         />
//     //         {/* Product Name */}
//     //         <Text style={styles.title}>{item.name}</Text>
//     //         {/* Product Price */}
//     //         <Text style={styles.price}>₹{item.price}</Text>
//     //       </TouchableOpacity>

//     //       {/* Quantity Input and Cart Icon */}
//     //       <View style={styles.cartRow}>
//     //         {/* Quantity Input */}
//     //         <TextInput
//     //           style={styles.quantityInput}
//     //           keyboardType="numeric"
//     //           value={quantity.toString()}
//     //           onChangeText={text => setQuantity(Number(text))}
//     //           placeholder="Qty"
//     //         />
//     //         {/* Cart Icon */}
//     //         <TouchableOpacity
//     //           style={styles.cartIcon}
//     //           onPress={() => {
//     //             // Handle adding item to cart
//     //             console.log(`Added ${quantity} of ${item.name} to the cart.`);
//     //           }}>
//     //           <Icon name="shopping-cart" size={24} color="#000" />
//     //         </TouchableOpacity>
//     //       </View>
//     //     </View>
//     //   );
//     // };

//     <View style={styles.itemContainer}>
//       <TouchableOpacity
//         onPress={() => navigation.navigate('Product Description', {item})}
//         style={styles.touchableArea}>
//         {/* Product Image */}
//         <Image
//           source={{
//             uri: `https://argosmob.uk/uaw-auto/public/${item.image_path}`,
//           }}
//           style={styles.image}
//         />
//         {/* Product Name */}
//         <Text style={styles.title}>{item.name}</Text>
//         {/* Product Price */}
//         <Text style={styles.price}>₹{item.price}</Text>
//       </TouchableOpacity>

//       {/* Quantity Input and Cart Icon */}
//       <View style={styles.cartRow}>
//         {/* Quantity Input */}
//         <TextInput
//           style={styles.quantityInput}
//           keyboardType="numeric"
//           value={quantity.toString()}
//           onChangeText={text => setQuantity(Number(text))}
//           placeholder="Qty"
//         />
//         {/* Cart Icon */}
//         <TouchableOpacity
//           style={styles.cartIcon}
//           onPress={() => {
//             // Handle adding item to cart
//             console.log(`Added ${quantity} of ${item.name} to the cart.`);
//           }}>
//           <Icon name="shopping-cart" size={24} color="#000" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   //   itemContainer: {
//   //     flexDirection: 'column',
//   //     borderWidth: 1,
//   //     borderColor: '#e0e0e0',
//   //     borderRadius: 8,
//   //     padding: 10,
//   //     margin: 10,
//   //     backgroundColor: '#fff',
//   //     width:'47%'
//   //   },
//   //   touchableArea: {
//   //     alignItems: 'center',
//   //   },
//   //   image: {
//   //     width: 100,
//   //     height: 100,
//   //     resizeMode: 'contain',
//   //     marginBottom: 10,
//   //   },
//   //   title: {
//   //     fontSize: 16,
//   //     fontWeight: 'bold',
//   //     color: '#333',
//   //     textAlign: 'center',
//   //   },
//   //   price: {
//   //     fontSize: 14,
//   //     color: '#888',
//   //     marginVertical: 5,
//   //   },
//   //   cartRow: {
//   //     flexDirection: 'row',
//   //     justifyContent: 'space-between',
//   //     alignItems: 'center',
//   //     marginTop: 10,
//   //   },
//   //   quantityInput: {
//   //     borderWidth: 1,
//   //     borderColor: '#ccc',
//   //     borderRadius: 5,
//   //     padding: 5,
//   //     width: 60,
//   //     textAlign: 'center',
//   //     marginRight: 10,
//   //   },
//   //   cartIcon: {
//   //     padding: 10,
//   //     borderWidth: 1,
//   //     borderColor: '#ccc',
//   //     borderRadius: 5,
//   //   },

//   row: {
//     justifyContent: 'space-between',
//     marginVertical: 10,
//   },
//   itemContainer: {
//     flexDirection: 'column',
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     borderRadius: 8,
//     padding: 10,
//     margin: 5,
//     backgroundColor: '#fff',
//     width: '48%', // Adjust for two cards in a row with spacing
//   },
//   touchableArea: {
//     alignItems: 'center',
//   },
//   image: {
//     width: '100%',
//     height: 100,
//     resizeMode: 'contain',
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'center',
//     marginVertical: 5,
//   },
//   price: {
//     fontSize: 14,
//     color: '#888',
//     marginBottom: 5,
//     textAlign: 'center',
//   },
//   cartRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   quantityInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     width: 50,
//     textAlign: 'center',
//   },
//   cartIcon: {
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//   },
// });

// export default ProductItem;

import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ProductItem = ({item, navigation}) => {
  const [quantity, setQuantity] = useState(1); // State for quantity

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const addToCart = async () => {
    try {
      const currentCart = await AsyncStorage.getItem('cart');
      const parsedCart = currentCart ? JSON.parse(currentCart) : [];
      const newCart = [...parsedCart, {...item, quantity}];
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
      Alert.alert('Success', `${quantity} Quanity of ${item.name} added to cart!`);
    } catch (error) {
      console.error('Error saving to cart:', error);
    }
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Product Description', {item})}
        style={styles.touchableArea}>
        {/* Product Image */}
        <Image
          source={{
            uri: item.image_path
              ? `https://argosmob.uk/uaw-auto/public/${item.image_path}`
              : 'https://imgs.search.brave.com/K7TdjciLTAmvqtg6-fqKm20muPAAzRMj1OonJ6HIhME/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg5LzU1LzE1/LzM2MF9GXzg5NTUx/NTk2X0xkSEFaUnd6/M2k0RU00SjBOSE5I/eTJoRVVZRGZYYzBq/LmpwZw',
          }}
          style={styles.image}
        />
        {/* Product Name */}
        <Text style={styles.title}>{item.name}</Text>
        {/* Product Price */}
        <Text style={styles.price}>₹{item.price}</Text>
      </TouchableOpacity>

      {/* Quantity Input and Cart Icon */}
      <View style={styles.cartRow}>
        {/* Decrement Button */}
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={decrementQuantity}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        {/* Quantity Input */}
        <TextInput
          style={styles.quantityInput}
          keyboardType="numeric"
          value={quantity.toString()}
          onChangeText={text => setQuantity(Number(text))}
        />
        {/* Increment Button */}
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={incrementQuantity}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        {/* Cart Icon */}
        <TouchableOpacity
          style={styles.cartIcon}
          onPress={() => {
            // Handle adding item to cart
            // console.log(`Added ${quantity} of ${item.name} to the cart.`);
            addToCart()
          }}>
          <Icon name="shopping-cart" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// const ProductList = ({ products, navigation }) => {
//   return (
//     <FlatList
//       data={products}
//       keyExtractor={(item) => item.id.toString()}
//       numColumns={2}
//       columnWrapperStyle={styles.row}
//       renderItem={({ item }) => (
//         <ProductItem item={item} navigation={navigation} />
//       )}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   row: {
//     justifyContent: 'space-between',
//     marginVertical: 10,
//   },
//   itemContainer: {
//     flexDirection: 'column',
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     borderRadius: 8,
//     padding: 10,
//     margin: 5,
//     backgroundColor: '#fff',
//     width: '48%', // Adjust for two cards in a row with spacing
//   },
//   touchableArea: {
//     alignItems: 'center',
//   },
//   image: {
//     width: '100%',
//     height: 100,
//     resizeMode: 'contain',
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'center',
//     marginVertical: 5,
//   },
//   price: {
//     fontSize: 14,
//     color: '#888',
//     marginBottom: 5,
//     textAlign: 'center',
//   },
//   cartRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 40,
//     // position:'absolute',
//     // bottom:2
//   },
//   quantityButton: {
//     width: 30,
//     height: 30,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#000',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   quantityInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 5,
//     width: 50,
//     textAlign: 'center',
//     marginHorizontal: 5,
//   },
//   cartIcon: {
//     width: 30,
//     height: 30,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    width: '48%',
    flex: 1, // Ensure it takes up all available space
  },
  touchableArea: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
    textAlign: 'center',
  },
  cartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto', // Push this row to the bottom of the card
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    width: 40,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  cartIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default ProductItem;
