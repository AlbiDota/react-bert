import React, { useState } from 'react';

const KontaktOss =()=>{

    const [synlig,settSynlighet] = useState(false); //state for toggle begynner i false 
    
    //"toggle" funksjonen til knappen
    const toggleInfo =()=>{
        //hvis synlig=1, blir den 0 og omvendt :)
        settSynlighet(!synlig);
    };

    return (
    <div className="kontaktDiv">
        
        <style> {/*YOOO INTERNAL CSS!!!*/}
        {`
          
        `}
      </style>

        <button className="open-button" onClick={toggleInfo}>Kontakt oss!</button>

        {synlig && (
            <div className="kontaktInfo">
                <p><strong>Kontakt oss!!</strong></p>
                <p><strong>Telefon:</strong> +47 12345678</p>
                <p><strong>Epost:</strong> epost@epost.com</p>
            </div>
        )}
    </div>
    );
};
export default KontaktOss;