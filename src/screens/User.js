import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {map} from 'lodash';
import {DataTable} from 'react-native-paper';

export default function User() {
  const data = useSelector((state) => state);
  const {usuarios} = data;
  return (
    <View style={styles.background}>
      <View style={styles.view}>
        <Text style={styles.title}>Usuarios Registrados</Text>

        <DataTable style={{borderWidth: 1}}>
          <DataTable.Header style={{borderWidth: 1}}>
            <DataTable.Title>
              <Text style={{color: '#000'}}>id</Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={{color: '#000'}}>empleado</Text>
            </DataTable.Title>
          </DataTable.Header>

          {map(usuarios, (usuario, index) => (
            <DataTable.Row style={{borderWidth: 1}}>
              <DataTable.Cell>
                <Text style={{color: '#000'}}>{index + 1}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={{color: '#000'}}>{usuario}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
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
});
