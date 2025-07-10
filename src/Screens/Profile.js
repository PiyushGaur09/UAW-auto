import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');

  // const user = useSelector(state => state?.user?.user);

  // console.log('Image', image);

  // const handleOpenCamera = async () => {
  //   await ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   }).then(image => {
  //     console.log(image);
  //     setImage(image.path);
  //     setModalVisible(false);
  //   });
  // };

  const handleOpenCamera = async () => {
    await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage(image.path);
      uploadProfilePicture(image.path);
      setModalVisible(false);
    });
  };

  // const handleOpenGallery = async () => {
  //   await ImagePicker.openPicker({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   }).then(image => {
  //     console.log(image);
  //     setImage(image);
  //     setModalVisible(false);
  //   });
  // };

  const handleOpenGallery = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage(image.path);
      uploadProfilePicture(image.path);
      setModalVisible(false);
    });
  };

  const uploadProfilePicture = async imagePath => {
    const formData = new FormData();
    formData.append('user_id', userId); // Assuming userId is already set
    formData.append('profile', {
      uri: imagePath,
      type: 'image/jpeg', // Adjust type based on the actual image format
      name: 'profile.jpg', // Provide a suitable name for the file
    });

    try {
      const response = await fetch(
        'https://argosmob.uk/uaw-auto/public/api/v1/user/update-profile/picture',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Profile picture updated successfully.');
      } else {
        Alert.alert(
          'Error',
          result.message || 'Failed to update profile picture.',
        );
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      Alert.alert(
        'Error',
        'An error occurred while uploading the profile picture.',
      );
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      // dispatch(clearUser());
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  };

  // console.log(image);

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        // setUserData(userData);
        // console.log(userData);
        const parsedData = JSON.parse(userData); // Parse JSON string
        setName(parsedData.name); // Access and set the name
        setEmail(parsedData.email);
        setPhone(parsedData.phone);
        setUserId(parsedData.id);
        // console.log('User Data:', JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.imageContainer}>
          <Image
            source={{
              uri:
                image ||
                'https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg',
            }}
            style={styles.profileImage}
          />
          <View style={styles.iconContainer}>
            <Icon name="pencil" size={24} color="#FFF" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.optionsContainer}>
        <Component icon="person-outline" label={name} />
        <Component icon="call-outline" label={phone} />
        <Option
          icon="document-lock-outline"
          label="Update Password"
          onPress={() =>
            navigation.navigate('Reset Password', {userName: name})
          }
        />
        <Option
          icon="bag-handle-outline"
          label="Order History"
          onPress={() => navigation.navigate('Order History', {id: userId})}
        />

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleOpenCamera}>
                <Text style={styles.modalButtonText}>Open Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleOpenGallery}>
                <Text style={styles.modalButtonText}>Open Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => handleLogout()}>
        <Icon
          name="log-out-outline"
          size={20}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const Option = ({icon, label, onPress}) => {
  return (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <Icon name={icon} size={24} color="black" style={styles.icon} />
      <Text style={styles.optionText}>{label}</Text>
      <Icon name="chevron-forward" size={20} color="black" />
    </TouchableOpacity>
  );
};

const Component = ({icon, label}) => {
  return (
    <View style={styles.option}>
      <Icon name={icon} size={24} color="black" style={styles.icon} />
      <Text style={styles.optionText}>{label}</Text>
      {/* <Icon name="chevron-forward" size={20} color="#999" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD580',
    padding: 15,
  },
  header: {
    backgroundColor: '#FFD580',
    alignItems: 'center',
    paddingVertical: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: 'black',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  email: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  optionsContainer: {
    marginTop: 20,
    backgroundColor: '#FFD580',
    borderTopWidth: 1,
    borderTopColor: 'black',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  optionText: {
    fontSize: 16,
    color: 'black',
    flex: 1,
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4D4D',
    margin: 20,
    paddingVertical: 15,
    borderRadius: 8,
  },
  logoutText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  //Modal Styles

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 8,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FF6347',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: '#007BFF',
    borderRadius: 15,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Profile;
