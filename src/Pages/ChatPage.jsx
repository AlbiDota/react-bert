import ChatBox from '../components/ChatBox/ChatBox';
import '../stylesheet/App.css';
import SignIn from "../components/userAuth/SignIn";

const ChatPage = () => {
    return (
        <div className="App">
            {user ? <ChatPage /> : <SignIn />}
            
        </div>
    );
};

export default ChatPage;