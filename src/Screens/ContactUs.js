import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ContactUs = () => {
  const phoneNumbers = [
    {
      id: 1,
      number: '9814061050',
    },
    {
      id: 2,
      number: '9888763501',
    },
    {
      id: 3,
      number: '9814164501',
    },
    {
      id: 4,
      number: '9876500522',
    },
    {
      id: 5,
      number: '9193800027',
    },
  ];

  const handleAddressPress = () => {
    const address = '44, Industrial Area, Phagwara - 144401 (PB)';

    // Create a URL for the maps app
    const url = Platform.select({
      ios: `maps:0,0?q=${encodeURIComponent(address)}`,
      android: `geo:0,0?q=${encodeURIComponent(address)}`,
    });

    Linking.openURL(url).catch(err => {
      // Fallback to web if native app fails
      const webUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        address,
      )}`;
      Linking.openURL(webUrl).catch(err =>
        console.error('Failed to open maps:', err),
      );
    });
  };

  const handleEmailPress = () => {
    const email = 'uaw@uawauto.com';
    const subject = 'Inquiry';
    const body = 'Hello,\n\nI would like to ask about...';

    const url = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(url).catch(err =>
      console.error('Failed to open email client:', err),
    );
  };

  const handleDialPress = phoneNumber => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log('Phone dialer is not supported on this device.');
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleDialPress(item.number)}>
      <Text style={styles.cardText}>{item.number}</Text>
    </TouchableOpacity>
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contact Us</Text>

      {/* Regd. Office Card */}
      <TouchableOpacity onPress={handleAddressPress}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="business" size={24} color="black" />
            <Text style={styles.cardTitle}>Regd. Office</Text>
          </View>
          <Text style={[styles.cardText, styles.clickableText]}>
            UAW AUTO PARTS (P) LTD. {'\n'}
            44, Industrial Area, Phagwara - 144401 (PB)
          </Text>
        </View>
      </TouchableOpacity>

      {/* E-mail Card */}
      <TouchableOpacity onPress={handleEmailPress}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="email" size={24} color="black" />
            <Text style={styles.cardTitle}>E-mail</Text>
          </View>
          <Text style={[styles.cardText, styles.clickableText]}>
            uaw@uawauto.com
          </Text>
        </View>
      </TouchableOpacity>

      {/* Contact (Domestic) Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="phone" size={24} color="black" />
          <Text style={styles.cardTitle}>Contact (Domestic)</Text>
        </View>
        <FlatList
          data={phoneNumbers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>

      {/* Contact (Export) Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="language" size={24} color="black" />
          <Text style={styles.cardTitle}>Contact (Export)</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleDialPress('9814000997');
          }}
          style={styles.cardText}>
          <Text style={styles.clickableText}>9814000997</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFD580',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFD580',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    marginLeft: 10,
  },
  cardText: {
    fontSize: 16,
    color: 'black',
    lineHeight: 24,
  },
  clickableText: {
    color: 'blue', // or your theme color
    textDecorationLine: 'underline',
  },
});

export default ContactUs;
