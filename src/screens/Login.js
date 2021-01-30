import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {validateEmail} from '../utils/validations';
import firebase from '../utils/firebase';
import {useDispatch, useSelector} from 'react-redux';
import {userLogged} from '../store/actions';

export default function Login({changeForm}) {
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});
  const dispatch = useDispatch();

  const login = () => {
    let errors = {};
    if (!formData.email || !formData.password) {
      if (!formData.email) {
        errors.email = true;
      }
      if (!formData.password) {
        errors.password = true;
      }
      console.log('ERROR 1');
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
      console.log('ERROR 2');
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          dispatch(userLogged(formData.email));
          console.log('OK');
        })
        .catch(() => {
          setFormError({
            email: true,
            password: true,
          });
        });
    }

    setFormError(errors);
  };

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };
  return (
    <>
      <TextInput
        style={[styles.input, formError.email && styles.error]}
        placeholder="Correo electronico"
        placeholderTextColor="#969696"
        onChange={(e) => onChange(e, 'email')}
      />
      <TextInput
        style={[styles.input, formError.password && styles.error]}
        placeholder="Contraseña"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={(e) => onChange(e, 'password')}
      />
      <TouchableOpacity onPress={login} style={styles.login}>
        <Text style={styles.loginText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <Text>
        ¿No tienes una cuenta?
        <TouchableOpacity onPress={changeForm}>
          <Text style={styles.btnText}> regístrate</Text>
        </TouchableOpacity>
      </Text>
    </>
  );
}
function defaultValue() {
  return {
    email: '',
    password: '',
  };
}

const styles = StyleSheet.create({
  btnText: {
    fontSize: 14,
    paddingLeft: 20,
    color: 'blue',
  },
  input: {
    height: 50,
    color: '#000',
    width: '80%',
    marginBottom: 25,
    paddingHorizontal: 20,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#1e3040',
  },
  error: {
    borderColor: 'red',
  },
  login: {
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 40,
    marginBottom: 50,
  },
  loginText: {
    color: '#000',
    fontSize: 18,
    paddingHorizontal: 90,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
});
