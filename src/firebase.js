import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import 'firebase/compat/auth'
// import { getStorage } from 'firebase/compat/storage'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBGyAEH8DTWjFWDpq5pb-_5kSm5O6Lj8w8",
    authDomain: "instagram-clone-1092d.firebaseapp.com",
    projectId: "instagram-clone-1092d",
    storageBucket: "instagram-clone-1092d.appspot.com",
    messagingSenderId: "990931786460",
    appId: "1:990931786460:web:62f57813e237f3f8ecb219",
    measurementId: "G-STK5Y3CJJ6"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }

