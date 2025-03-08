import React from "react";
import { useState } from "react";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

//firebase stuff
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

function ChatMessage(props) {
    const { text, uid } = props.message;

    //se forskjellen på motatt eller sendt mld - kan gi forskjellig css nå
    const messageClass = uid === auth.currentUser.uid ? "sent" : "recieved"; 

    return (
        <div className={`message ${messageClass}`}>
            <img src={photoURL}/>
            <p>{text}</p>
        </div>
    )
}