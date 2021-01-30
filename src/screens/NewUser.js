import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {validateEmail} from '../utils/validations';
import firebase from '../utils/firebase';
import {useDispatch} from 'react-redux';
import {addUser} from '../store/actions';

export default function NewUser({navigation}) {
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});
  const dispatch = useDispatch();

  const register = () => {
    let errors = {};
    if (!formData.email || !formData.password) {
      if (!formData.email) {
        errors.email = true;
      }
      if (!formData.password) {
        errors.password = true;
      }
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
    } else if (formData.password.length < 6) {
      errors.password = true;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          dispatch(addUser(formData.email));
          console.log('Cuenta creada');
          navigation.goBack();
        })
        .catch(() => {
          setFormError({
            email: true,
            password: true,
          });
          console.log('Cuenta no creada');
        });
    }

    setFormError(errors);
  };

  function defaultValue() {
    return {
      email: '',
      password: '',
    };
  }

  return (
    <View style={styles.background}>
      <View style={styles.view}>
        <Text style={styles.title}>Creación</Text>
        <Text style={styles.text}>Correo del usuario</Text>
        <TextInput
          style={[styles.input, formError.email && styles.error]}
          onChange={(e) =>
            setFormData({...formData, email: e.nativeEvent.text})
          }
        />
        <Text style={styles.text}>Contraseña</Text>
        <View style={styles.viewInput}>
          <TextInput
            style={[styles.inputPassword, formError.password && styles.error]}
            placeholderTextColor="#969696"
            onChange={(e) =>
              setFormData({...formData, password: e.nativeEvent.text})
            }
            secureTextEntry={true}
          />
          {formError.password && (
            <Text style={styles.errorPassowrd}>
              La contraseña debe ser mayor a 6 dígitos
            </Text>
          )}
        </View>
        <TouchableOpacity style={styles.login} onPress={register}>
          <Text style={styles.loginText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
  inputPassword: {
    height: 40,
    color: '#000',
    width: '90%',
    fontSize: 16,
    borderWidth: 0.5,
    borderColor: '#1e3040',
  },
  viewInput: {
    width: '100%',
    marginBottom: 25,
  },
  errorPassowrd: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
