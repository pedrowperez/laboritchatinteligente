
import React, { useState, useEffect, useRef } from 'react';
import { getChatResponse } from '../../server';
import CloudChat from '../../components/cloudChat';
import imgSend from '../../assets/img/chat/IconSend.svg';
import imgCompare from '../../assets/img/chat/IconCompare.svg';
import '../../assets/style/Chat.css';

const ChatBot = () => {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRegenerating, setIsRegenerating] = useState(false);
    const chatWindowContentRef = useRef(null);

    const handleSend = async () => {
        if (!inputText.trim()) {
            setError('A entrada não pode estar vazia. Por favor, digite uma mensagem.');
            return;
        }
        setError('');
        setIsLoading(true);
        const userMessage = { text: inputText, user: true };
        setMessages(prevMessages => [...prevMessages, userMessage]);

        try {
            const response = await getChatResponse(inputText);
            const botMessage = { text: response, user: false };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
            setError('Erro ao obter resposta. Tente novamente.');
        } finally {
            setIsLoading(false);
            setInputText('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) {
            handleSend();
        }
    };

    const handleEdit = async (index) => {
        const newMessage = prompt('Edite sua mensagem:', messages[index].text);
        if (newMessage !== null && newMessage.trim() !== '') {
            setIsLoading(true);
            const updatedMessages = [...messages];
            updatedMessages[index].text = newMessage;

            try {
                const response = await getChatResponse(newMessage);
                updatedMessages[index + 1].text = response;
                setMessages(updatedMessages);
            } catch (error) {
                setError('Erro ao obter resposta. Tente novamente.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleRegenerateMessage = async () => {
        if (messages.length > 0) {
            setIsRegenerating(true);
            const lastUserMessageIndex = messages.map(m => m.user).lastIndexOf(true);
            const lastUserMessage = messages[lastUserMessageIndex].text;

            try {
                const response = await getChatResponse(lastUserMessage);
                setMessages(prevMessages => {
                    const updatedMessages = [...prevMessages];
                    updatedMessages[updatedMessages.length - 1].text = response;
                    return updatedMessages;
                });
            } catch (error) {
                setError('Erro ao regenerar resposta. Tente novamente.');
            } finally {
                setIsRegenerating(false);
            }
        }
    };

    useEffect(() => {
        if (chatWindowContentRef.current) {
            chatWindowContentRef.current.scrollTop = chatWindowContentRef.current.scrollHeight;
        }
        window.scrollTo(0, document.body.scrollHeight);
    }, [messages]);

    const initialState = (
        <div className="initial-state">
            <h2>BrainBox</h2>
            <div className="info">
                <p>Remembers what user said earlier in the conversation</p>
                <p>Allows user to provide follow-up corrections with AI</p>
                <p>Limited knowledge of world and events after 2021</p>
                <p>May occasionally generate incorrect information</p>
                <p>May occasionally produce harmful instructions or biased content</p>
            </div>
        </div>
    );

    return (
        <div className="chatbot-container">
            <div className="chat-window">
                <div className="chat-window-content" ref={chatWindowContentRef}>
                    {messages.length === 0 ? (
                        initialState
                    ) : (
                        messages.map((message, index) => (
                            <React.Fragment key={index}>
                                <CloudChat 
                                    message={message} 
                                    index={index} 
                                    onEdit={handleEdit} 
                                    className={isRegenerating && index === messages.length - 1 && !message.user ? 'regenerating' : ''}
                                />
                                {index === messages.length - 1 && !message.user && (
                                    <button 
                                        className='btn-regenerate' 
                                        onClick={handleRegenerateMessage} 
                                        disabled={isLoading}
                                    >
                                        <img src={imgCompare} alt="Regenerate message" /> Regenerate message
                                    </button>
                                )}
                            </React.Fragment>
                        ))
                    )}
                </div>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="input-container"> 
                <div className='input-box'>
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Send a message."
                        disabled={isLoading}
                    />
                    <button onClick={handleSend} disabled={!inputText.trim() || isLoading}>
                        <img src={imgSend} alt="Enviar mensagem" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
