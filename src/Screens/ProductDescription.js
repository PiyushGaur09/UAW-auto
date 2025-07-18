import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDescription = ({navigation, route}) => {
  const {item} = route.params;
  
  

  const [mainImage, setMainImage] = useState();

  const images = [
    {uri: `https://argosmob.uk/uaw-auto/public/${item.image_path}`},
  ];

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

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
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>{item.company.name}</Text>

          {item.in_stock ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>In Stock</Text>
            </View>
          ) : (
            <View style={[styles.badge, {backgroundColor: '#FFC2C2'}]}>
              <Text style={[styles.badgeText, {color: '#FF5C5C'}]}>
                Out of Stock
              </Text>
            </View>
          )}

          <Image source={mainImage} style={styles.productImage} />

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
            <DetailRow label="Description" value={item.description} />
            <DetailRow label="Price" value={`$${item.price}`} />
            <DetailRow label="OEM" value={item.oem} />
            <DetailRow label="Stock" value={item.qty} />
            <DetailRow label="Vehicle" value={item.vehicle} />
            <DetailRow label="Category" value={item.company.name} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionsContainer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={decrementQuantity}>
            <Icon name="remove" size={24} color="#fff" />
          </TouchableOpacity>
          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            value={quantity.toString()}
            onChangeText={(text) => setQuantity(Number(text) || 1)}
          />
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={incrementQuantity}>
            <Icon name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cartIcon} onPress={addToCart}>
          <Text style={{padding:10,fontSize:16,fontWeight:'bold',color:'#aa8e55'}}> Add To Cart</Text>
          <Icon style={{padding:10}} name="shopping-cart" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DetailRow = ({label, value}) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#555',
    marginBottom: 10,
  },
  badge: {
    backgroundColor: '#E6EDFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  badgeText: {
    color: '#5A80FF',
    fontSize: 14,
    fontWeight: '600',
  },
  productImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  imageGallery: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  thumbnailWrapper: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  thumbnail: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderColor: '#ECECEC',
    padding: 10,
    marginTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: '#333',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    borderTopWidth: 1,
    borderColor: '#ECECEC',
    backgroundColor: '#FFF',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#CCC',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#F9F9F9',
    marginHorizontal:10
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  quantityInput: {
    width: 50,
    height: 40,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
    fontSize: 16,
    fontWeight:'bold',
    marginHorizontal:10
  },
  cartIcon: {
    flexDirection:'row',
    flex:1,
    // width: 40,
    // height: 40,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default ProductDescription;
