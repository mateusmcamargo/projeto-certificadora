import { collection, addDoc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { database } from './firebase-config.js';
import firebase from 'firebase/compat/app';

try {
    const docRef = await addDoc(collection(database, 'users'), {
        name: 'josé da silva',
        birth: Timestamp.fromDate(new Date('04/10/1985')),
        cpf: '15485485632',
        password: '123456',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    });

    console.info('Document created with ID: ', docRef.id);
}
catch(error) {
    console.error('ERROR CREATING DOCUMENT: ', error);
}