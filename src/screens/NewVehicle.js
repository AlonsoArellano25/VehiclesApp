import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firebase from '../utils/firebase';
import 'firebase/firestore';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);
export default function NewVehicle({navigation}) {
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});

  const register = async () => {
    let errors = {};
    if (!formData.vim) {
      errors.vim = true;
    } else {
      await db.collection('vehicles').add({
        vim: formData.vim,
      });
      navigation.goBack();
    }

    setFormError(errors);
  };
  return (
    <View style={styles.background}>
      <View style={styles.view}>
        <Text style={styles.title}>Creación</Text>
        <Text style={styles.text}>VIM</Text>
        <TextInput
          style={[styles.input, formError.vim && styles.error]}
          onChange={(e) => setFormData({...formData, vim: e.nativeEvent.text})}
        />
        <TouchableOpacity style={styles.login} onPress={register}>
          <Text style={styles.loginText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function defaultValue() {
  return {
    vim: '',
  };
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
    flex: 1,
  },
  view: {
    backgroundColor: '#fff',
    width: '80%',
    alignSelf: 'center',
    paddingTop: 10,
  },
  input: {
    height: 40,
    color: '#000',
    width: '90%',
    marginBottom: 25,
    fontSize: 16,
    borderWidth: 0.5,
    borderColor: '#1e3040',
  },
  login: {
    borderWidth: 0.5,
    alignSelf: 'center',
    borderRadius: 10,
    width: '60%',
  },
  loginText: {
    color: '#000',
    fontSize: 18,
    paddingVertical: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    marginBottom: 20,
    fontSize: 16,
  },
  error: {
    borderColor: 'red',
  },
});
