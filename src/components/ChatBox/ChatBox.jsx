import { useState, useRef } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore, auth, collection, addDoc, serverTimestamp, query, orderBy, limit } from "../../firebase";

let adjektiv = [
     "", "Iskald", "Lunken", "Kjølig", "Glovarm", "Romtemperert",
    "Heslig", "Grumsete","Frisk"];

let beer = [
    "Ringnes","Hansa","Tuborg","Heineken",
    "Guinness","Corona","Carlsberg","Aass",
    "Grans","Seidel","Dahls"];

function tilfeldigNavn() {
    let randName = (adjektiv[Math.floor(Math.random() * adjektiv.length)] 
                    + beer[Math.floor(Math.random() * beer.length)])
    return randName;
}

export default function ChatBox() { 
    const [input, setInput] = useState("");
    const [randName] = useState(tilfeldigNavn());

    const dummy = useRef();
    const messagesRef = collection(firestore,'messages');

    //mekke query med order by
    const messagesQuery = query(messagesRef, orderBy('createdAt'), limit(25));
    
    const [messages] = useCollectionData(messagesQuery, {idfield: "id"});

    const [formValue, setFormValue] = useState(""); //reset form value

    const sendMessage = async (e) => {
        e.preventDefault(); //gjør atn ikke refresher seg når man submitter "form"

        const { uid } = auth.currentUser;

        await addDoc(messagesRef, {
            text: formValue,
            createdAt: serverTimestamp(),
            uid,
            randName,
            chatTime: new Date().toLocaleTimeString()
        })

        setFormValue("");
        //vi kaller denna seinere for å scrolle når en ny mld kommer
        dummy.current.scrollIntoView({behavior: "smooth" });//vi kaller denna seinere for å scrolle når en ny mld kommer
        setInput(""); //reset input etter sendt mld
/*
        const newMessage = {
            uid: auth.currentUser.uid,
            text: input,
            sender: randName,
            timestamp: new Date().toLocaleDateString()
        };
        //oppdaterer messages sin state ved å lage en array som har alle messages.
        //setMessages([...messages, newMessage]); */
        setInput(""); //"resetter" skrivefeltet etter meldingen er sendt og lagret 

    }
    
    return (
    <><div style={{flex:0.1}}/>
        <div className="ChatBox-wrapper">
            <div className="ChatOutputBox">
                {/*KODE FOR OUTPUTBOKSEN MED CHATMELDINGENE HER*/}
                
                {messages && messages.map((msg) => (<ChatMessage key={msg.id} message={msg}/>))} 
                    <span ref={dummy}/>{/*autoscrollern*/}
            </div>
            <form onSubmit={sendMessage} className="ChatInputBox">
                {/*SKRIVEFELT, ENTERKNAPP YE?*/}
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} 
                onKeyDown={(e) => e.key === "Enter" && sendMessage(e)}
                
            /> {/* Kan trykke enter i chatten*/}

                <button type="submit" onClick={sendMessage} disabled={!formValue} >Send</button>
            </form>
        </div><div style={{flex:0.3}}/>
    </>
    );

    function ChatMessage(props) {
        const {text, createdAt, uid, randName, chatTime} = props.message;

        //meldingen som vises er entn sendt eller motatt
        const messageClass = uid === auth.currentUser.uid ? "sent" : "recieved";

        return (<>
            <div className={`message ${messageClass}`}>
                <p id="chatTime">[{chatTime}]</p>
                <strong>{props.message.randName}</strong>:
                
                <p>{text}</p>
            </div>
        </>)
    }
}

