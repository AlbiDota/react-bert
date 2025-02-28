import logo from '../bert.png';
import '../App.css';
import LoggInn from '../components/LoggInn';
import KontaktOss from '../components/KontaktOss';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
    return (
        <div className="App">
            <img src={logo} className="App-logo" alt="logo" /> <br/><br/><br/><br/><br/><br/><br/><br/>
            <h1>LOGG INN</h1>
            <LoggInn/> <br/><br/><br/><br/><br/><br/><br/><br/>

            <h1>KONTAKT OSS</h1>
            <KontaktOss/> <br/><br/><br/><br/><br/><br/><br/><br/>

            <h1>WORKOUT FORM</h1>
            <WorkoutForm/> <br/><br/><br/><br/><br/><br/><br/><br/>

        </div>
    );
};

export default Home;