import { useState, useRef, useEffect } from "react";
import React from 'react'; 
import "./Blackjack.css";

import { firestore, auth, collection } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

let kortstokk = [
    ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"], // hjerter index 0
    ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"], // kløver index 1
    ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"], // ruter index 2
    ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]] // spar index 3

function trekk() {
    let randSuit = Math.floor(Math.random() * kortstokk.length); //velger hjerter, kløver, ruter eller spar
    let randKort = Math.floor(Math.random() * kortstokk[randSuit].length) //velger kort innad i suit

    let suit;

    switch (randSuit) {
        case 0:
            suit = "♡";
            break;
        case 1:
            suit = "♧";
            break;
        case 2:
            suit = "♢";
            break;
        case 3:
            suit = "♤";
            break;
    }

    let trukketKort = kortstokk[randSuit][randKort]; //trekker kortet

    //if ((randKort == "J") || (randKort == "Q") || (randKort == "K") ) { value = 10 } else { value = randKort + 1}

    

    let cardVisual = suit  + trukketKort
    //if ((math.sum(hand.values) > 21) && (["A"].includes(trukketKort))) { value = 1}; // summere hånda for å sjekke om den er under 21, 21, eller over 21

    console.log(suit + " " + trukketKort); //printer kortet i terminalen
    //console.log(randKort+1);
    //console.log(kortstokk[0])
    kortstokk[randSuit].splice(randKort, 1); // vi går inn i suit, og fjerner riktig verdi en gang
    console.log(kortstokk);
    return cardVisual; //det trukkede kortet
    
}



export default function Blackjack() {
    const [playerHand, setPlayerHand] = useState([]);
    let [playerHandSum, setPlayerHandSum] = useState(0);

    function handleHit() {
        const nyttKort = trekk();
        setPlayerHand([...playerHand, nyttKort]);

        let value;
        if (["J","Q","K","10"].includes(nyttKort[1])) { value = 10} else { value = parseInt(nyttKort[1])};
        if (["A"].includes(nyttKort[1])) { value = 11} 
        if (["A"].includes(nyttKort[1]) && ((playerHandSum+value) > 21 )) { value = 1} 
        
        setPlayerHandSum(playerHandSum+=value)
    }

    function handleStand() {
        
    }

    /*useEffect(() => {
        setTimeout(() => {
            const winAudio = new Audio("/Assets/BlackjackAssets/casino.mp3")
            winAudio.volume = 0.1; //10% volum
            winAudio.play();
        }, 1500); //1,5 sek delay før den begynner
    },[]);*/

    return (
        <div>
            <h2>{playerHandSum}</h2>
            <div className="hand">
                {playerHand.map((card,index) => (
                    <div key={index} className="card">{card}</div>
                ))}
            </div>
            <button onClick={handleHit} 
                style= {{cursor: playerHandSum>=21 ? "not-allowed" : "pointer"}}
                disabled={playerHandSum>=21 ? true : false}>Hit</button>
            <button onClick={handleStand}>Stand</button>
        </div>
    )

}