import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import { firebaseConfig } from '../config/firebaseAppConfig';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const storage = firebase.storage();
export {firebase};
