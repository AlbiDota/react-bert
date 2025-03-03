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
                <p><strong>Kontaktinfo!</strong></p>
                <p><strong>GitHub:</strong> <a href="https://github.com/AlbiDota">github.com/AlbiDota</a> </p>
                <p><strong>Epost:</strong> <a href="mailto:alisaele1@gmail.com">alisaele1@gmail.com </a> </p>
            </div>
        )}
    </div>
    );
};
export default KontaktOss;