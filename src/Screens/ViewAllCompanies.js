import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const ViewAllCompanies = ({route}) => {
  const navigation = useNavigation();
  const companies = route.params.companies;

  const renderCompany = ({item}) => {
    // console.log('itemLogo', item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Product List', {name: item.name})}
        style={styles.companyContainer}>
        <Image
          source={{
            uri: item.image_path
              ? `https://argosmob.uk/uaw-auto/public/${item.image_path}`
              : 'https://imgs.search.brave.com/K7TdjciLTAmvqtg6-fqKm20muPAAzRMj1OonJ6HIhME/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzg5LzU1LzE1/LzM2MF9GXzg5NTUx/NTk2X0xkSEFaUnd6/M2k0RU00SjBOSE5I/eTJoRVVZRGZYYzBq/LmpwZw',
          }}
          style={[styles.companyLogo]}
        />
        <Text style={styles.companyName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      {/* <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>All Companies</Text>
      </View> */}
      <FlatList
        data={companies}
        renderItem={renderCompany}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.companyFlatlist}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 15,
    marginVertical: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 15,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  categoryFlatlist: {
    paddingHorizontal: 10,
  },
  categoryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    padding: 10,
  },
  iconWrapper: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 50,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
    textAlign: 'center',
  },
  companyFlatlist: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBlock: 50,
  },
  companyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  companyLogo: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  companyName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  headerContainer: {
    height: 50,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#007BFF',
  },

  carouselContainer: {
    marginVertical: 20,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
export default ViewAllCompanies;
