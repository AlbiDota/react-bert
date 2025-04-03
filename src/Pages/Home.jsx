import logo from '../bert.png';
import '../stylesheet/App.css';
import LoggInn from '../components/LoggInn';
import KontaktOss from '../components/KontaktOss';
import Catalog from '../components/CatalogComp/Catalog.jsx';


const Home = () => {
    return (
        <div className="App">
            <img src={logo} className="App-logo" alt="logo" /> <br/>
            <h1>react-bert</h1>
            <br/>
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