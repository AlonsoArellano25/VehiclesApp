import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Dialog, Portal, Button} from 'react-native-paper';

import firebase from '../utils/firebase';
import 'firebase/firestore';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

export default function DialogDelete({index, observation}) {
  const [visible, setVisible] = useState(true);

  const hideDialog = () => setVisible(false);

  const deleteObservation = async (id) => {
    const dbRef = db.collection('observations').doc(id);
    await dbRef.delete();
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Eliminación: Observación {index}</Dialog.Title>
        <Dialog.Content>
          <Text style={{color: '#000'}}>
            ¿Estás seguro que deseas eliminar esta observación?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => deleteObservation(observation.id)}>
            Confirmar
          </Button>
        </Dialog.Actions>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancelar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
