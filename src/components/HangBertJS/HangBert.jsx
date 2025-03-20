//HangBert.java, men i javascript
import React from "react";
import { useState, useEffect } from "react";
import "./HangBert.css";

import { firestore, auth, collection } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

//ordliste som inneholder ordene som skal gjettes
let ordliste = [
        "Ringnes","Hansa","Tuborg","Heineken",
        "Guinness","Corona","Carlsberg","Aass",
        "Grans","Seidel","Dahls"];

//velger tilfeldig ord fra ordlista
function tilfeldigOrd() {
    let abc = Math.floor(Math.random() * ordliste.length);
    //console.log(abc);
    //console.log(ordliste[abc]);
    let ord0 = ordliste[abc].toUpperCase();
    //let ord1 = ord0.toUpperCase().replaceAll(/[A-Z]/g,"_");
    return ord0;
}


//vi prøver å få bytta ut bokstavene i ord0 med min "custom font"
const BilderSomTekst = ({ ord0 , tidligereGjett }) => { //setter inn ord0 som parameter
    const getBokstavPNG = (bokstav) => { //setter inn bokstav som parameter
        return bokstav === "_" ? "/HangBertAssets/alfabet/0_strek.png" : `/HangBertAssets/alfabet/${bokstav.toLowerCase()}.png`;    
    };

    return (
        <div className="spillBokstaver" style={{}}>
            {ord0.split("").map((bokstav, index) => 
                bokstav === " " ? (
                    <span key={index} style={{width: "1rem"}}/>
                    ) : tidligereGjett.includes(bokstav) ? (
                        <img key={index} src={getBokstavPNG(bokstav)} alt={bokstav}/>
                    ) : (
                        <img key={index} src="/HangBertAssets/alfabet/0_strek.png" alt="_" style={{marginTop :"2rem"}} />
                    )
                )}
        </div>
    );
};



