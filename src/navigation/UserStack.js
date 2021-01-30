import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native';
import User from '../screens/User';
import NewUser from '../screens/NewUser';

const Stack = createStackNavigator();

export default function UserStack({navigation}) {
  const buttonRight = () => {
    return (
      <Text
        style={{paddingRight: 20}}
        onPress={() => navigation.navigate('newuser')}>
        + Agregar
      </Text>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="user"
        component={User}
        options={{title: 'Usuarios', headerRight: () => buttonRight()}}
      />
      <Stack.Screen
        name="newuser"
        component={NewUser}
        options={{title: 'Nuevo usuario'}}
      />
    </Stack.Navigator>
  );
}
