import firebase from 'firebase/app';
import 'firebase/database';
import { useEffect, useState } from 'react';

export const initialiseFirebase = () => {
  // Set the configuration for your app
  const firebaseConfig = {
    apiKey: 'AIzaSyBcibEXu9VmzZFOR_7a8sIRtQNgyICM3ic',
    authDomain: 'abhisheknairofficialdotcom.firebaseapp.com',
    databaseURL: 'https://abhisheknairofficialdotcom.firebaseio.com',
    projectId: 'abhisheknairofficialdotcom',
    storageBucket: 'abhisheknairofficialdotcom.appspot.com',
    messagingSenderId: '1066577160683',
    appId: '1:1066577160683:web:5e014d73d528a94ee951ae',
    measurementId: 'G-T4LPP2JGTJ',
  };
  firebase.initializeApp(firebaseConfig);
};

export const useRealtimeDatabase = key => {
  if (firebase.apps.length === 0) {
    initialiseFirebase();
  }
  // Get a reference to the database service
  const database = firebase.database();
  const [value, setValue] = useState(null);

  useEffect(() => {
    const getDataFromDB = async () => {
      const snapshot = await database.ref(`/${key}/`).once('value');
      const valueOfTheSnapshot = snapshot.val();
      setValue(valueOfTheSnapshot);
    };
    getDataFromDB();
  }, [database, key]);

  return value;
};
