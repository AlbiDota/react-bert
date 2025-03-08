import ChatBox from '../components/ChatBox/ChatBox';
import '../stylesheet/App.css';
import ChatRoom from '../components/ChatRoom';
import SignIn from '../components/userAuthComponent/SignIn';


const ChatPage = () => {
    return (
        <div className="App">
            <section>
                {user ? <ChatRoom/> : <SignIn/> }
            </section>
        </div>
    );
};

export default ChatPage;