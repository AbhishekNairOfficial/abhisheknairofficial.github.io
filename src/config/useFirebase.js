import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import { useEffect, useState } from 'react';
import firebaseConfig from '../firebase-config.json';

export const initialiseFirebase = () => {
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

export const useFirebaseStorage = key => {
  // State
  if (firebase.apps.length === 0) {
    initialiseFirebase();
  }
  const [imageUrl, setImageUrl] = useState(null);

  const getImage = async () => {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storage = firebase.storage();
    // Create a storage reference from our storage service
    const bannerImage = await storage.ref(key).getDownloadURL();
    setImageUrl(bannerImage);
  };
  getImage();

  return imageUrl;
};
