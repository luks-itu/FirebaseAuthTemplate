require('dotenv').config()

console.log(process.env)


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, update } from "firebase/database";
import { getAuth,  onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

//this should be in a .env file
const firebaseConfig = {
apiKey: process.env.APIKEY,
authDomain: process.env.AUTHDOMAIN,
databaseURL: process.env.DBURL,
projectId: process.env.PID,
storageBucket: process.env.SB,
messagingSenderId: process.env.MSID,
appId: process.env.AID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();


//associating button for signup with method for creating new user
signUp.addEventListener('click', (e) => {

var email = document.getElementById('email').value
var password = document.getElementById('password').value

createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
// Signed in 
const user = userCredential.user;

set(ref(db, 'users/'+ user.uid), {
email: email
})

alert('user created')
// ...
})
.catch((error) => {
const errorCode = error.code;
const errorMessage = error.message;


alert(errorMessage)
// ..
});

})

//associating button for login with method for loggin in
login.addEventListener('click', (e) => {

var email = document.getElementById('email').value
var password = document.getElementById('password').value

signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  //signed in
const user = userCredential.user;
const date = new Date();

update(ref(db, 'users/'+user.uid), {
last_login: date 
})
alert('User '+ email+ ' logged in')

})
.catch((error) => {
const errorCode = error.code;
const errorMessage = error.message;

alert(errorMessage)
})


})


//check whether currently logged in
const user = auth.currentUser;
onAuthStateChanged(auth, (user) =>{
  if (user){
    const uid = user.uid
  } else {
  }
})


//associationg button for logut with logout method
logout.addEventListener('click', (e) => {
  signOut(auth).then(() => {
    alert('user logged out')
    // Sign-out successful.
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(errorMessage)
    // An error happened.
  });
  
})



