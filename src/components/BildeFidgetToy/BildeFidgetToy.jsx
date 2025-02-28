import React, { useState } from 'react';
import bilde from './spinner.png';

//bare noe gøy for å få et bilde til å spinne, litt som en fidget spinner eller noe sånt idk
//man trykker på knappen og så spinner den litteranne.
const BildeFidgetToy = () => {

    const [spinner, settSpinner] = useState(false); //state for spinninganimasjonen y know

    //Når vi trykker knappen, ska vi sette "spinner" til true
    const handleClick=()=>{
        settSpinner(true);

            //slutt å spinn
        setTimeout(()=>{
        settSpinner(false);
        }, 90); //90 millisekunder delay før den slutter å spinne

    };



    return (
        <div>
            {/*CSS stålet i stor grad fra App.css sin default logo css*/}
            <style>{`
                
                .spinny-bilde {
                    height: 40vmin;
                    pointer-events: none;
                    animation: ${spinner ? 'bilde-spin 0.1s linear' : 'none'};
                    
                }
                
                @keyframes bilde-spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                
                .spinneknapp {
                    padding: 10px 20px;
                    background-color:rgb(224, 185, 9);
                    color: black;
                    border: ;
                    cursor: pointer;
                    font-size: 32px;
                    border-radius: 10px;
                }
                
                .spinneknapp:hover{
                    background-color: #45a049;
                }

            `}</style>

            <img src={bilde} className="spinny-bilde" alt="bilde" />
            {/*får faen ikke fløtta knappen tilbake under bildet*/}
            <br/>
            <button onClick={handleClick} className="spinneknapp">
                Spinn!
            </button>
            
        </div>
    );
}

export default BildeFidgetToy;