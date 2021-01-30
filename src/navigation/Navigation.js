import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserStack from './UserStack';
import HomeStack from './HomeStack';
import VehicleStack from './VehicleStack';
import ObservationStack from './ObservationStack';
import {IconButton} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {obtainUserID} from '../store/actions';

const Tab = createBottomTabNavigator();

export default function Navigation({user}) {
  const dispatch = useDispatch();
  console.log('cd: ' + user.uid);
  dispatch(obtainUserID(user.uid));
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = 'home';
          } else if (route.name === 'Usuarios') {
            iconName = 'account';
          } else if (route.name === 'Vehículos') {
            iconName = 'car';
          } else if (route.name === 'Observaciones') {
            iconName = 'eye';
          }

          // You can return any component that you like here!
          return <IconButton icon={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="Inicio"
        component={HomeStack}
        option={{title: 'Principal'}}
      />
      <Tab.Screen
        name="Usuarios"
        component={UserStack}
        option={{title: 'Usuarios'}}
      />
      <Tab.Screen
        name="Vehículos"
        component={VehicleStack}
        option={{title: 'Vehiculos'}}
      />
      <Tab.Screen
        name="Observaciones"
        component={ObservationStack}
        option={{title: 'Observaciones'}}
      />
    </Tab.Navigator>
  );
}
