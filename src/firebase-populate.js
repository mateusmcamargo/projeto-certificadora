import { collection, addDoc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase-config.js';

try {
    const docRef = await addDoc(collection(db, 'users'), {
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