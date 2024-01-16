import firebase from 'firebase/compat/app'
import { getDatabase } from 'firebase/database'
import 'firebase/compat/auth' // TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.firebase.apiKey,
  authDomain: process.env.firebase.authDomain,
  projectId: process.env.firebase.projectId,
  storageBucket: process.env.firebase.storageBucket,
  messagingSenderId: process.env.firebase.messagingSenderId,
  appId: process.env.firebase.appId,
}

//init firebase app
let app
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
}

const auth = firebase.auth()
const db = getDatabase(app)
export { auth, db }