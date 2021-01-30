import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import firebase from '../utils/firebase';
import 'firebase/firestore';
import {DataTable} from 'react-native-paper';
import {map} from 'lodash';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

export default function Vehicle({navigation}) {
  const [vims, setVims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.collection('vehicles').onSnapshot((querySnapshot) => {
      const vimss = [];
      querySnapshot.docs.forEach((doc) => {
        const {vim} = doc.data();
        vimss.push({
          id: doc.id,
          vim,
        });
      });
      setVims(vimss);
      setLoading(false);
    });
  }, []);

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
        {vims.length === 0 ? (
          <Text style={styles.title}>
            No hay registros, empieza agregando uno.
          </Text>
        ) : (
          <>
            <Text style={styles.title}>Vehículos Registrados</Text>
            {map(vims, (vim, index) => (
              <View key={vim.id} style={styles.viewBox}>
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
                    <Text style={styles.color}>VIM</Text>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={styles.color}>{vim.vim}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row
                  style={styles.border}
                  onPress={() => navigation.navigate('newobservation', {vim})}>
                  <DataTable.Cell>
                    <Text style={styles.color}>Observaciones</Text>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={styles.color}>+ Agregar</Text>
                  </DataTable.Cell>
                </DataTable.Row>
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
  color: {
    color: '#000',
  },
  viewBox: {
    marginBottom: 30,
    borderColor: '#000',
    borderWidth: 1,
  },
  border: {
    borderWidth: 1,
  },
});
