import { useOktaAuth } from '@okta/okta-react';
import { useState } from 'react';
import MessageService from '../../services/MessageService';
//import MessageModel from '../../../models/MessageModel';

export const PostNewMessage = () => {
    
    const { authState } = useOktaAuth();
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    const submitNewQuestion = async() =>{
        //const url = `http://localhost:8181/messages/add/message`; 
        await MessageService.createMessage(title, question);
        
        // if (title !== '' && question !== '') {
        //     setTitle('');
        //     setQuestion('');
        //     setDisplayWarning(false);
        //     setDisplaySuccess(true);
        // } else {
        //     setDisplayWarning(true);
        //     setDisplaySuccess(false);
        // }
    }
    
    return (
        <div className='card mt-3'>
            <div className='card-header'>
                Ask question to Admin
            </div>
            <div className='card-body'>
                <form method='POST'>
                    {displayWarning && 
                        <div className='alert alert-danger' role='alert'>
                            All fields must be filled out
                        </div>
                    }
                    {displaySuccess && 
                        <div className='alert alert-success' role='alert'>
                            Question added successfully
                        </div>
                    }
                    <div className='mb-3'>
                        <label className='form-label'>
                            Title
                        </label>
                        <input type='text' className='form-control' id='exampleFormControlInput1' 
                            placeholder='Title' onChange={e => setTitle(e.target.value)} value={title}/>
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>
                            Question
                        </label>
                        <textarea className='form-control' id='exampleFormControlTextarea1' 
                            rows={3} onChange={e => setQuestion(e.target.value)} value={question}>
                        </textarea>
                    </div>
                    <div>
                        <button type='button' className='btn btn-primary mt-3' onClick={submitNewQuestion}>
                            Submit Question
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}