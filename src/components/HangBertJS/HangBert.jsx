//HangBert.java, men i javascript
import React from "react";
import { useState } from "react";
import "./HangBert.css";

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
                        <img key={index} src="/HangBertAssets/alfabet/0_strek.png" alt="_" />
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

    const GameWon = () => {
        setShowPopupW(true);
        setTimeout(() => {
            const winAudio = new Audio("/HangBertAssets/audio/winAudio.mp3")
            winAudio.volume = 0.3;
            winAudio.play();
        }, 345);
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
    };

    return (
        <div >
            <restart/><br/><br/><br/>
            <h1>Velkommen til HangBert!</h1>
            <h2>Spillet er 'Hangman' og temaet er 'øl i butikk'</h2><br/>
            <h3>{antallFeil} / 6</h3>
            {showPopupL && (
                <h2 >Ordet var {ord0}</h2>
            )}
            <div className="HangBertContainer">
            {/* bilde for hangmanen og bokstavene*/}
            <img src={`/HangBertAssets/hangman/${antallFeil}.png`} alt="hangman" style={{width: "30rem"}}/>
            <BilderSomTekst ord0={ord0} tidligereGjett={tidligereGjett} id="spillTekst"/>

            <div className="HangBertFlex"/>
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
                            margin: "0.5rem",width:"2rem",
                            opacity: tidligereGjett.includes(bokstav) || gameWon || antallFeil === 6? 0.5 : 1,
                            cursor:tidligereGjett.includes(bokstav) || gameWon ? "not-allowed" : "pointer"
                        }}
                        id = {bokstav}
                        />
                    ))}
                </div>
                </div>
           <div className="HangBertFlex"/><br/><br/>
           <button onClick={restart}>Restart</button>
           <br/><br/><br/>

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