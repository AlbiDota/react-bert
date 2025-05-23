import { useState, useRef, useEffect } from "react";
import React from 'react'; 
import "./Blackjack.css";
//import "./Trekk";
import "./GameOver";

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
    let cardVisual = suit  + trukketKort

    //console.log(suit + " " + trukketKort); //printer kortet i terminalen
    //console.log(randKort+1);
    //console.log(kortstokk[0])
    kortstokk[randSuit].splice(randKort, 1); // vi går inn i suit, og fjerner riktig verdi en gang
    //console.log(kortstokk);
    return cardVisual; //det trukkede kortet
    
}
//funksjon for å plukke ut verdien til kortet, så vi slipper å paste samma driten ner hele koden vår :D
function getValue(nyttKort, handSum) { 
    let value=0; //for mellomregning
    if (["J","Q","K"].includes(nyttKort[1])) { value = 10} else { value = parseInt(nyttKort[1])};
    if (["A"].includes(nyttKort[1])) { value = 11}; 
    if ((value === 11) && ((handSum+value) > 21 )) { value = 1}; 
    if (["10"].includes(nyttKort.slice(1))) {value = 10};
    return value;
}


export default function Blackjack() {
    const [playerHand, setPlayerHand] = useState([]);
    let [playerHandSum, setPlayerHandSum] = useState(0);

    const [dealerHand, setDealerHand] = useState([]);
    let [dealerHandSum, setDealerHandSum] = useState(0);
    let [hiddenCardValue,setHiddenCardValue] = useState();

    //flagg for visning av dealers første kort
    const [viseKort, setViseKort] = useState(false);
    let [gameStatus, setGameStatus] = useState("")

    //database stuff
    const [user] = useAuthState(auth); //let newName = user.displayName.split(" ")[0]
    const blackjackRef = collection(firestore, "blackjack");

    //uid, displayName, email, wins, losses, coins
    const fetchUserData = async () => {
        if (!user) return;
        const userRef = doc(blackjackRef, user.uid);
        const userDoc = await getDoc(userRef);
    }

    //function COMPARISON FUNC HERE HANDLE WIN OG HANDLE LOSS KAN VÆRE TO FORSKJELLIGE FUNKSJONER
    //SOM KALLES INNAD I DENNE, DEFINERT ANNA STED

    

    function handleHit() {
        const nyttKort = trekk();
        setPlayerHand([...playerHand, nyttKort]);
        setPlayerHandSum(playerHandSum+=getValue(nyttKort,playerHandSum))
    }
    
    function trekkDealer() {
        //regler for dealern er at de må trekke til de treffer 17 eller mer. da må de stå etter det.
        let finalDealerHandSum = dealerHandSum;//react liker ikke å oppdatere variabler mid-loop 
        let finalDealerHand = [...dealerHand]; // så vi lager nye

        while (finalDealerHandSum < 17) {
            const nyttKort = trekk();
            finalDealerHand.push(nyttKort);
            finalDealerHandSum += getValue(nyttKort,finalDealerHandSum);
            //vil sette inn delay mellom hvert av korta, men den krasjer :/ ????
        }
        setDealerHand(finalDealerHand);
        setDealerHandSum(finalDealerHandSum);
    }

    function sammenliknHender(playerHandSum, dealerHandSum) {
        if ((playerHandSum > dealerHandSum)){setGameStatus("player win");}
        if ((playerHandSum < dealerHandSum)){setGameStatus("dealer win");}

        if (dealerHandSum > 21) {setGameStatus("dealer bust");}
        if (playerHandSum > 21) {setGameStatus("player bust");}

        if (playerHandSum == dealerHandSum && playerHand.length == dealerHand.length) {setGameStatus("push");}
        else if (playerHandSum == dealerHandSum && playerHand.length >= dealerHand.length){setGameStatus("player win");}

    }

    function handleStand() {//sammenlikning med dealers hånd
        setViseKort(true); //viser første kort

        setTimeout(() => {//DELAY FOR Å LA REACT CATCHE OPP OG SÅNT AS
            //VI LEGGER TIL DEN GJEMTE VERDIEN I hiddenCardValue
            let mellom = dealerHandSum + hiddenCardValue;
            setDealerHandSum(mellom);
            //TODO - SAMMENLIKNINGSLOGIKK HER
            // if (mellom < 17) {
            //     setTimeout(() => trekkDealer(), 500);
            // } else {
            //     sammenliknHender(playerHandSum, mellom);
            // }

        }, 333);
        
        //OG KANSKJE FINNE UT AV CASINOMUSIKK OG CSS ANIMASJONER FOR KORTA
        
    }
    //nå har vi muligheten for å animere dramatisk delay og greier
    useEffect(() => {
        if (viseKort && dealerHandSum < 17) {setTimeout(() => trekkDealer(), 500);}
        if (viseKort && dealerHandSum >= 17) {sammenliknHender(playerHandSum, dealerHandSum);}
        if (playerHandSum > 21) { setViseKort(true); sammenliknHender(playerHandSum,dealerHandSum);}
    }, [playerHandSum, dealerHandSum, /*viseKort*/]);

    /*useEffect(() => {
        setTimeout(() => {
            const winAudio = new Audio("/Assets/BlackjackAssets/casino.mp3")
            winAudio.volume = 0.1; //10% volum
            winAudio.play();
        }, 1500); //1,5 sek delay før den begynner
    },[]);*/
    
    const restart = () => { // funksjon for å resette alt med en knapp
        setPlayerHand([]);
        setPlayerHandSum(0);
        setDealerHand([]);
        setDealerHandSum(0);
        setViseKort(false);
        setGameStatus("");
        kortstokk = [
            ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"], // hjerter index 0
            ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"], // kløver index 1
            ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"], // ruter index 2
            ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]] // spar index 3
        
        setTimeout(() => { 
            //deler ut to kort til hver på starten av gamet OG regner ut verdien av starthendern
            //PLAYER
            const playerStartHand = [trekk(), trekk()];
            setPlayerHand(playerStartHand);
            let playerStartSum=0;

            playerStartHand.forEach(nyttKort => { 
                console.log("player: ", nyttKort);
                playerStartSum+=getValue(nyttKort,playerStartSum); 
            });

            setPlayerHandSum(playerStartSum); //enkel og grei!

            //DEALER 
            const dealerStartHand = [trekk(), trekk()];
            setDealerHand(dealerStartHand);
            let dealerStartSum=0;
            let hiddenCardValue=0;

            dealerStartHand.forEach(nyttKort => { 
                console.log("dealer: " + nyttKort); 
                dealerStartSum+=getValue(nyttKort,dealerStartSum);
            });

            
            //vi kan ikke vise hele dealers sum fra starten av. det blir teit
            hiddenCardValue=getValue(dealerStartHand[0],0) //verdi på kort med index 0 (første kort)
            dealerStartSum=getValue(dealerStartHand[1],0) //index 1 er da andre kortet
            setDealerHandSum(dealerStartSum); //bare andre kortet i starten

            setHiddenCardValue(hiddenCardValue);

        }, 123);
    };

    useEffect(() => {
        restart();
    }, []);

    return (
        <div className="blackjack-wrapper">
            <div style={{position:"relative", padding:"-1%"}}>{gameStatus}</div>
            <div className="dealerHand">
                {dealerHand.map((card,index) => (
                        <div key={index} className="card">{index === 0 && !viseKort ? "?" : card}</div>
                    ))}
            </div>
            <div className="dealerscore">
                React-Bert: {dealerHandSum !== 0 ? <h2>{dealerHandSum}</h2> : <></>}
            </div>
            <div className="hand">
                {playerHand.map((card,index) => (
                    <div key={index} className="card">{card}</div>
                ))}
            </div>
            <div className="playerscore">
                {user ? user.displayName.split(" ")[0] : "player"}{playerHandSum !== 0 ? <h2>{playerHandSum}</h2> : <></>}
            </div>
            <div className="knapper">
                <button onClick={handleHit} 
                    style= {{cursor: playerHandSum>=21 || viseKort ? "not-allowed" : "pointer"}}
                    disabled={playerHandSum>=21 || viseKort ? true : false}>Hit</button>
                <button onClick={handleStand} style={{cursor: viseKort ? "not-allowed" : "pointer"}}
                    disabled={viseKort ? true : false}>Stand</button>
                <button onClick={restart}>Restart</button>
            </div>
        </div>
    )

}