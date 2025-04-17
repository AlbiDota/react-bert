import { useState, useRef, useEffect } from "react";
import React from 'react'; 
import "./Blackjack.css";
import "./Blackjack";
import "./GameOver";

import { firestore, auth, collection } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, addDoc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

//Regler for blackjack med betting
// legg inn et "bet" før gamet begynner
// spillern kan "hit" eller "stand"
// egentlig kan man også double downe og splitte, men idc atm 
// dealers tur - react-bert trekker til 17 eller høyere
// resultater:
// win - 2 x bet (original bet + vinning)
// blackjack(du fikk 21 på første to korta) så får du 1.5 x bet (optional regel)
// push - beholder penga du betta 
// lose - du mister penga du betta 

export default function BettingPanel({
    user, 
    antWins, 
    antLosses, 
    currentBet, 
    setCurrentBet, 
    antCoins, 
    setAntCoins, 
    updateUserData,
    /*allowStart,
    setAllowStart*/
}) {
    const [userInput, setUserInput] = useState("10");


    const placeBet = async (e) => {
        e.preventDefault(); //for å ikke refreshe sia på submit
        //setAllowStart(true);
        const inputInt = parseInt(userInput);
        if (inputInt <= antCoins) {
            setCurrentBet(inputInt);
            setAntCoins(antCoins - inputInt);
            await updateUserData({antWins: antWins ?? 0, antLosses: antLosses ?? 0, antCoins: antCoins - inputInt});
        } else { console.log("insufficient funds :(")}
    }

    // useEffect(() => {
    //     updateUserData();
    // },[])


    return (
        <div className="bettingpanel-wrapper">
            <div className="account-stats-wrapper">
                <div>{user ? user.displayName.split(" ")[0] : "Felleskontoen<3"}</div>
                <p>Wins: {antWins}</p>
                <p>Losses: {antLosses}</p>
                <div>bert-coins: {antCoins}</div>
                <div>Current bet: {currentBet}</div>
            </div>
            <form>
                <input value={userInput} min="1" max={antCoins} type="number" pattern="[0-9]"
                    onChange={(e) => setUserInput(e.target.value)}
                    disabled={(currentBet>0)}/>
                <button type="submit" onClick={placeBet} 
                    disabled={(userInput>antCoins) || (userInput==0) || (currentBet>0)}
                    style={{cursor: currentBet>0 || userInput>antCoins || userInput==0 ? "not-allowed" : "pointer"}}>
                        Bet</button>
            </form>
        </div>
    )
}