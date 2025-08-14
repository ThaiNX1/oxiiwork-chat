import firebase from "firebase/app";
import {environment} from "../../environments/environment";

const _firebaseConfig = {
    apiKey: "AIzaSyA4LnetQvwABHJ606AFZMPiPhox7PTyR8Y",
    authDomain: "lada-stg.firebaseapp.com",
    projectId: "lada-stg",
    storageBucket: "lada-stg.appspot.com",
    messagingSenderId: "1043628410169",
    appId: "1:1043628410169:web:75a0e2ea9010b9ea7f54e8",
    measurementId: "G-0ES3ZZ6WH3"
}
const _firebaseConfig_Prod = {
    apiKey: "AIzaSyAabNdAeCezo1t8FknYqRZhRUAzreIxBKo",
    authDomain: "lada-prod.firebaseapp.com",
    projectId: "lada-prod",
    storageBucket: "lada-prod.appspot.com",
    messagingSenderId: "1024402187272",
    appId: "1:1024402187272:web:88083476655d045ebc9dbd",
    measurementId: "G-CV69D7K2BG"
}
const app = firebase.initializeApp(environment.firebaseConfig);
// @ts-ignore
export const messaging = firebase.messaging(app);
