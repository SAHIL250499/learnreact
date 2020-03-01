import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBxOFarBnJsmXBB_e04hD0jHxo5nWsQiTg",
  authDomain: "chat-266813.firebaseapp.com",
  databaseURL: "https://chat-266813.firebaseio.com",
  projectId: "chat-266813",
  storageBucket: "chat-266813.appspot.com",
  messagingSenderId: "802861281731",
  appId: "1:802861281731:web:788e59abbb59c4347d0d76",
  measurementId: "G-W46NJ1Q55T"
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
