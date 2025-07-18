import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const {height, width} = Dimensions.get('window');

  const navigation = useNavigation();

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          // Navigate to Home if user data exists
          navigation.replace('Main');
        } else {
          // Navigate to Login if no user data
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error checking user data:', error);
        navigation.navigate('Login'); // Navigate to Login in case of an error
      }
    };

    const timeoutId = setTimeout(checkUserData, 3000);

    return () => clearTimeout(timeoutId);
  }, [navigation]);
  return (
    // <ImageBackground
    //   source={{ uri: 'https://via.placeholder.com/300x600' }} // Replace with your background image URL or import locally
    //   style={styles.background}
    // >
    <View style={styles.background}>
      {/* <View style={styles.logoContainer}>
        <Image
          source={require('../Assests/logoWork1.png')} // Replace with your logo image URL or import locally
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.footerText}>Scaling New Heights</Text>
      </View> */}

      <View style={styles.productsContainer}>
        <Image
          style={[
            styles.productImage,
            {width: width, height: height *0.9},
          ]}
          source={require('../Assests/SplashImage.jpeg')}
        />
      </View>

      {/* <View style={styles.footer}>
        <Text style={styles.footerText}>TRUST OF EXPERIENCE</Text>
        <Text style={styles.footerText}>TRUST IN PERFORMANCE</Text>
      </View> */}
    </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFD580',
    paddingVertical: 30,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 60,
    // marginBottom: 10,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 5,
  },
  productsContainer: {
    alignItems: 'center',
    // marginVertical: 20,
  },
  productImage: {
    borderRadius: 10,
    resizeMode: 'stretch', // Ensures the image doesn't stretch
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
});

export default Splash;
