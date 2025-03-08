import { useState } from "react";

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
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [randName] = useState(tilfeldigNavn());

    
    
    const sendMessage = () => {
        const newMessage = {
            id: Date.now(),
            text: input,
            sender: randName,
            timestamp: new Date().toLocaleDateString()
        };
        //oppdaterer messages sin state ved å lage en array som har alle messages.
        setMessages([...messages, newMessage]); 
        setInput(""); //"resetter" skrivefeltet etter meldingen er sendt og lagret 

    }
    
    return (
    <><div style={{flex:0.1}}/>
        <div className="ChatBox-wrapper">
            <div className="ChatOutputBox">
                {/*KODE FOR OUTPUTBOKSEN MED CHATMELDINGENE HER*/}
                {messages.map((msg) => (
                    <div key={msg.id}> <strong>{msg.sender}</strong> [{msg.timestamp}]: {msg.text} </div>
                ))}
            </div>
            <div className="ChatInputBox">
                {/*SKRIVEFELT, ENTERKNAPP YE?*/}
                <input value={input} required onChange={(e) => setInput(e.target.value)} 
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}/> {/* Kan trykke enter i chatten*/}

                <button onClick={sendMessage}>Send</button>
            </div>
        </div><div style={{flex:0.3}}/>
    </>
    );
}

