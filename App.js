import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import firebase from './src/utils/firebase';
import 'firebase/auth';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaView, StyleSheet} from 'react-native';
import Auth from './src/screens/Auth';
import {decode, encode} from 'base-64';
import {store} from './src/store/store';
import {Provider as ReducerProvider} from 'react-redux';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

export default function App() {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
    });
  }, []);
  if (user === undefined) {
    return null;
  }
  return (
    <NavigationContainer>
      <ReducerProvider store={store}>
        <PaperProvider>
          <SafeAreaView style={styles.background}>
            {user ? <Navigation user={user} /> : <Auth />}
          </SafeAreaView>
        </PaperProvider>
      </ReducerProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
  },
});
