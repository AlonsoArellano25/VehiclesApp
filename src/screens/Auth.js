import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Logo from '../assets/logo.jpg';
import Login from './Login';
import Register from './Register';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const changeForm = () => {
    setIsLogin(!isLogin);
  };
  return (
    <View style={styles.view}>
      <Image style={styles.logo} source={Logo} />
      {isLogin ? (
        <Login changeForm={changeForm} />
      ) : (
        <Register changeForm={changeForm} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    height: 200,
    marginTop: 50,
    marginBottom: 50,
  },
});
