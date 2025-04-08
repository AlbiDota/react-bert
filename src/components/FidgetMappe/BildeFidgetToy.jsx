import React, { useEffect, useState } from 'react';
import bilde from './spinner.png';
import { firestore, auth, collection } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

//bare noe gøy for å få et bilde til å spinne, litt som en fidget spinner eller noe sånt idk
//man trykker på knappen og så spinner den litteranne.
const BildeFidgetToy = () => {
    const [spinner, setSpinner] = useState(5); //state for spinninganimasjonen y know
    
    const [totalClicks, setTotalClicks] = useState(0); // state for å lagre antall klikk totalt
    const [userClicks, setUserClicks] = useState(0);// state for å lagre antall klikk av brukern

    //database stuff
    const [user] = useAuthState(auth);

    const spinnerclicksRef = collection(firestore, "spinnerclicks")

    //logikk for å telle totalt antall klikk på spinnern i databasen
    const fetchTotalClicks = async () => {
        const innhenting = await getDocs(spinnerclicksRef);
        let totaltAntKlikk = 0;

        innhenting.forEach((doc) => {
            totaltAntKlikk += doc.data().numOfClicks || 0; //summerer alle rader i kolonnen numOfClicks
        });
        setTotalClicks(totaltAntKlikk); // oppdaterer totalClicks sin state
    }


    const fetchUserClicks = async () => {
        if (!user) return; //sånn at den stopper der hvis du ikke er logga inn.

        const userRef = await doc(spinnerclicksRef, user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            setUserClicks(userDoc.data().numOfClicks); //setter brukerns klikk til det som står i databasen
        } else {
            setUserClicks(0); //detta blir jo da bare når brukern ikke finnes i databasen
        }
    };

    
    //Når vi trykker knappen, ska vi sette "spinner" til true
    const handleClick = async ()=>{

        //LEGENDARY GOATED WITH THE BOATED MOAT SPINNER LOGIC HERE
        setSpinner((prev) => Math.max(prev * 0.8, 0.1)); //gange 0.x, for å korte ned duration (går fortere)
        //OMEGA SLOWDOWN LOGIC ER LENGRE NEDE

        // forbedret påå denna måten for å ikke ha så svær latency mellom klikk og oppdatering på sida
        setTotalClicks((prev) => prev + 1);
        if (user) setUserClicks((prev) => prev + 1);

        //database stuff igjen
        const userID = user ? user.uid : "anonym"; //logget inn? da tar vi brukerIDen, ellers bruker vi "anonym"
        const displayName = user ? user.displayName || "Unknown User" : "noName";
        const email = user ? user.email || "No email" : "noEmail";

        const userRef = doc(spinnerclicksRef, userID);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            //hvis brukern finnes i systemet, oppdaterer vi numOfClicks med pluss en
            await updateDoc(userRef, {
                numOfClicks: userDoc.data().numOfClicks + 1,
            });
            
        } else { //hvis brukern ikke finnes, må vi lage en dem i databasen
            await setDoc(userRef, {
                uid: userID,
                displayName: displayName,
                email: email,
                numOfClicks: 1, //siden vi legger dem til etter første klikk right
            })
        }

        //fetchTotalClicks(); //oppdaterer totalClicks
        //fetchUserClicks(); // og userClicks på displayet
        //viste seg å skape for mye latency mellom klikk og visuell oppdatering

        //slutt å spinn
        // setTimeout(()=>{
        // settSpinner(false);
        // }, 90); // millisekunder delay før den slutter å spinne

    };
    useEffect(() => {
        let frame;
        //OMEGA SLOWDOWN ER HER!! //senkes sakte med 0.1, grense på 0.1
        const slowDown = () => {
            setSpinner((prev) => {
                if (prev<5) {
                    frame = requestAnimationFrame(slowDown);
                    return Math.min(prev * 1.1, 5); //gange med 1.x for å øke duration(treigere)
                }
                return prev;
            });
        }
        frame = requestAnimationFrame(slowDown);
        return () => cancelAnimationFrame(frame);
    }, [spinner]);
        

    //fetcher da når du går inn på sia eller refresher, (eller bytter bruker)
    useEffect(() => {
        fetchTotalClicks();
        if (user) {
        fetchUserClicks();
        }
    }, [user]);

    

    return (
        <div>
            {/*CSS stålet i stor grad fra App.css sin default logo css*/}
            <style>{`
                
                .spinny-bilde {
                    height: 40vmin;
                    pointer-events: none;
                    animation: bilde-spin ${spinner ==0 ? "0s" : `${spinner}s`} linear infinite;
                    transition: animation-duration 0.5s ease-out;
                }
                
                @keyframes bilde-spin {
                    from {transform: rotate(0deg);}
                    to {transform: rotate(360deg);}
                }

            `}</style>
            {/* displaye totale klikk og hvis bruker er på, demsess klikk også */}
            <h1>Total clicks: {totalClicks}</h1>
            {user ? <h1>Your clicks: {userClicks}</h1> : <></>}
            <img src={bilde} className="spinny-bilde" alt="bilde" />
            {/*får faen ikke fløtta knappen tilbake under bildet*/}
            <br/><br/><br/><br/><br/>
            <button onClick={handleClick} className="spinneknapp">
                Spinn!
            </button>
            
        </div>
    );
}

export default BildeFidgetToy;