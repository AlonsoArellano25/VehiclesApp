import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import {validateEmail} from '../utils/validations';
import firebase from '../utils/firebase';
import {useDispatch} from 'react-redux';
import {addUser, userLogged} from '../store/actions';

export default function Register({changeForm}) {
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
          console.log('Cuenta creada');
          dispatch(userLogged(formData.email));
          dispatch(addUser(formData.email));
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
  return (
    <>
      <TextInput
        style={[styles.input, formError.email && styles.error]}
        placeholder="Correo electronico"
        placeholderTextColor="#969696"
        onChange={(e) => setFormData({...formData, email: e.nativeEvent.text})}
      />
      <View style={styles.viewInput}>
        <TextInput
          style={[styles.inputPassword, formError.password && styles.error]}
          placeholder="Contraseña"
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
      <TouchableOpacity onPress={register} style={styles.login}>
        <Text style={styles.loginText}>Registrarse</Text>
      </TouchableOpacity>
      <Text>
        ¿Ya tienes cuenta cuenta?
        <TouchableOpacity onPress={changeForm}>
          <Text style={styles.btnText}> inicia sesión</Text>
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
  inputPassword: {
    height: 50,
    color: '#000',
    width: '80%',
    paddingHorizontal: 20,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#1e3040',
  },
  viewInput: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 25,
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
  errorPassowrd: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
