import ChatBox from '../components/ChatBox/ChatBox';
import '../stylesheet/App.css';
import { auth } from "../firebase"; 
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "../components/userAuth/SignIn";
import SignOut from '../components/userAuth/SignOut';
import ChatPage from './ChatPage';

const ChatOrLoginPage = () => {
    const [user] = useAuthState(auth);
    return (
        <div className="App">
            {user ? <ChatBox /> : <SignIn />}
            
        </div>
    );
};

export default ChatOrLoginPage;