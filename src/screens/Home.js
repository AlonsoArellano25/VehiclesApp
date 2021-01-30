import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import firebase from '../utils/firebase';
import {useSelector} from 'react-redux';
import {BarChart} from 'react-native-chart-kit';
import 'firebase/firestore';
import {size} from 'lodash';
import {useFocusEffect} from '@react-navigation/native';
import {DataTable} from 'react-native-paper';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const data = useSelector((state) => state);
  const {
    quantityObs,
    quantityObsAccepted,
    quantityObsRejected,
    usuarioID,
    usuario,
  } = data;

  const screenWidth = Dimensions.get('window').width;

  const dataObservation = {
    labels: ['Registradas', 'Rechazadas', 'Aceptados'],
    datasets: [
      {
        data: [quantityObs, quantityObsRejected, quantityObsAccepted],
      },
    ],
  };
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0.4,
    color: (opacity = 0) => `rgba(26, 255, 46, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  useFocusEffect(
    useCallback(() => {
      setUsers([]);
      db.collection(String(usuarioID))
        .get()
        .then((resp) => {
          const usersArray = [];
          resp.forEach((doc) => {
            const dataUser = doc.data();
            dataUser.id = doc.id;
            usersArray.push(dataUser);
          });
          setUsers(usersArray);
          setLoading(false);
        });
    }, [usuarioID]),
  );

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <ScrollView style={styles.view}>
        <Text style={styles.text} onPress={() => firebase.auth().signOut()}>
          Cerrar Sesión
        </Text>
        <Text style={styles.title}>Observaciones totales</Text>
        <BarChart
          style={{backgroundColor: '#000'}}
          data={dataObservation}
          width={screenWidth}
          height={300}
          chartConfig={chartConfig}
          fromZero={true}
        />
        <Text style={styles.title}>Observaciones por empleado</Text>
        <View style={styles.viewBox}>
          <DataTable.Row style={styles.border}>
            <DataTable.Cell>
              <Text style={styles.color}>Empleado</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.color}>{usuario}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={styles.border}>
            <DataTable.Cell>
              <Text style={styles.color}>Registradas</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.color}>{size(users)}</Text>
            </DataTable.Cell>
          </DataTable.Row>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'blue',
  },
  background: {
    backgroundColor: '#fff',
    flex: 1,
  },
  view: {
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    paddingTop: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
  },
  color: {
    color: '#000',
  },
  viewBox: {
    marginBottom: 35,
    borderColor: '#000',
    borderWidth: 1,
  },
  border: {
    borderWidth: 1,
  },
});
