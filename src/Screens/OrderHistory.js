import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import axios from 'axios';

const OrderHistory = ({route}) => {
  const id = route.params.id;
  const orders = [
    {
      id: '1',
      orderNumber: '12345',
      productName: 'Product A',
      series_and_Cross: 'X100',
      length: '200 cm',
      image: 'https://via.placeholder.com/150',
      status: 'Pending',
      quantity: '10',
    },
    {
      id: '2',
      orderNumber: '67890',
      productName: 'Product B',
      series_and_Cross: 'Y200',
      length: '150 cm',
      image: 'https://via.placeholder.com/150',
      status: 'Delivered',
      quantity: '20',
    },
    {
      id: '3',
      orderNumber: '11223',
      productName: 'Product C',
      series_and_Cross: 'Z300',
      length: '180 cm',
      image: 'https://via.placeholder.com/150',
      status: 'Pending',
      quantity: '15',
    },
  ];

  const [orderHistory, setOrderHistory] = useState([]);

  const fetchOrderHistory = async () => {
    const url =
      'https://argosmob.uk/uaw-auto/public/api/v1/product/order-history';

    const data = {
      user_id: id,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setOrderHistory(response?.data?.orders);
      // console.log('Order History:', response.data);
    } catch (error) {
      console.error(
        'Error fetching order history:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  // const handleCancelOrder = order => {
  //   if (order.status !== 'Pending') return;
  //   Alert.alert(
  //     'Order Cancelled',
  //     `Order ${order.orderNumber} has been cancelled.`,
  //   );
  // };

  const handleCancelOrder = async item => {
    console.log('orderId', item);
    // console.log('userId', item.user_id);

    if (item?.status !== 'Pending') return;

    const cancelUrl =
      'https://argosmob.uk/uaw-auto/public/api/v1/product/order-cancelled';
    const requestBody = {user_id: item.user_id, order_id: item?.id};

    try {
      const response = await axios.post(cancelUrl, requestBody, {
        headers: {'Content-Type': 'application/json'},
      });

      Alert.alert('Success', `Your Order has been cancelled.`);
      fetchOrderHistory();

      // if (response.data.success) {
      //   Alert.alert('Success', `Order ${item?.id} has been cancelled.`);
      //   fetchOrderHistory(); // Refresh the list
      // } else {
      //   Alert.alert('Error', `Unable to cancel order: ${response.data.message}`);
      // }
    } catch (error) {
      console.error(
        'Error cancelling order:',
        error.response ? error.response.data : error.message,
      );
      Alert.alert(
        'Error',
        'An error occurred while trying to cancel the order. Please try again later.',
      );
    }
  };

  const handleRepeatOrder = order => {
    Alert.alert('Order Repeated', `Your order has been repeated.`);
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  // console.log('Order History:', orderHistory);

  const renderOrder = ({item}) => {
    // console.log("LLL",item.items[0].product)
    const product = item?.items[0].product;
    return (
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: product?.image_path
                ? `https://argosmob.uk/uaw-auto/public/${product?.image_path}`
                : 'https://imgs.search.brave.com/K7TdjciLTAmvqtg6-fqKm20muPAAzRMj1OonJ6HIhME/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg5LzU1LzE1/LzM2MF9GXzg5NTUx/NTk2X0xkSEFaUnd6/M2k0RU00SjBOSE5I/eTJoRVVZRGZYYzBq/LmpwZw',
            }}
            style={styles.productImage}
          />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.details}>
            <Text style={styles.detailText}>
              <Text style={styles.label}>Order Number:</Text> {product?.id}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.label}>Product Name:</Text> {product?.name}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.label}>Series and Cross:</Text>{' '}
              {product?.series_and_cross}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.label}>Length:</Text> {product?.length_inch}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.label}>Quantity:</Text> {product?.qty}
            </Text>
            <Text
              style={[
                styles.detailText,
                item.status === 'Delivered'
                  ? styles.statusDelivered
                  : styles.statusPending,
              ]}>
              <Text style={styles.label}>Status:</Text> {item.status}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.cancelButton,
                item.status !== 'Pending' && styles.disabledButton,
              ]}
              onPress={() => handleCancelOrder(item)}
              disabled={item.status !== 'Pending'}>
              <Text style={styles.buttonText}>
                {item.status === 'Pending' ? 'Cancel Order' : 'Order Cancelled'}
              </Text>
              {/* <Text style={styles.buttonText}>Cancel Order</Text> */}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.repeatButton}
              onPress={() => handleRepeatOrder(item)}>
              <Text style={styles.buttonText}>Repeat Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orderHistory}
        keyExtractor={item => item.id}
        renderItem={renderOrder}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD580',
    padding: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFD580',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 10,
    padding: 10,
    marginBottom: 15,
  },
  imageContainer: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  details: {
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 5,
    color: 'black',
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
  },
  statusDelivered: {
    color: 'green',
    fontWeight: 'bold',
  },
  statusPending: {
    color: 'black',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
    borderRadius: 8,
    marginRight: 5,
  },
  repeatButton: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#FFD580',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default OrderHistory;
