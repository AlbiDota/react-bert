import React, { useEffect, useState } from 'react';
import { firestore, auth } from "../../firebase";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const GamerStats = ({ gamer, currentUser }) => {
    const { uid, displayName, email, hangbertWins} = gamer;

    //kan brukes til å endre classname basert på om man er logget inn eller ikke
    //så vi kan highlighte brukern som er logga inn sjøl
    const gamerClass = currentUser && uid === auth.currentUser.uid ? "self" : "";

    //splitter navnet ved mellomrom og tar det første
    //for å unngå å vise etternavna til folk, hvis det er litt rart å gjøre
    let newName = displayName.split(" ")[0]; 
    newName !== "noName" ? newName = newName : newName = "Anonym";

    return (<>
        <div className={`gamer ${gamerClass}`}>
            <div className="gamer-name">{newName}</div>
            <div className="gamer-wins">{hangbertWins}</div>
        </div>
    </>)
};

export default GamerStats;