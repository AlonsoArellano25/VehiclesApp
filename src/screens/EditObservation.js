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

export default function EditObservation({route, navigation}) {
  const {observation, index} = route.params;
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});

  const edit = async () => {
    let errors = {};
    if (!formData.observacion) {
      errors.observacion = true;
    } else {
      const dbRef = db.collection('observations').doc(observation.id);
      await dbRef.set({
        creado_por: observation.creado_por,
        idestado: observation.idestado,
        idvehiculo: observation.idvehiculo,
        observacion: formData.observacion,
        resuelto_por: observation.resuelto_por,
      });
      navigation.goBack();
    }

    setFormError(errors);
  };

  return (
    <View style={styles.background}>
      <View style={styles.view}>
        <Text style={styles.title}>Edición: Observación {index + 1} </Text>
        <TextInput
          style={[styles.input, formError.observacion && styles.error]}
          onChange={(e) =>
            setFormData({...formData, observacion: e.nativeEvent.text})
          }
        />
        <TouchableOpacity style={styles.edit} onPress={edit}>
          <Text style={styles.editText}>Editar</Text>
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
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    color: '#000',
    width: '100%',
    marginBottom: 25,
    fontSize: 16,
    borderWidth: 0.5,
    borderColor: '#1e3040',
  },
  error: {
    borderColor: 'red',
  },
  edit: {
    borderWidth: 0.5,
    alignSelf: 'center',
    borderRadius: 10,
    width: '60%',
  },
  editText: {
    color: '#000',
    fontSize: 18,
    paddingVertical: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
