import { useState, useRef, useEffect } from "react";
import React from 'react'; 
import "./Blackjack.css";

import { firestore, auth, collection } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
/*
let kortstokk = [
    ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"], // hjerter index 0
    ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"], // kløver index 1
    ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"], // ruter index 2
    ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]] // spar index 3
*/
export default function Trekk() {
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
    let cardVisual = suit  + trukketKort

    //console.log(suit + " " + trukketKort); //printer kortet i terminalen
    //console.log(randKort+1);
    //console.log(kortstokk[0])
    kortstokk[randSuit].splice(randKort, 1); // vi går inn i suit, og fjerner riktig verdi en gang
    console.log(kortstokk);
    return cardVisual; //det trukkede kortet
    
}
