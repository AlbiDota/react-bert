import BettingPanel from '../components/BlackjackComp/BettingPanel';
import Blackjack from '../components/BlackjackComp/Blackjack';
import '../stylesheet/App.css';
const BlackjackPage = () => {


    return (
        <div className="App">
            <div className=''>
                {/* <BettingPanel/> */}
                <Blackjack/>
            </div>
        </div>
    );
};

export default BlackjackPage;