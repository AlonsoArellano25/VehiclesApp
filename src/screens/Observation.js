import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import {DataTable, IconButton} from 'react-native-paper';
import {map} from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import {
  removeObservation,
  addObsAccepted,
  removeObsAccepted,
  addObsRejected,
  removeObsRejected,
} from '../store/actions';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

export default function Observation({navigation}) {
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const data = useSelector((state) => state);
  const {usuario, quantityObsAccepted, quantityObsRejected} = data;
  const dispacth = useDispatch();
  console.log(observations);

  useEffect(() => {
    db.collection('observations').onSnapshot((querySnapshot) => {
      const observaciones = [];
      querySnapshot.docs.forEach((doc) => {
        const {
          creado_por,
          idestado,
          idvehiculo,
          observacion,
          resuelto_por,
        } = doc.data();
        observaciones.push({
          id: doc.id,
          creado_por,
          idestado,
          idvehiculo,
          observacion,
          resuelto_por,
        });
      });
      setObservations(observaciones);
      setLoading(false);
    });
  }, []);

  const DeleteAlert = (observation, index) =>
    Alert.alert(
      `ELiminación: Observación ${index}`,
      '¿Estás seguro que deseas eliminar esta observación?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Confirmar', onPress: () => deleteObservation(observation)},
      ],
      {cancelable: false},
    );

  const deleteObservation = async (observation) => {
    const dbRef = db.collection('observations').doc(observation.id);
    await dbRef.delete();
    dispacth(removeObservation());
    if (observation.idestado === 2) {
      dispacth(removeObsAccepted());
    } else if (observation.idestado === 3) {
      dispacth(removeObsRejected());
    }
  };

  const aceptarObservacion = async (observation) => {
    const dbRef = db.collection('observations').doc(observation.id);
    await dbRef.set({
      creado_por: observation.creado_por,
      idestado: 2,
      idvehiculo: observation.idvehiculo,
      observacion: observation.observacion,
      resuelto_por: usuario,
    });

    dispacth(addObsAccepted());
  };

  const cancelarObservacion = async (observation) => {
    const dbRef = db.collection('observations').doc(observation.id);
    await dbRef.set({
      creado_por: observation.creado_por,
      idestado: 3,
      idvehiculo: observation.idvehiculo,
      observacion: observation.observacion,
      resuelto_por: usuario,
    });
    dispacth(addObsRejected());
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.background}>
      <View style={styles.view}>
        {observations.length === 0 ? (
          <Text style={styles.title}>
            No hay registros, empieza agregando uno.
          </Text>
        ) : (
          <>
            <Text style={styles.title}>Observaciones registradas</Text>
            {map(observations, (observation, index) => (
              <View key={observation.id} style={styles.box}>
                <DataTable.Row style={styles.border}>
                  <DataTable.Cell>
                    <Text style={styles.color}>Id</Text>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={styles.color}>{index + 1}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={styles.border}>
                  <DataTable.Cell>
                    <Text style={styles.color}>Descripción</Text>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={styles.color}>{observation.observacion}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={styles.border}>
                  <DataTable.Cell>
                    <Text style={styles.color}>Estado</Text>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={styles.color}>
                      {observation.idestado === 1
                        ? 'Registrado'
                        : observation.idestado === 2
                        ? 'Acepado'
                        : 'Rechazado'}
                    </Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={styles.border}>
                  <DataTable.Cell>
                    <Text style={styles.color}>Registrado por</Text>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={styles.color}>{observation.creado_por}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={styles.border}>
                  <DataTable.Cell>
                    <Text style={styles.color}>Actualizado por</Text>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={styles.color}>{observation.resuelto_por}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={styles.border}>
                  <DataTable.Cell>
                    <Text style={styles.color}>Acciones</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <View style={styles.boxAction}>
                  <DataTable.Row style={styles.center}>
                    <DataTable.Cell
                      onPress={() =>
                        navigation.navigate('editobservation', {
                          observation,
                          index,
                        })
                      }>
                      <View>
                        <Text>Editar</Text>
                        <IconButton icon="square-edit-outline" color="#000" />
                      </View>
                    </DataTable.Cell>
                    <DataTable.Cell
                      onPress={() => aceptarObservacion(observation)}>
                      <View>
                        <Text>Aceptar</Text>
                        <IconButton icon="check-bold" color="#000" />
                      </View>
                    </DataTable.Cell>
                    <DataTable.Cell
                      onPress={() => cancelarObservacion(observation)}>
                      <View>
                        <Text>Rechazar</Text>
                        <IconButton icon="close-thick" color="#000" />
                      </View>
                    </DataTable.Cell>
                    <DataTable.Cell
                      onPress={() => DeleteAlert(observation, index + 1)}>
                      <View>
                        <Text>Eliminar</Text>
                        <IconButton icon="trash-can-outline" color="#000" />
                      </View>
                    </DataTable.Cell>
                  </DataTable.Row>
                </View>
              </View>
            ))}
          </>
        )}
      </View>
    </ScrollView>
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
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  boxAction: {
    borderColor: '#000',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  color: {
    color: '#000',
  },
  border: {
    borderWidth: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box: {
    marginBottom: 30,
  },
});
