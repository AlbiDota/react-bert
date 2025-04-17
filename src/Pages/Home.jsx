import '../stylesheet/App.css';
import Catalog from '../components/CatalogComp/Catalog.jsx';
import { mirrorEasing, motion, reverseEasing } from 'framer-motion';
const Home = () => {
    return (
        <div className="App">
            <motion.img src="/Assets/bert.png" className="App-logo" alt="logo" 
				style={{}}
				animate={{rotate:"360deg",}}
				transition={{duration:6, repeat: Infinity, repeatType: "mirror" ,}}
            />
            <h1 style={{userselect: "none"}}>react-bert</h1>
            <Catalog/>
            
        </div>
    );
};

/*
      <style>
        .libutton {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 7px;
          text-align: center;
          outline: none;
          text-decoration: none !important;
          color: #ffffff !important;
          width: 200px;
          height: 32px;
          border-radius: 16px;
          background-color: #0A66C2;
          font-family: "SF Pro Text", Helvetica, sans-serif;
        }
      </style>
<a class="libutton" 
href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=albert-einarssønn123" 
target="_blank">Follow on LinkedIn</a>
*/
export default Home;