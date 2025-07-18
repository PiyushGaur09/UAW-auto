import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-reanimated-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchData = [
  {
    id: 1,
    name: 'Search By Category',
    icon: <Icon name="settings" size={80} color={'black'} />,
    navigateTo: 'Search By Product',
  },
  {
    id: 2,
    name: 'Search By Vechile',
    icon: <Icon name="design-services" size={80} color={'black'} />,
    navigateTo: 'Search By Dimension',
  },
  {
    id: 3,
    name: 'Search By Product Name',
    icon: <Icon name="content-paste-search" size={80} color={'black'} />,
    navigateTo: 'OEM Search',
  },
  {
    id: 4,
    name: 'Search By Parts Number',
    icon: <Icon name="person-search" size={80} color={'black'} />,
    navigateTo: 'Parts Search',
  },
  {
    id: 5,
    name: 'Contacts Us',
    icon: <Icon name="phone-in-talk" size={80} color={'black'} />,
    navigateTo: 'Contact Us',
  },
  {
    id: 6,
    name: 'Bulk Order',
    icon: <Icon name="shopping-basket" size={80} color={'black'} />,
    navigateTo: 'Bulk Order',
  },
];

const Home = () => {
  const navigation = useNavigation();
  const {width} = Dimensions.get('window');

  const [bannerData, setBannerData] = useState(null);
  const [name, setName] = useState('');
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([fetchBannerData(), getUserData()]).finally(() =>
      setRefreshing(false),
    );
  }, []);

  // console.log('UserData22', userData);

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      setUserData(userData);
      if (userData) {
        const parsedData = JSON.parse(userData);
        setName(parsedData.name);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchBannerData = async () => {
    try {
      const response = await axios.get(
        'https://argosmob.uk/uaw-auto/public/api/v1/banner/all',
      );
      if (response.data && response.data.status) {
        setBannerData(response.data);
      }
    } catch (error) {
      console.error('API fetch error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Refresh data whenever screen comes into focus
      fetchBannerData();
      getUserData();

      const onBackPress = () => {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Exit', onPress: () => BackHandler.exitApp()},
          ],
          {cancelable: false},
        );
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  useEffect(() => {
    // Set up polling for regular updates
    const intervalId = setInterval(fetchBannerData, 300000); // 5 minutes

    return () => clearInterval(intervalId);
  }, []);

  // const fetchBannerData = async () => {
  //   try {
  //     const response = await axios.get(
  //       'https://argosmob.uk/uaw-auto/public/api/v1/banner/all',
  //     );
  //     if (response.data && response.data.status) {
  //       setBannerData(response.data);
  //     }
  //   } catch (error) {
  //     console.error('API fetch error:', error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useFocusEffect(
  //   useCallback(() => {
  //     const onBackPress = () => {
  //       Alert.alert(
  //         'Exit App',
  //         'Are you sure you want to exit?',
  //         [
  //           {text: 'Cancel', style: 'cancel'},
  //           {text: 'Exit', onPress: () => BackHandler.exitApp()},
  //         ],
  //         {cancelable: false},
  //       );
  //       return true; // Prevent default back button behavior
  //     };

  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);

  //     return () =>
  //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //   }, []),
  // );

  useEffect(() => {
    fetchBannerData();
    getUserData();
  }, []);

  const renderSearch = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(item.navigateTo)}
        style={styles.companyContainer}>
        {item.icon}
        <Text style={styles.companyName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{paddingHorizontal: 10}}
      onPress={() => {
        navigation.navigate('Web Screen', {
          link: item.link,
        });
      }}>
      <Image
        style={styles.bannerImage}
        source={{
          uri: item.image_path
            ? `https://argosmob.uk/uaw-auto/public/${item.image_path}`
            : 'https://via.placeholder.com/300',
        }}
      />
    </TouchableOpacity>
  );

  const TopComponent = ({name}) => {
    return (
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Welcome, {name || 'Guest'}</Text>
        </View>
        {bannerData?.banners?.length > 0 && (
          <View style={styles.carouselContainer}>
            <Carousel
              loop
              width={width * 0.92}
              height={200}
              autoPlay={true}
              data={bannerData.banners}
              scrollAnimationDuration={3000}
              renderItem={renderItem}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={SearchData}
        renderItem={renderSearch}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.companyFlatlist}
        ListHeaderComponent={<TopComponent name={name} />}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

// Styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD580',
  },
  headerContainer: {
    height: 50,
    backgroundColor: '#FFD580',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: 'black',
  },
  carouselContainer: {
    marginVertical: 10,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  companyFlatlist: {
    paddingHorizontal: 15,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  companyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    padding: 15,
    backgroundColor: '#FFD580',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: Dimensions.get('window').width / 2 - 30,
  },
  companyName: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Home;
