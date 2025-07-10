// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   FlatList,
//   Image,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import axios from 'axios';
// import {useNavigation} from '@react-navigation/native';

// const SearchByDimension = () => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);
//   const [productId, setProductId] = useState('');
//   const [allProduct, setAllProduct] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   // console.log('ALL PRODUCT', allProduct);

//   const [productItems, setProductItems] = useState([]);
//   const [productValue, setProductValue] = useState(null);
//   const [openProducts, setOpenProducts] = useState(false);

//   // Additional dropdown states
//   const [openSeries, setOpenSeries] = useState(false);
//   const [seriesAndCrossItems, setSeriesAndCrossItems] = useState([]);
//   const [seriesAndCrossValue, setSeriesAndCrossValue] = useState(null);
//   // console.log('seriesAndCrossValue', seriesAndCrossValue);

//   const [openTeeth, setOpenTeeth] = useState(false);
//   const [noOfTeethItems, setNoOfTeethItems] = useState([]);
//   const [noOfTeethValue, setNoOfTeethValue] = useState(null);
//   // console.log('noOfTeethValue', noOfTeethValue);

//   const [openTotalLength, setOpenTotalLength] = useState(false);
//   const [totalLengthInchItems, setTotalLengthInchItems] = useState([]);
//   const [totalLengthInchValue, setTotalLengthInchValue] = useState(null);
//   // console.log('totalLengthInchValue', totalLengthInchValue);

//   const [openLengthInch, setOpenLengthInch] = useState(false);
//   const [lengthInchItems, setLengthInchItems] = useState([]);
//   const [lengthInchValue, setLengthInchValue] = useState(null);
//   // console.log('lengthInchValue', lengthInchValue);

//   const [openVehicle, setOpenVehicle] = useState(false);
//   const [vehicleItems, setVehicleItems] = useState([]);
//   const [vehicleValue, setVehicleValue] = useState(null);
//   // console.log('vehicleValue', vehicleValue);

//   // console.log('Rpppp', productItems);

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append('product_id', productId);

//       const response = await axios.post(
//         'https://argosmob.uk/uaw-auto/public/api/v1/product/filter-product',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         },
//       );

//       if (response.data?.response) {
//         const {
//           products,
//           series_and_cross,
//           no_of_teeth,
//           total_length_inch,
//           length_inch,
//           vehicle,
//           product,
//         } = response.data.response;

//         setAllProduct(product);
//         setFilteredProducts(product);
//         // Populate product dropdown
//         if (Array.isArray(products)) {
//           // console.log(products);

//           const productOptions = products.map(item => ({
//             label: item.name, // Assuming `name` is the property to display
//             value: item.id, // Assuming `id` is the unique value to use
//           }));
//           setProductItems(productOptions);
//           // console.log('Mapped Products:', productOptions); // Log the mapped products

//           // Set the first product as default
//           // if (!productValue && productOptions.length > 0) {
//           //   setProductValue(productOptions[0].value);
//           //   setProductId(productOptions[0].value);
//           // }
//         }

//         // Populate additional dropdowns
//         if (productId) {
//           if (Array.isArray(series_and_cross)) {
//             setSeriesAndCrossItems(
//               series_and_cross.map(item => ({
//                 label: item,
//                 value: item,
//               })),
//             );
//           }
//           if (Array.isArray(no_of_teeth)) {
//             setNoOfTeethItems(
//               no_of_teeth.map(item => ({
//                 label: item,
//                 value: item,
//               })),
//             );
//           }
//           if (Array.isArray(total_length_inch)) {
//             setTotalLengthInchItems(
//               total_length_inch.map(item => ({
//                 label: item,
//                 value: item,
//               })),
//             );
//           }
//           if (Array.isArray(length_inch)) {
//             setLengthInchItems(
//               length_inch.map(item => ({
//                 label: item,
//                 value: item,
//               })),
//             );
//           }
//           if (Array.isArray(vehicle)) {
//             setVehicleItems(
//               vehicle.map(item => ({
//                 label: item,
//                 value: item,
//               })),
//             );
//           }
//         }
//       } else {
//         Alert.alert('Error', 'Failed to fetch data');
//       }
//     } catch (error) {
//       console.error('API Error:', error.message);
//       Alert.alert('Error', 'Failed to fetch products. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [productId]);

