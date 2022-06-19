import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyCOO6CA7vhDem2oV7r_7LeCJfuzlaqijQo',

	authDomain: 'sistema-de-chamados-cd76f.firebaseapp.com',

	projectId: 'sistema-de-chamados-cd76f',

	storageBucket: 'sistema-de-chamados-cd76f.appspot.com',

	messagingSenderId: '288031515625',

	appId: '1:288031515625:web:8fbf7a10d4b1e47d3c2178',

	measurementId: 'G-EQ5CZ881W9',
}

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
}

export default firebase
