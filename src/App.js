// a lot of this code is copied (sometimes modified) from firebase.google.com

import logo from './logo.svg';
import './App.css';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMIxC3JxhNt6B4Fji3HnBCZfskEOEQJp4",
  authDomain: "cs-493-widler.firebaseapp.com",
  projectId: "cs-493-widler",
  storageBucket: "cs-493-widler.appspot.com",
  messagingSenderId: "158170729793",
  appId: "1:158170729793:web:b41ce6486919fb0b9165c0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  var user;

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      setStateSignedIn(user);
    } else {
      uid = null;
      setStateNotSignedIn()
    }
  });

  function setStateSignedIn(user)
  {
    document.getElementById("emailLabel").style.display = "none"; 
    document.getElementById("passwordLabel").style.display = "none";
    document.getElementById("emailField").style.display = "none"; 
    document.getElementById("passwordField").style.display = "none";
    document.getElementById("signInButton").style.display = "none";
    document.getElementById("signUpButton").style.display = "none";
    document.getElementById("signOutButton").style.display = "block";
    document.getElementById("userDataLabel").style.display = "block";
    document.getElementById("userData").innerHTML = user.email;
    document.getElementById("userData").style.display = "block";
  }

  function setStateNotSignedIn()
  {
    document.getElementById("emailLabel").style.display = "inline"; 
    document.getElementById("passwordLabel").style.display = "inline";
    document.getElementById("emailField").style.display = "inline"; 
    document.getElementById("passwordField").style.display = "inline";
    document.getElementById("signInButton").style.display = "block";
    document.getElementById("signUpButton").style.display = "block";
    document.getElementById("signOutButton").style.display = "none";
    document.getElementById("userDataLabel").style.display = "none";
    document.getElementById("userData").style.display = "none";
  }

  return (

    <div className="App">
      <header className="App-header">
      <label id="emailLabel">Email Address</label>
      <input type="text" id="emailField"></input>
      <br></br>
      <label id="passwordLabel">Password</label>
      <input type="text" id="passwordField"></input>
      <br></br>
      <button 
        id="signInButton" 
        onClick={async function () {
            user = await firebase.auth().signInWithEmailAndPassword(
              document.getElementById("emailField").value, 
              document.getElementById("passwordField").value);
          }
        }
        >Sign In</button>
      <br></br>
      <button 
        id="signUpButton" 
        onClick={async function () {
            user = await firebase.auth().createUserWithEmailAndPassword(
              document.getElementById("emailField").value, 
              document.getElementById("passwordField").value);
          }
        }
        >Sign Up</button>
        
        <label id="userDataLabel">User Details</label>
        <br></br>
        <p id="userData"></p>
        <br></br>
        <button 
        id="signOutButton" 
        onClick={async function () {
          firebase.auth().signOut().then(() => {
            // Sign-out successful.
          }).catch((error) => {
            alert(error);
          });
          }
        }
        >Sign Out</button>
      </header>
    </div>
  );
}

export default App;