//   useEffect(() => {
//     if (!allProduct || allProduct.length === 0) {
//       console.log('No products available for filtering.');
//       setFilteredProducts([]);
//       return;
//     }
//     if (seriesAndCrossValue) {
//       const filtered = allProduct.filter(product =>
//         product.series_and_cross?.includes(seriesAndCrossValue),
//       );

//       setFilteredProducts(filtered);
//     }

//     if (noOfTeethValue) {
//       const filtered = allProduct.filter(product =>
//         product.no_of_teeth?.includes(noOfTeethValue),
//       );

//       setFilteredProducts(filtered);
//     }

//     if (totalLengthInchValue) {
//       const filtered = allProduct.filter(product =>
//         product.total_length_inch?.includes(totalLengthInchValue),
//       );

//       setFilteredProducts(filtered);
//     }

//     if (lengthInchValue) {
//       const filtered = allProduct.filter(product =>
//         product.length_inch?.includes(lengthInchValue),
//       );

//       setFilteredProducts(filtered);
//     }

//     if (vehicleValue) {
//       const filtered = allProduct.filter(product =>
//         product.vehicle?.includes(vehicleValue),
//       );

//       setFilteredProducts(filtered);
//     }

//     // console.log('Filtered Products:', filteredProducts);
//     // setFilteredProducts(filteredProducts);
//   }, [
//     seriesAndCrossValue,
//     noOfTeethValue,
//     totalLengthInchValue,
//     lengthInchValue,
//     vehicleValue,
//     allProduct,
//   ]);

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#007BFF" />
//       </View>
//     );
//   }

//   const ProductCard = ({product, navigation, products}) => {
//     // console.log('44444', product);
//     return (
//       <TouchableOpacity
//         onPress={() => {
//           // navigation.navigate('Search Product Des', {product});
//           navigation.navigate('Search Product Des', {
//             product,
//             products: products, // current list of products
//             index: products.findIndex(p => p.id === product.id),
//           });
//         }}
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
//     // <ScrollView
//     //   showsVerticalScrollIndicator={false}
//     //   // nestedScrollEnabled={true}
//     //   style={{flex: 1}}
//     //   contentContainerStyle={{flexGrow: 1}}>
//     //   <View style={styles.container}>

        
//         {/* Always show product dropdown */}
//         {/* <Text style={styles.label}>Product</Text>
//         <DropDownPicker
//           open={openProducts}
//           value={productValue}
//           items={productItems}
//           setOpen={setOpenProducts}
//           setValue={setProductValue}
//           placeholder="Select Product"
//           style={styles.dropdown}
//           dropDownContainerStyle={[styles.dropdownContainer, {zIndex: 10000}]}
//           onChangeValue={value => setProductId(value)}
//           listMode="SCROLLVIEW" // or "FLATLIST"
//         /> */}

//         {/* Conditionally render additional dropdowns if productId is not empty */}
//         // {productId !== '' && (
//           <>
//             {/* <Text style={styles.label}>Series & Cross</Text>
//             <DropDownPicker
//               open={openSeries}
//               setOpen={setOpenSeries}
//               value={seriesAndCrossValue}
//               items={seriesAndCrossItems}
//               setValue={setSeriesAndCrossValue}
//               placeholder="Select Series & Cross"
//               style={styles.dropdown}
//               dropDownContainerStyle={styles.dropdownContainer}
//             /> */}

//             {/* <Text style={styles.label}>No. Of Teeth</Text>
//             <DropDownPicker
//               open={openTeeth}
//               setOpen={setOpenTeeth}
//               value={noOfTeethValue}
//               items={noOfTeethItems}
//               setValue={setNoOfTeethValue}
//               placeholder="Select No. Of Teeth"
//               style={styles.dropdown}
//               dropDownContainerStyle={styles.dropdownContainer}
//             /> */}

//             {/* <Text style={styles.label}>Total Length (Inch)</Text>
//             <DropDownPicker
//               open={openTotalLength}
//               setOpen={setOpenTotalLength}
//               value={totalLengthInchValue}
//               items={totalLengthInchItems}
//               setValue={setTotalLengthInchValue}
//               placeholder="Select Total Length (Inch)"
//               style={styles.dropdown}
//               dropDownContainerStyle={styles.dropdownContainer}
//             /> */}

