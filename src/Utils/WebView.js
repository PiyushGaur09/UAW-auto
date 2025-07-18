import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const WebViewScreen = ({route}) => {
  const {link} = route.params; 
  // console.log("llll",link)

  return (
    <View style={styles.container}>
      <WebView source={{uri: link}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewScreen;
