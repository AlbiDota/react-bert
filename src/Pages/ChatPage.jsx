import ChatBox from '../components/ChatBox/ChatBox';
import '../stylesheet/App.css';

const [user] = useAuthState(auth);

const ChatPage = () => {
    return (
        <div className="App">
            {user ? <ChatRoom/> : <SignIn/> }
            
        </div>
    );
};

export default ChatPage;