//             {/* <Text style={styles.label}>Length (Inch)</Text>
//             <DropDownPicker
//               open={openLengthInch}
//               setOpen={setOpenLengthInch}
//               value={lengthInchValue}
//               items={lengthInchItems}
//               setValue={setLengthInchValue}
//               placeholder="Select Length (Inch)"
//               style={styles.dropdown}
//               dropDownContainerStyle={styles.dropdownContainer}
//             /> */}

//             {/* <Text style={styles.label}>Vehicle</Text>
//             <DropDownPicker
//               open={openVehicle}
//               setOpen={setOpenVehicle}
//               value={vehicleValue}
//               items={vehicleItems}
//               setValue={setVehicleValue}
//               placeholder="Select Vehicle"
//               style={styles.dropdown}
//               dropDownContainerStyle={styles.dropdownContainer}
//             /> */}
//           {/* </> */}
//         )}

//         {/* Updated FlatList */}
//         <FlatList
//           data={filteredProducts}
//           renderItem={({item}) => (
//             <ProductCard
//               product={item}
//               navigation={navigation}
//               products={filteredProducts}
//             />
//           )}
//           keyExtractor={item => item.id.toString()}
//           nestedScrollEnabled={true}
//           contentContainerStyle={styles.listContainer}
//         />
//       </View>
//     </ScrollView>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#FFD580',
//   },
//   label: {
//     fontSize: 16,
//     color: 'black',
//     marginBottom: 10,
//   },
//   dropdown: {
//     backgroundColor: '#FFD580',
//     borderColor: 'black',
//     borderRadius: 5,
//     marginBottom: 20,
//     height: 50,
//   },
//   dropdownContainer: {
//     backgroundColor: '#FFD580',
//     borderColor: 'black',
//     zIndex: 10000,
//     maxHeight: 200,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   //flatlist Styling
//   listContainer: {
//     padding: 10,
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
//     shadowOffset: {width: 0, height: 5},
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
//     backgroundColor: '#FFD580',
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
//     fontSize: 14,
//     color: 'black',
//     marginBottom: 8,
//   },
// });

// export default SearchByDimension;



import React, {useState} from 'react';
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

const SearchByDimension = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // console.log("data",data)

  const fetchOEMData = async () => {
    setLoading(true);
    setError(null);
    setData([]);

    try {
      const formData = new FormData();
      formData.append('vehicle', input);

      const response = await axios.post(
        'https://argosmob.uk/uaw-auto/public/api/v1/product/by-vehicle-name',
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

  const ProductCard = ({product, navigation, products}) => {
    return (
      <TouchableOpacity
        onPress={() =>
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
                ? `https://argosmob.uk/uaw-auto/public/${product?.image_path}`
                : 'https://imgs.search.brave.com/K7TdjciLTAmvqtg6-fqKm20muPAAzRMj1OonJ6HIhME/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg5LzU1LzE1/LzM2MF9GXzg5NTUx/NTk2X0xkSEFaUnd6/M2k0RU00SjBOSE5I/eTJoRVVZRGZYYzBq/LmpwZw',
            }}
            // {{
            //   uri: `https://argosmob.uk/uaw-auto/public/${product?.image_path}`,
            // }} // Replace with an actual image path
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
          <View style={{flexDirection: 'row',flexWrap:'wrap',maxWidth:'90%'}}>
            <Text style={styles.title}>Vehicle : </Text>
            <Text style={styles.value}>{product.vehicle}</Text>
          </View>
          {/* <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>vehicle : </Text>
            <Text style={styles.value}>{product.vehicle}</Text>
          </View> */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Vehicle Name</Text>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type here..."
        placeholderTextColor="black"
      />
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
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            // <ProductCard product={item} navigation={navigation} />
            <ProductCard
              product={item}
              navigation={navigation}
              products={data}
            />
          )}
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
  noData: {
    fontSize: 16,
    color: '',
    textAlign: 'center',
    marginTop: 20,
  },
  itemImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  //card styling

  listContainer: {
    padding: 10,
    justifyContent: 'space-between',
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
    // flex: 1,
    // justifyContent:'space-between'
  },
  title: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  value: {
    flexWrap:'wrap',
    fontSize: 14,
    color: 'black',
    marginBottom: 8,
  },
});

export default SearchByDimension;
