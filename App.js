import {SafeAreaView} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import RootNavigation from './src/Navigation/RootNavigation';
import store from './src/Redux/Store';
import Graph from './src/Screens/Graph';
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <RootNavigation />
        {/* <RegistrationForm/> */}
        {/* <Graph /> */}
      </SafeAreaView>
    </Provider>
  );
};

export default App;
