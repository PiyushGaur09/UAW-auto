// import React, {useState} from 'react';
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';

// const SearchByParts = () => {
//   const navigation = useNavigation();
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   const fetchPartData = async () => {
//     setLoading(true);
//     setError(null);
//     setData([]);

//     try {
//       const formData = new FormData();
//       formData.append('part_no', input);

//       const response = await axios.post(
//         'https://argosmob.uk/uaw-auto/public/api/v1/product/part-no',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         },
//       );

//       if (response.data.status && response.data.products) {
//         setData(response.data.products);
//       } else {
//         setError('No products found.');
//       }
//     } catch (err) {
//       setError('Failed to fetch data. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//  const ProductCard = ({product, navigation}) => {
//     return (
//       <TouchableOpacity
//         onPress={() => navigation.navigate('Search Product Des', {product})}
//         style={styles.card}>
//         {/* Placeholder for image */}
//         <View style={styles.imageContainer}>
//           <Image
//             source={{
//               uri: product.image_path
//                 ? `https://argosmob.uk/uaw-auto/public/${product.image_path}`
//                 : 'https://imgs.search.brave.com/K7TdjciLTAmvqtg6-fqKm20muPAAzRMj1OonJ6HIhME/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg5LzU1LzE1/LzM2MF9GXzg5NTUx/NTk2X0xkSEFaUnd6/M2k0RU00SjBOSE5I/eTJoRVVZRGZYYzBq/LmpwZw',
//             }} // Replace with an actual image path
//             style={styles.image}
//           />
//         </View>
//         <View style={styles.detailsContainer}>
//           <View style={{flexDirection: 'row'}}>
//             <Text style={styles.title}>Serial No. : </Text>
//             <Text style={styles.value}>{product.sr_no}</Text>
//           </View>
//           <View style={{flexDirection: 'row'}}>
//             <Text style={styles.title}>Series & Cross : </Text>
//             <Text style={styles.value}>{product.series_and_cross}</Text>
//           </View>
//           <View style={{flexDirection: 'row'}}>
//             <Text style={styles.title}>Vehicle : </Text>
//             <Text style={styles.value}>{product.vehicle}</Text>
//           </View>
//           <View style={{flexDirection: 'row'}}>
//             <Text style={styles.title}>OEM No. : </Text>
//             <Text style={styles.value}>{product.oem}</Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Enter Part No</Text>
//       <TextInput
//         style={styles.input}
//         value={input}
//         onChangeText={setInput}
//         placeholder="Type here..."
//         placeholderTextColor="black"
//       />
//       <TouchableOpacity
//         style={styles.button}
//         onPress={fetchPartData}
//         disabled={loading || input.trim() === ''}>
//         <Text style={styles.buttonText}>
//           {loading ? 'Loading...' : 'Search'}
//         </Text>
//       </TouchableOpacity>

//       {error && <Text style={styles.error}>{error}</Text>}

//       {loading ? (
//         <ActivityIndicator size="large" color="#00AEEF" />
//       ) : (
//         <FlatList
//           data={data}
//           keyExtractor={item => item.id.toString()}
//           showsVerticalScrollIndicator={false}
//           renderItem={({item})=>(
//             <ProductCard product={item} navigation={navigation} />
//           )}
//           ListEmptyComponent={
//             !loading && <Text style={styles.noData}>No products found.</Text>
//           }
//         />
//       )}
//     </View>
//   );
// };

import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const SearchByParts = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchPartData = async () => {
    if (input.trim() === '') return;

    setLoading(true);
    setError(null);
    setData([]);

    try {
      const formData = new FormData();
      formData.append('part_no', input);

      const response = await axios.post(
        'https://argosmob.uk/uaw-auto/public/api/v1/product/part-no',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
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

  // 🔁 Auto-search with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (input.trim() !== '') {
        fetchPartData();
      } else {
        setData([]);
        setError(null);
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(delayDebounce);
  }, [input]);

  const ProductCard = ({product, navigation, products}) => {
    return (
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
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: product.image_path
                ? `https://argosmob.uk/uaw-auto/public/${product.image_path}`
                : 'https://imgs.search.brave.com/K7TdjciLTAmvqtg6-fqKm20muPAAzRMj1OonJ6HIhME/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg5LzU1LzE1/LzM2MF9GXzg5NTUx/NTk2X0xkSEFaUnd6/M2k0RU00SjBOSE5I/eTJoRVVZRGZYYzBq/LmpwZw',
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.detailsContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>Part No. : </Text>
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
          {/* <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>OEM No. : </Text>
            <Text style={styles.value}>{product.oem}</Text>
          </View> */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Part No</Text>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type here..."
        placeholderTextColor="black"
      />

      {data.length > 0 && (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          horizontal={false}
          style={styles.dropdown}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => setInput(item.sr_no)}
              style={styles.dropdownItem}>
              <Text style={styles.dropdownText}>{item.sr_no}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#00AEEF" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            // <ProductCard product={item} />
            <ProductCard
              product={item}
              navigation={navigation}
              products={data}
            />
          )}
          ListEmptyComponent={
            !loading &&
            input.trim() !== '' && (
              <Text style={styles.noData}>No products found.</Text>
            )
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
    color: 'black',
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    fontSize: 16,
    color: 'black',
    height: 40,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFD580',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  dropdown: {
    maxHeight: 200,
    backgroundColor: '#FFD580',
    borderWidth: 1,
    borderColor: '#111',
    marginBottom: 10,
  },

  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#111',
  },

  dropdownText: {
    fontSize: 16,
    color: 'black',
  },
  item: {
    backgroundColor: '#FFF',
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
    color: '#333',
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  noData: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
  //flatlist Styling
  listContainer: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFD580',
    borderRadius: 8,
    elevation: 2,
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
    backgroundColor: '#FFD580',
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

export default SearchByParts;