//funskcjon for spillet
export default function HangBert() {
    //const [ord1, setOrd1] = useState(tilfeldigOrd()[1]);
    //console.log(ord0); //originalen
    //console.log(ord1); //caps lock
    const [ord0, setOrd0] = useState(tilfeldigOrd());
    const [tidligereGjett, setTidligereGjett] = useState([]); //list med tidligere gjett
    const [antallFeil, setAntallFeil] = useState(0); //antall feil gjett
    const [showPopupL, setShowPopupL] = useState(false); //viser game over png og lyd
    const [showPopupW, setShowPopupW] = useState(false); //viser game won png og lyd
    const [gameWon, setGameWon] = useState(false); //holder styr på om spellet er vunnet
    const [totalWins, setTotalWins] = useState(0); //holder styr på totalt antall wins i databasen

    //database stuff
    const [user] = useAuthState(auth);

    const [ antWins, setAntWins ] = useState(0);

    const hangBertRef = collection(firestore, "hangbert");

    const fetchUserWins = async () => {
        if (!user) return;
        const userRef = doc(hangBertRef, user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            setAntWins(userDoc.data().hangbertWins);
        } else {
            setAntWins(0); 
        }
    };

    const fetchTotalWins = async () => {
        const innhenting = await getDocs(hangBertRef);
        let totaltAntWins = 0;

        innhenting.forEach((doc) => {
            totaltAntWins += doc.data().hangbertWins || 0; //summerer alle rader i kolonnen hangbertWins
        });
        setTotalWins(totaltAntWins); // oppdaterer totalWins sin state
    }

    //funksjon for å vise game over png og lyd i åtte sek
    const GameOver = () => {
        setShowPopupL(true);
        setTimeout(() => {
            const lossAudio = new Audio("/HangBertAssets/audio/lossAudio.mp3");
            lossAudio.play();
        }, 123);
        setTimeout(() => setShowPopupL(false), 8000);
        setTimeout(() => restart(), 9000);
    }

    const GameWon = async () => {
        setShowPopupW(true);
        setTimeout(() => {
            const winAudio = new Audio("/HangBertAssets/audio/winAudio.mp3")
            winAudio.volume = 0.3;
            winAudio.play();
        }, 345);

        
        
        const userID = user ? user.uid : "anonym"; //logget inn? da tar vi brukerIDen, ellers bruker vi "anonym"
        const displayName = user ? user.displayName || "Unknown User" : "noName";
        const email = user ? user.email || "No email" : "noEmail";

        const userRef = doc(hangBertRef, userID);
        const userDoc = await getDoc(userRef);

        try {if (userDoc.exists()) {
            //hvis brukern finnes i systemet, oppdaterer vi hangbertwins med pluss en
            await updateDoc(userRef, {
                hangbertWins: userDoc.data().hangbertWins + 1,
            });
            
        } else { //hvis brukern ikke finnes, må vi lage en dem i databasen
            await setDoc(userRef, {
                uid: userID,
                displayName: displayName,
                email: email,
                hangbertWins: 1, //siden vi legger dem til etter første win
            })
        }} catch (error) {
            console.error("Error adding to database: ", error);
        }

        setTimeout(() => setShowPopupW(false),5000);
        setTimeout(() => restart(), 6000);
    }


    //handleGuess fra knappen
    const handleGuess = (bokstav) => {
        bokstav = bokstav.toUpperCase();
        if (tidligereGjett.includes(bokstav) || antallFeil >= 6) return;

        setTidligereGjett((prev) => [...prev, bokstav]);
        
        {/*telling og lyd for feil bokstav*/}
        if (!ord0.includes(bokstav)) { //hvis ord0 ikke inneholder bokstav
            setAntallFeil((prev) => prev + 1); //øker antall feil med 1
            const wrongAudio = new Audio("/HangBertAssets/audio/wrongAudio.mp3"); //(Math.random() * (1 - 0.1) + 0.1);
            wrongAudio.volume = 0.15; //setter volum til 15% den var jævla høy jesus
            wrongAudio.playbackRate = (Math.random() * (2.4 - 0.3) + 0.6);
            wrongAudio.play();

            //hvis antall feil er 6, så spilles game over lyd etter en liten delay
            //for å sikre at vine boomen er over
            if (antallFeil === 5) {
                GameOver();
            }
        } else { //hvis ord0 inneholder bokstaven, teller vi ant riktige og spiller en bing
            const gjettetRiktig = ord0.split("").every(b =>
                b === " " || [...tidligereGjett, bokstav].includes(b)
            );

            const correctAudio = new Audio("/HangBertAssets/audio/correctAudio.mp3");
            correctAudio.volume = 0.1;
            correctAudio.play();

            if (gjettetRiktig) {//hvis gjettetRiktig er sann
                setGameWon(true);
                GameWon();
            }
        }
    };

    //funksjon for å restarte spillet
    const restart = () => {
        setOrd0(tilfeldigOrd());
        setTidligereGjett([]);
        setAntallFeil(0);
        setGameWon(false);
        setShowPopupL(false);
        setShowPopupW(false);
        fetchUserWins()
    };

    useEffect(() => {
        fetchTotalWins();
        if (user) { fetchUserWins() }
        
    },[user]);

    //setter på musikken etter litt tid
    /* Trenger at den kan loopes, og at den kan avbrytes av mute knapp og andre lyder ved game won og lost
    useEffect(() => {
        setTimeout(() => {
            const winAudio = new Audio("/HangBertAssets/audio/suspense.mp3")
            winAudio.volume = 0.3;
            winAudio.play();
        }, 9000);
    },[]);
    */

    return (
        <div >
            <restart/><br/><br/>
            <h1>Velkommen til HangBert!</h1>
            <h2>Spillet er 'Hangman' og temaet er 'øl i butikk'</h2><br/>
                {user ? <h2>Antall Wins: {antWins}</h2> : <></>}
                <h3>Forsøk {antallFeil} / 6</h3>
                {showPopupL && (
                    <h2 >Ordet var {ord0}</h2>
                )}
            
            
            <div className="HangBertContainer">
                {/* bilde for hangmanen og bokstavene*/}    
                    <img src={`/HangBertAssets/hangman/${antallFeil}.png`} alt="hangman" style={{width: "30rem", backgroundColor:"lightgoldenrodyellow", borderRadius:"5%"}}/>
                    <BilderSomTekst ord0={ord0} tidligereGjett={tidligereGjett} id="spillTekst"/>
                </div>
                
            {/*'tastaturet'*/}
            <div className="grid-container">
                    {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((bokstav) => (
                        <img key={bokstav} 
                        src={`/HangBertAssets/alfabet/${bokstav.toLowerCase()}.png`}
                        alt={bokstav} 
                        onClick={() => {if (!(tidligereGjett.includes(bokstav) || antallFeil === 6 || gameWon)) {
                            handleGuess(bokstav);}
                        }}
                        
                        style= {{
                            margin: "0.7rem 0 0.2rem 0",width:"3rem",
                            opacity: tidligereGjett.includes(bokstav) || gameWon || antallFeil === 6? 0.5 : 1,
                            cursor: tidligereGjett.includes(bokstav) || gameWon ? "not-allowed" : "pointer",
                            
                            backgroundColor: tidligereGjett.includes(bokstav) && ord0.includes(bokstav) 
                                ? "lightblue" 
                                : tidligereGjett.includes(bokstav) && !ord0.includes(bokstav)
                                ? "lightcoral" 
                                : "transparent"
                        }}
                        id = {bokstav} className="bokstav"
                        />
                    ))}
                </div>
                
           <div className="HangBertFlex"/><br/><br/>
           <button onClick={restart}>Restart</button>
           <br/><br/><br/><h2>Totalt antall wins: {totalWins}</h2><br/>

           {/*game over png som ska dukke opp når 'GameOver()' blir kalt*/}
           {showPopupL && (
                <div className="popupL">
                    <img src="/HangBertAssets/gameOver.png" className="gameOverPic" alt="game over"/> 
                </div>
           )}

           {/*game won png som ska dukke opp når 'GameWon()' blir kalt*/}
           {showPopupW && (
                <div className="popupW">
                    <img src="/HangBertAssets/gameWon.png" className="gameWonPic" alt="game won"/>
                </div>
           )}
        </div>
    )
}
//let [ord0,ord1] = tilfeldigOrd();
//console.log(ord0); //originalen
//console.log(ord1); //caps lock


/*main = () => { //arrow function hype !!!!!
    console.log("Velkommen til HangBert!");
    console.log("Spillet er 'Hangman'\nog temaet er 'öl i butikk'");
    let count = 0;
    while (count < 7 && ord1.includes("_")) {
        console.log("\n" + ord1);
        console.log("Gjett en bokstav: ");

        
        count++;
    }
}
*/

/*const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question("Gjett en bokstav: ", (input) => {
            //hangman(input);
            console.log(input);
            readline.close();
        });*/