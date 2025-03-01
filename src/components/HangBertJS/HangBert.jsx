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
        return bokstav === "_" ? "/alfabet/0_strek.png" : `/alfabet/${bokstav.toLowerCase()}.png`;    
    };

    return (
        <div className="spillBokstaver" style={{display: "flex", gap: "1rem",}}>
            {ord0.split("").map((bokstav, index) => 
                bokstav === " " ? (
                    <span key={index} style={{width: "1rem"}}/>
                    ) : tidligereGjett.includes(bokstav) ? (
                        <img key={index} src={getBokstavPNG(bokstav)} alt={bokstav}/>
                    ) : (
                        <img key={index} src="/alfabet/0_strek.png" alt="_" />
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
    const [ord0, setOrd0] = useState(tilfeldigOrd()[0]);
    const [tidligereGjett, setTidligereGjett] = useState([]); //list med tidligere gjett
    const [antallFeil, setAntallFeil] = useState(0); //antall feil gjett

    //handleGuess fra knappen
    const handleGuess = (bokstav) => {
        bokstav = bokstav.toUpperCase();
        if (tidligereGjett.includes(bokstav) || antallFeil >= 6) return;

        setTidligereGjett((prev) => [...prev, bokstav]);
       
        if (!ord0.includes(bokstav)) { //hvis ord0 ikke inneholder bokstav
            setAntallFeil((prev) => prev + 1); //øker antall feil med 1
        }
    };

    //funksjon for å restarte spillet
    const restart = () => {
        setOrd0(tilfeldigOrd());
        setTidligereGjett([]);
        setAntallFeil(0);
    };

    return (
        <div>
            <h1>Velkommen til HangBert!</h1>
            <h2>Spillet er 'Hangman' og temaet er 'øl i butikk'</h2>
            <h3>{antallFeil} / 6</h3>
            
            <BilderSomTekst ord0={ord0} tidligereGjett={tidligereGjett}/>
            
           <div className="grid-container">
                {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((bokstav) => (
                    <img key={bokstav} 
                    src={`/alfabet/${bokstav.toLowerCase()}.png`}
                    alt={bokstav}
                    onClick={() => handleGuess(bokstav)}
                    disabled={tidligereGjett.includes(bokstav)}
                    style=
                    {{
                        margin: "0.5rem",cursor:"pointer",width:"2rem",
                        opacity: tidligereGjett.includes(bokstav) ? 0.5 : 1,
                    }}
                    id = {bokstav}
                    />
                ))}
           </div>
           <button onClick={restart}>Restart</button>
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