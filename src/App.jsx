import MainLayout from "./Layout/Layout.jsx";
import './stylesheet/App.css';
import React  from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HangBertPage from './Pages/HangBertPage.jsx';
import Home from './Pages/Home';
import About from './Pages/About';
import SpinnerPage from './Pages/SpinnerPage.jsx';
import ChatPage from "./Pages/ChatPage.jsx";

/* FIREBASE STUFF */
//npm install firebase react-firebase-hooks
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyDBoMExGfzEQOonARqSAUY6U7p2jj1MC_8",
  authDomain: "react-bert.firebaseapp.com",
  projectId: "react-bert",
  storageBucket: "react-bert.firebasestorage.app",
  messagingSenderId: "929070805505",
  appId: "1:929070805505:web:c32fd023492dca8d1f0600",
  measurementId: "G-1S82T7WZR3"
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();
/* FIREBASE STUFF */








function App() {
  const [user] = useAuthState(auth);
  
  return (
    
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path="/" element={<Home/>} />
        <Route path="/HangBertPage" element={<HangBertPage/>} />
        <Route path="/SpinnerPage" element={<SpinnerPage/>} />
        <Route path="/ChatPage" element={<ChatPage/>} />
        <Route path="/About" element={<About/>} />
        
      </Route>
    </Routes>
    
  );
};

function SignIn() {

    const signInWithGoogle = () => { //mekker popup for å logge inn med google
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return(
    <>
        <button onClick={signInWithGoogle}>Sign in with google</button>
    </>
    )
};

function SignIOut() { //logge ut av google

  return auth.currentUser && (

      <button onClick={() => auth.signOut()}>Sign out</button>
  )
};

function ChatRoom() {

  const messagesRef = firestore.collection("messages") //"references a firestore collection"
  const query = messagesRef.orderBy("createdAt").limit(25); //sortert på timestamp og max 25 resultater

  const [messages] = useCollectionData(query, {idfield: "id"}); //høre på data i real-time med en hook

  const [formValue, setFormValue] = useState("");
  const sendMessage = async(e) => {
      e.preventDefault();

      const { uid, photoURL} = auth.currentUser;

      await messagesRef.add({
          text: formValue,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid,
          photoURL
      });
  }

  return (/* msg list */
      <>
          <div> 
              {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
          </div>

          <form onSubmit={sendMessage} >
              <input value={formValue} onChange={(e)=>setFormValue(e.target.value)}/>

              <button type="submit">🦐</button>
          </form>
      </>
  )
}

function ChatMessage(props) {
  const { text, uid } = props.message;

  //se forskjellen på motatt eller sendt mld - kan gi forskjellig css nå
  const messageClass = uid === auth.currentUser.uid ? "sent" : "recieved"; 

  return (
      <div className={`message ${messageClass}`}>
          
          <p>{text}</p>
      </div>
  )
}




export default App;
