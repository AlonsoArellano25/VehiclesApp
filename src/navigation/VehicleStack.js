import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Vehicle from '../screens/Vehicle';
import {Text} from 'react-native';
import NewVehicle from '../screens/NewVehicle';
import NewObservation from '../screens/NewObservation';

const Stack = createStackNavigator();

export default function UserStack({navigation}) {
  const buttonRight = () => {
    return (
      <Text
        style={{paddingRight: 20}}
        onPress={() => navigation.navigate('newvehicle')}>
        + Agregar
      </Text>
    );
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="vehicle"
        component={Vehicle}
        options={{title: 'Vehículos', headerRight: () => buttonRight()}}
      />
      <Stack.Screen
        name="newvehicle"
        component={NewVehicle}
        options={{title: 'Nuevo Vehículo'}}
      />
      <Stack.Screen
        name="newobservation"
        component={NewObservation}
        options={{title: 'Nueva Observación'}}
      />
    </Stack.Navigator>
  );
}
