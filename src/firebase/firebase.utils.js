import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCRS6ax37CXukSoB4_mtreRFJWg-xpc4Z0",
    authDomain: "crwn-clothing-5c4ad.firebaseapp.com",
    databaseURL: "https://crwn-clothing-5c4ad.firebaseio.com",
    projectId: "crwn-clothing-5c4ad",
    storageBucket: "crwn-clothing-5c4ad.appspot.com",
    messagingSenderId: "977679868952",
    appId: "1:977679868952:web:887db0b2cade02d91d0f6d",
    measurementId: "G-12Q59S82YK"
  };

  export const createUserProfileDocument = async(userAuth, additionalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    if(!snapShot.exists){
      const { displayName, email} = userAuth;
      const createAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  export default firebase;