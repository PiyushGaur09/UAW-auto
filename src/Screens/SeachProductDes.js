import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  PanResponder,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';

const SearchProductsDes = ({route, navigation}) => {
  const {product, products, index} = route.params;

  const [currentIndex, setCurrentIndex] = useState(index);
  const [currentProduct, setCurrentProduct] = useState(product);
  const [quantity, setQuantity] = useState('1'); // Changed to string to allow empty value
  const [quantityError, setQuantityError] = useState(false);
  const [cartItems, setCartItems] = useState(0);

  const fetchCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      const parsedCart = storedCart ? JSON.parse(storedCart) : [];
      // console.log("parsedCart",parsedCart?.length);
      setCartItems(parsedCart?.length);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [cartItems]),
  );

  const incrementQuantity = () => {
    const num = quantity === '' ? 0 : parseInt(quantity, 10);
    setQuantity((num + 1).toString());
    setQuantityError(false);
  };

  const decrementQuantity = () => {
    const num = quantity === '' ? 1 : parseInt(quantity, 10);
    if (num > 1) {
      setQuantity((num - 1).toString());
      setQuantityError(false);
    }
  };

  const handleQuantityChange = text => {
    // Allow empty string or numbers
    if (text === '' || /^\d*$/.test(text)) {
      setQuantity(text);
      setQuantityError(false);
    }
  };

  const validateQuantity = () => {
    // When input loses focus, ensure we have at least 1
    if (quantity === '' || parseInt(quantity, 10) < 1) {
      setQuantity('1');
    }
  };

  const addToCart = async () => {
    const qty = quantity === '' ? 0 : parseInt(quantity, 10);

    if (qty < 1) {
      setQuantityError(true);
      Alert.alert('Error', 'Please enter a valid quantity (minimum 1)');
      return;
    }

    try {
      const currentCart = await AsyncStorage.getItem('cart');
      const parsedCart = currentCart ? JSON.parse(currentCart) : [];
      const newCart = [...parsedCart, {...currentProduct, quantity: qty}];
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
      Alert.alert(
        'Success',
        `${qty} Quantity of ${currentProduct.name} added to cart!`,
      );
      setQuantity('1'); // Reset to 1 after adding
      fetchCart(); // Refresh cart item count after adding
    } catch (error) {
      console.error('Error saving to cart:', error);
    }
  };

  // const incrementQuantity = () => setQuantity(prev => prev + 1);
  // const decrementQuantity = () =>
  //   setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // const addToCart = async () => {
  //   try {
  //     const currentCart = await AsyncStorage.getItem('cart');
  //     const parsedCart = currentCart ? JSON.parse(currentCart) : [];
  //     const newCart = [...parsedCart, {...currentProduct, quantity}];
  //     await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  //     Alert.alert(
  //       'Success',
  //       `${quantity} Quantity of ${currentProduct.name} added to cart!`,
  //     );
  //     fetchCart(); // Refresh cart item count after adding
  //   } catch (error) {
  //     console.error('Error saving to cart:', error);
  //   }
  // };

  const currentIndexRef = useRef(currentIndex);

  const goToNextProduct = () => {
    if (currentIndexRef.current < products.length - 1) {
      const nextIndex = currentIndexRef.current + 1;
      setCurrentIndex(nextIndex);
      setCurrentProduct(products[nextIndex]);
    }
  };

  const goToPrevProduct = () => {
    if (currentIndexRef.current > 0) {
      const prevIndex = currentIndexRef.current - 1;
      setCurrentIndex(prevIndex);
      setCurrentProduct(products[prevIndex]);
    }
  };

  // console.log('Current Index', currentIndex);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -50) {
          goToNextProduct(); // Swipe left
        } else if (gestureState.dx > 50) {
          goToPrevProduct(); // Swipe right
        }
      },
    }),
  ).current;

  const [mainImage, setMainImage] = useState({});
  // uri: `https://argosmob.uk/uaw-auto/public/${currentProduct.image_path}`,

  const images = [
    {uri: `https://argosmob.uk/uaw-auto/public/${currentProduct.image_path}`},
    // Add additional images if available
  ];

  useEffect(() => {
    setMainImage({
      uri: `https://argosmob.uk/uaw-auto/public/${currentProduct.image_path}`,
    });
  }, [currentProduct]);

  const DetailRow = ({label, value}) => (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          {/* Back Arrow */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.headerTitle}>Product Description</Text>
          <TouchableOpacity style={{padding: 10}}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {
                navigation.navigate('Cart');
              }}>
              <Icon name="shopping-cart" size={24} color="black" />
              {cartItems > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartItems}</Text>
                </View>
              )}
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>{currentProduct.name}</Text>
          {currentProduct.in_stock ? (
            <Text style={styles.stockBadge}>In Stock</Text>
          ) : (
            <Text style={[styles.stockBadge, styles.outOfStockBadge]}>
              Out of Stock
            </Text>
          )}
        </View>

        {mainImage?.uri && (
          <ReactNativeZoomableView
            maxZoom={2}
            minZoom={1}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
            style={{width: '100%', height: 250}}
            contentWidth={300}
            contentHeight={250}>
            <Image
              source={mainImage}
              style={{width: '100%', height: 250, resizeMode: 'contain'}}
            />
          </ReactNativeZoomableView>
        )}

        <View style={styles.imageGallery}>
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setMainImage(image)}
              style={styles.thumbnailWrapper}>
              <Image source={image} style={styles.thumbnail} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.detailsContainer}>
          <DetailRow label="Serial No" value={currentProduct?.sr_no} />
          <DetailRow label="Description" value={currentProduct?.description} />
          <DetailRow label="Price" value={`₹${currentProduct?.price}`} />
          <DetailRow label="OEM" value={currentProduct?.oem} />
          <DetailRow
            label="Stock Quantity"
            value={currentProduct?.qty?.toString()}
          />
          <DetailRow label="Vehicle" value={currentProduct?.vehicle} />
          <DetailRow
            label="Length (Inch)"
            value={currentProduct?.length_inch}
          />
          <DetailRow label="Length (MM)" value={currentProduct?.length_mm} />
          <DetailRow
            label="Pipe Diameter (Inch)"
            value={currentProduct?.pipe_dia_inch}
          />
          <DetailRow
            label="Pipe Diameter (MM)"
            value={currentProduct?.pipe_dia_mm}
          />
          <DetailRow
            label="Series and Cross"
            value={currentProduct?.series_and_cross}
          />
        </View>
      </ScrollView>

      <View style={styles.actionsContainer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={decrementQuantity}>
            <Icon name="remove" size={24} color="black" />
          </TouchableOpacity>
          <TextInput
            style={[styles.quantityInput, quantityError && styles.errorInput]}
            keyboardType="numeric"
            value={quantity}
            onChangeText={handleQuantityChange}
            onBlur={validateQuantity}
            selectTextOnFocus
          />
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={incrementQuantity}>
            <Icon name="add" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cartIcon} onPress={addToCart}>
          <Text style={styles.cartText}>Add To Cart</Text>
          <Icon name="shopping-cart" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* <View style={styles.actionsContainer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={decrementQuantity}>
            <Icon name="remove" size={24} color="black" />
          </TouchableOpacity>
          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            value={quantity.toString()}
            onChangeText={text => setQuantity(Number(text) || 1)}
          />
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={incrementQuantity}>
            <Icon name="add" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cartIcon} onPress={addToCart}>
          <Text style={styles.cartText}>Add To Cart</Text>
          <Icon name="shopping-cart" size={24} color="black" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD580',
    paddingHorizontal: 16,
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerContainer: {
    height: 60,

    justifyContent: 'space-between',
    backgroundColor: '#FFD580',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: -20,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
  },
  stockBadge: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  outOfStockBadge: {
    backgroundColor: '#FF5252',
  },
  productImage: {
    width: '100%',
    height: 250,
    // borderRadius: 10,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  imageGallery: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  thumbnailWrapper: {
    marginRight: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DDD',
    resizeMode: 'cover',
  },
  detailsContainer: {
    backgroundColor: '#FFD580',
    borderRadius: 8,
    padding: 16,
    elevation: 3,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  detailValue: {
    fontSize: 14,
    color: 'black',
    flex: 1,
    textAlign: 'right',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    borderTopWidth: 0.5,
    borderColor: 'black',
    backgroundColor: '#FFD580',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: '#FFD580',
    marginHorizontal: 10,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityInput: {
    width: 50,
    height: 40,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  cartIcon: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#FFD580',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  cartText: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  errorInput: {
    borderColor: 'red',
    backgroundColor: '#FFEEEE',
  },
});

export default SearchProductsDes;
