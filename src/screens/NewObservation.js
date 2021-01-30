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
import {useSelector, useDispatch} from 'react-redux';
import {addObservation} from '../store/actions';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

export default function NewObservation({route, navigation}) {
  const {vim} = route.params;
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});
  const data = useSelector((state) => state);
  const [userID, setUserID] = useState('');
  const {usuario} = data;
  const dispatch = useDispatch();

  firebase.auth().onAuthStateChanged((user) => {
    setUserID(user.uid);
  });

  const register = async () => {
    let errors = {};
    if (!formData.observacion) {
      errors.observacion = true;
    } else {
      await db.collection('observations').add({
        observacion: formData.observacion,
        idestado: 1,
        idvehiculo: vim.vim,
        creado_por: usuario,
        resuelto_por: null,
      });

      db.collection(userID)
        .add({
          usuario: usuario,
        })
        .then(() => {
          console.log('OK');
        });

      dispatch(addObservation());
      navigation.navigate('Observaciones', {screen: 'observation'});
      navigation.goBack();
    }

    setFormError(errors);
  };

  return (
    <View style={styles.background}>
      <View style={styles.view}>
        <Text style={styles.title}>Agregar observación</Text>
        <Text style={styles.text}>VIM: {vim.vim}</Text>
        <Text style={styles.text}>observación</Text>
        <TextInput
          style={[styles.input, formError.observacion && styles.error]}
          onChange={(e) =>
            setFormData({...formData, observacion: e.nativeEvent.text})
          }
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
    observacion: '',
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
    height: 120,
    color: '#000',
    width: '100%',
    marginBottom: 25,
    fontSize: 16,
    borderWidth: 0.5,
    borderColor: '#1e3040',
    paddingVertical: 50,
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
    fontSize: 16,
    marginBottom: 20,
  },
  title: {
    marginBottom: 20,
    fontSize: 16,
  },
  error: {
    borderColor: 'red',
  },
});
