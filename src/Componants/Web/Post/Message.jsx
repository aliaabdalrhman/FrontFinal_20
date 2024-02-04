import React, { useState } from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { InputText } from "primereact/inputtext";
import style from './Post.module.css'
import SendIcon from '@mui/icons-material/Send';
export default function Message({ selectedUser, select, setSelect }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage !== '') {
            setMessages([...messages, newMessage]);
            setNewMessage('');
        }
    };
    const BackToMsgList = () => {
        setSelect(!select);
    }
    return (
        <div>
            <Box sx={{ borderBottom: '1px solid #0000002c', mb: 1 }} className='d-flex ' >
                <i className="fa-solid fa-chevron-left mt-4 ms-3 me-2" style={{ cursor: 'pointer', fontSize: '26px', color: '#156ac0' }} onClick={BackToMsgList}></i>
                <Avatar src='images/myphoto.jpg' alt='' className='ms-2 mt-3 mb-2' />
                <Typography variant="h6" className='font ms-2 mt-3'>{selectedUser.name}</Typography>
            </Box>
            <Box sx={{ height: '330px', overflowY: 'auto' }}>
                {messages.map((message, index) => (
                    <div key={index}>
                        <Box sx={{ ml: 1, mr: 1 }} className='d-flex gap-2 mt-2'>
                            <Avatar  />
                            <p className={`${style.msgcontent}`}>
                                Hello Aliaa, What is the duration of use, and what is the price ? 
                            </p>
                        </Box>
                        <Box sx={{ mb: 1, mr: 1, ml: 1 }}>
                            <Box className={`d-flex gap-2 `} style={{ justifyContent: 'flex-end', alignItems: 'center' }} >
                                <p className={` ${style.msgcontent1}`}>
                                    Hi Raghad, its 950$ .
                                </p>
                                <Avatar src='/Images/myphoto.jpg' className='mb-3' alt='' />
                            </Box>
                        </Box>
                    </div>
                ))
                }
            </Box >
            <Box sx={{ position: 'fixed', bottom: '10px' }} className='d-flex ms-3'>
                <InputText id="msg" type='text' placeholder='Type Your Message...' onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className={` ${style.sendmsg}`} />
                <SendIcon className='ms-2 mt-2' onClick={handleSendMessage} style={{ cursor: 'pointer', fontSize: '30px', color: '#156ac0' }} />
            </Box>
        </div >
    );
};