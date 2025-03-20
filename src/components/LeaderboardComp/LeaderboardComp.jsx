import React, { useEffect, useState } from 'react';
import "./LeaderboardComp.css";
import { firestore, auth } from "../../firebase";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import GamerStats from './GamerStats';

const LeaderboardComp = () => {
    
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [user] = useAuthState(auth);

    const hangbertRef = collection(firestore, "hangbert");

    

    const fetchHangbertData = async () => {
        try {
            const hangbertQuery = query(hangbertRef, orderBy("hangbertWins", "desc"));
            const innhenting = await getDocs(hangbertQuery);

            const hangbertData = innhenting.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })).filter(gamer => gamer.displayName !== ("noName" || "Anonym"));
            

            setLeaderboardData(hangbertData);

        } catch (error) { console.error("Error fetching from the database: ", error);}

    };

    useEffect(() => {
        fetchHangbertData();
    }, []); //utfør fetchHangbertData når komponenten rendres

    return (
        <div className="leaderboard-wrapper">
            <h1>Leaderboard</h1>
            <div className="leaderboard-header">
                <h2>Name</h2>
                <h2>Wins</h2>
            </div>
            <div className="leaderboard-content">
                {leaderboardData.map((Gamer) => (
                    <GamerStats key={Gamer.id} gamer={Gamer} currentUser={user} />
                ))}
            </div>
        </div>
    );

    
}

export default LeaderboardComp;