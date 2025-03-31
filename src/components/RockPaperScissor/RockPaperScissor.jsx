import { useState, useRef, useEffect } from "react";
import React from 'react'; 
import "./RockPaperScissor.css";

import { firestore, auth, collection } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';


const valg = ["stein", "saks", "papir"];
//funksjon for å velge tilfeldig av stein, sakjs eller papir
function tilfeldigValg() {
    const randValg = Math.floor(Math.random() * valg.length);
    return valg[randValg];
}

//funksjon for å finne bilde for "weapon of choice"
//later

export default function RockPaperScissor() {
    const [spillerValg, setSpillerValg] = useState();
    const [motstanderValg, setMotstanderValg] = useState(tilfeldigValg());
    const [gameWon, setGameWon] = useState(false);
    const [gameDraw, setGameDraw] = useState(false);
    const [gameLost, setGameLost] = useState(false);
    

    const [ antWins, setAntWins ] = useState(0);
    const [ antDraws, setAntDraws ] = useState(0);
    const [ antLosses, setAntLosses ] = useState(0);
    

    //database stuff
    const [user] = useAuthState(auth);

    const SteinSaksPapirRef = collection(firestore, "SteinSaksPapir");

    const fetchUserStats = async () => {
        //if (!user) return; //så vi bare gir oss der om vi ikke er logga inn SCRAPPED intil videre
        //henter brukerdata
        const userRef = doc(SteinSaksPapirRef, user.uid);
        const userDoc = await getDoc(userRef);

        const userID = user ? user.uid : "anonym"; //logget inn? da tar vi brukerIDen, ellers bruker vi "anonym"
        const displayName = user ? user.displayName || "Unknown User" : "noName";
        const email = user ? user.email || "No email" : "noEmail";

        try {if (userDoc.exists()) {
            setAntWins(userDoc.data().wins);
            setAntDraws(userDoc.data().draws);
            setAntLosses(userDoc.data().losses);    
        } else { //hvis brukern ikke finnes i systemet
            await setDoc(userRef, {
                uid: userID,
                displayName: displayName,
                email: email, 
                wins:0, draws:0, losses:0});
        }} catch (error) {console.error("Error adding to database: ", error);}

    }

    const handleSpillerValg = (valg) => {
        if (gameWon || gameDraw || gameLost) return; //sånn at den ikke gjør noe mens gamet er over

        const inputMapping = (valg) => {
            switch (valg) {
                case "stein":
                    return 0; // stein
                case "saks":
                    return 1; // saks
                case "papir":
                    return 2; // papir
                default:
                    return -1; // for feilmelding
            }
        };
    }
    

    return (
        <div className="rockpaperscissor-wrapper">
            <h1>Stein - Saks - Papir!</h1>

            {/* ENEMY STEIN SAKS PAPIR */}
            <ul className="rockpaperscissor-toolbar">
                {/*<li><img src="/SSPAssets/rock.png" className="rock1" onClick={setSpillerValg("stein")}/></li>
                <li><img src="/SSPAssets/scissors.png" className="scissors1" onClick={setSpillerValg("saks")}/></li>
                <li><img src="/SSPAssets/paper.png" className="paper1" onClick={setSpillerValg("papir")}/></li>*/}
                <li onClick={handleSpillerValg("stein")}>🤘</li>
                <li onClick={handleSpillerValg("saks")}>✂</li>
                <li onClick={handleSpillerValg("papir")}>🧻</li>
            </ul>
            
            {/* PLAYER STEIN SAKS PAPIR */}
            <ul className="rockpaperscissor-toolbar">
                {/*<li><img src="/SSPAssets/rock.png" className="rock1" onClick={setSpillerValg("stein")}/></li>
                <li><img src="/SSPAssets/scissors.png" className="scissors1" onClick={setSpillerValg("saks")}/></li>
                <li><img src="/SSPAssets/paper.png" className="paper1" onClick={setSpillerValg("papir")}/></li>*/}
                <li onClick={handleSpillerValg("stein")}>🤘</li>
                <li onClick={handleSpillerValg("saks")}>✂</li>
                <li onClick={handleSpillerValg("papir")}>🧻</li>
            </ul>

            

        </div>
    )
}
