import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Observation from '../screens/Observation';
import EditObservation from '../screens/EditObservation';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="observation"
        component={Observation}
        options={{title: 'Observaciones'}}
      />
      <Stack.Screen
        name="editobservation"
        component={EditObservation}
        options={{title: 'Editar observación'}}
      />
    </Stack.Navigator>
  );
}
