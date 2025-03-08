import ChatBox from '../components/ChatBox/ChatBox';
import '../stylesheet/App.css';
import SignIn from "../components/userAuth/SignIn";
import { auth } from "../firebase"; 
import { useAuthState } from "react-firebase-hooks/auth";

const ChatPage = () => {
    const [user] = useAuthState(auth);
    return (
        <div className="App">
            {user ? <ChatBox /> : <SignIn />}
            
        </div>
    );
};

export default ChatPage;