// import React, {useState} from 'react';
// import {
//   View,
//   TextInput,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   Image,
// } from 'react-native';
// import axios from 'axios';
// import {useNavigation} from '@react-navigation/native';

// const SearchByORM = () => {
//   const navigation = useNavigation();
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   console.log('data', data);

//   const fetchOEMData = async () => {
//     setLoading(true);
//     setError(null);
//     setData([]);

//     try {
//       const formData = new FormData();
//       formData.append('name', input);

//       const response = await axios.post(
//         'https://argosmob.uk/uaw-auto/public/api/v1/product/product-name',
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

//   const ProductCard = ({product, navigation, products}) => {
//     return (
//       <TouchableOpacity
//         onPress={() =>
//           navigation.navigate('Search Product Des', {
//             product,
//             products: products, // current list of products
//             index: products.findIndex(p => p.id === product.id),
//           })
//         }
//         style={styles.card}>
//         <View style={styles.imageContainer}>
//           <Image
//             source={{
//               uri: product.image_path
//                 ? `https://argosmob.uk/uaw-auto/public/${product?.image_path}`
//                 : 'https://imgs.search.brave.com/K7TdjciLTAmvqtg6-fqKm20muPAAzRMj1OonJ6HIhME/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg5LzU1LzE1/LzM2MF9GXzg5NTUx/NTk2X0xkSEFaUnd6/M2k0RU00SjBOSE5I/eTJoRVVZRGZYYzBq/LmpwZw',
//             }}
//             style={styles.image}
//           />
//         </View>
//         <View style={styles.detailsContainer}>
//           <View style={{flexDirection: 'row',flexWrap:'wrap',maxWidth:'80%'}}>
//             <Text style={styles.title}>Product name : </Text>

//             <Text style={styles.value}>{product?.name}</Text>
//           </View>
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
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Enter Product Name</Text>
//       <TextInput
//         style={styles.input}
//         value={input}
//         onChangeText={setInput}
//         placeholder="Type here..."
//         placeholderTextColor="black"
//       />
//       <TouchableOpacity
//         style={styles.button}
//         onPress={fetchOEMData}
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
//           renderItem={({item}) => (
//             // <ProductCard product={item} navigation={navigation} />
//             <ProductCard
//               product={item}
//               navigation={navigation}
//               products={data}
//             />
//           )}
//           ListEmptyComponent={
//             !loading && <Text style={styles.noData}>No products found.</Text>
//           }
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFD580',
//     padding: 20,
//   },
//   label: {
//     fontSize: 16,
//     color: 'black',
//     marginBottom: 5,
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderBottomColor: 'black',
//     fontSize: 16,
//     color: '#333',
//     height: 60,
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: 'black',
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: '#FFD580',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   error: {
//     color: 'red',
//     marginBottom: 10,
//   },
//   item: {
//     backgroundColor: '#FFF',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   itemText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   noData: {
//     fontSize: 16,
//     color: '',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   itemImage: {
//     width: '100%',
//     height: 150,
//     resizeMode: 'contain',
//     marginBottom: 10,
//   },
//   //card styling

//   listContainer: {
//     padding: 10,
//     justifyContent: 'space-between',
//   },
//   card: {
//     flexDirection: 'row',
//     backgroundColor: '#FFD580',
//     borderRadius: 8,
//     elevation: 2,
//     marginBottom: 15,
//     padding: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: {width: 0, height: 2},
//     shadowRadius: 4,
//   },
//   imageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 25,
//     backgroundColor: '#f0f0f0',
//   },
//   detailsContainer: {
//     // flex: 1,
//     // justifyContent:'space-between'
//   },
//   title: {
//     fontSize: 14,
//     color: 'black',
//     fontWeight: 'bold',
//   },
//   value: {
//     // flex:1,
//     // maxWidth:'80%',
//     flexWrap: 'wrap',
//     fontSize: 14,
//     color: 'black',
//     marginBottom: 8,
//   },
// });

// export default SearchByORM;







import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {debounce} from 'lodash';

const SearchByORM = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounce the search function to avoid too many API calls
  const debouncedSearch = debounce(async (searchTerm) => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('name', searchTerm);

      const response = await axios.post(
        'https://argosmob.uk/uaw-auto/public/api/v1/product/product-name',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.data.status && response.data.products) {
        setSuggestions(response.data.products);
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      setError('Failed to fetch suggestions. Please try again.');
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, 500); // 500ms delay

  useEffect(() => {
    debouncedSearch(input);
    // Cleanup
    return () => debouncedSearch.cancel();
  }, [input]);

  const fetchOEMData = async () => {
    setLoading(true);
    setError(null);
    setShowSuggestions(false);

    try {
      const formData = new FormData();
      formData.append('name', input);

      const response = await axios.post(
        'https://argosmob.uk/uaw-auto/public/api/v1/product/product-name',
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
        setData([]);
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionSelect = (item) => {
    setInput(item.name);
    setShowSuggestions(false);
    setData([item]); // Show the selected item in the results
  };

  const ProductCard = ({product, navigation, products}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Search Product Des', {
            product,
            products: products,
            index: products.findIndex(p => p.id === product.id),
          })
        }
        style={styles.card}>
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
          <View style={{flexDirection: 'row', flexWrap: 'wrap', maxWidth: '80%'}}>
            <Text style={styles.title}>Product name : </Text>
            <Text style={styles.value}>{product?.name}</Text>
          </View>
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
        </View>
      </TouchableOpacity>
    );
  };

  const SuggestionItem = ({item, onPress}) => {
    return (
      <TouchableOpacity
        style={styles.suggestionItem}
        onPress={() => onPress(item)}>
        <Text style={styles.suggestionText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Product Name</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={(text) => {
            setInput(text);
            setShowSuggestions(true);
          }}
          placeholder="Type here..."
          placeholderTextColor="black"
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        {showSuggestions && suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => (
                <SuggestionItem
                  item={item}
                  onPress={handleSuggestionSelect}
                />
              )}
              keyboardShouldPersistTaps="always"
            />
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={fetchOEMData}
        disabled={loading || input.trim() === ''}>
        <Text style={styles.buttonText}>
          {loading ? 'Loading...' : 'Search'}
        </Text>
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#00AEEF" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <ProductCard
              product={item}
              navigation={navigation}
              products={data}
            />
          )}
          ListEmptyComponent={
            !loading && !showSuggestions && (
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
  searchContainer: {
    position: 'relative',
    zIndex: 1,
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
    color: '#333',
    height: 60,
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
    textAlign: 'center',
  },
  noData: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
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
    backgroundColor: '#f0f0f0',
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  value: {
    flexWrap: 'wrap',
    fontSize: 14,
    color: 'black',
    marginBottom: 8,
  },
  // Suggestions styling
  suggestionsContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#FFD580',
    borderRadius: 5,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    zIndex: 100,
    elevation: 3,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionText: {
    fontSize: 14,
    color: 'black',
  },
});

export default SearchByORM;