//HangBert.java, men i javascript
import React from "react";
import { useState } from "react";

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
    let ord0 = ordliste[abc];
    let ord1 = ord0.toUpperCase().replaceAll(/[A-Z]/g,"_");
    return [ord0, ord1];
}

//let [ord0,ord1] = tilfeldigOrd();
//console.log(ord0); //originalen
//console.log(ord1); //caps lock


//vi prøver å få bytta ut bokstavene i ord0 med min "custom font"
const BilderSomTekst = ({ ord0 }) => { //setter inn ord0 som parameter
    const getBokstavPNG = (bokstav) => { //setter inn bokstav som parameter
        return bokstav === "_" ? "/alfabet/0_strek.png" : `/alfabet/${bokstav.toLowerCase()}.png`;    
    };

    return (
        <div style={{display: "flex", gap: "1rem",}}>
            {ord0.split("").map((bokstav, index) => 
                bokstav.trim() ? (
                    <img 
                        key={index} 
                        src={getBokstavPNG(bokstav)} 
                        alt={bokstav} />
                ) : null//<span key={index} style={{width: "1rem"}}></span>
            )}
        </div>
    );
};

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

export default function HangBert() {
    const [ord0, setOrd0] = useState(tilfeldigOrd()[0]);
    const [ord1, setOrd1] = useState(tilfeldigOrd()[1]);
    console.log(ord0); //originalen
    console.log(ord1); //caps lock
    return (
        <div>
            <h1>Velkommen til HangBert!</h1>
            <h2>Spillet er 'Hangman' og temaet er 'øl i butikk'</h2>
            
            <BilderSomTekst ord0={ord0}/>
            
            <button onClick={() => {
                const [ord0, ord1] = tilfeldigOrd();
                setOrd0(ord0);  
                setOrd1(ord1);
            }}>Kjør på!</button>
        </div>
    )
}

/*const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question("Gjett en bokstav: ", (input) => {
            //hangman(input);
            console.log(input);
            readline.close();
        });*/