import useAuthUser from "../hook/getUser";
import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import { Link, Route, useHistory } from "react-router-dom";
import { PostNewMessage } from "../components/MessageComponents/PostNewMessage";


const Messages = () => {

    const [messagesClick, setMessagesClick] = useState(false);


    return (
        <div className='container'>
            <div className='mt-3 mb-2'>
                <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                        <button onClick={() => setMessagesClick(false)} className='nav-link active' 
                            id='nav-send-message-tab' data-bs-toggle='tab' data-bs-target='#nav-send-message' 
                            type='button' role='tab' aria-controls='nav-send-message' aria-selected='true'>
                                Submit Question
                        </button>
                        <button onClick={() => setMessagesClick(true)} className='nav-link' 
                            id='nav-message-tab' data-bs-toggle='tab' data-bs-target='#nav-message' 
                            type='button' role='tab' aria-controls='nav-message' aria-selected='false'>
                                Q/A Response/Pending
                        </button>
                    </div>
                </nav>
                <div className='tab-content' id='nav-tabContent'>
                    <div className='tab-pane fade show active' id='nav-send-message' role='tabpanel' 
                        aria-labelledby='nav-send-message-tab'>
                            <PostNewMessage/>
                    </div>
                    <div className='tab-pane fade' id='nav-message' role='tabpanel' aria-labelledby='nav-message-tab'>
                        {messagesClick ? <p>Messages</p> : <></>}
                        {/* {messagesClick ? <Messages/> : <></>} */}
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Messages;