import { Avatar, Box, Card } from '@mui/material'
import React, { useState } from 'react'
import style from './CreatePost.module.css'
import { InputText } from 'primereact/inputtext';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material';
import { Button } from '@mui/material';
export default function CreatePost() {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <Box className='d-flex justify-content-center'>
            <Card variant="outlined " className={`shadow-sm ${style.card}`}>
                <div className={`d-flex  ${style.content}`}>
                    <Avatar src='img/image1.jpg' className='border' sx={{ width: '62px', height: '62px', mr: 2 }} fullWidth />
                    <label htmlFor="" className={`${style.TextField1}`} onClick={handleClickOpen}>
                        <Box className='ms-3 mt-3' >
                            Create a post ...
                        </Box>
                    </label>
                </div>
            </Card>
            <Dialog open={open} fullWidth maxWidth="xl" sx={{ width: '800px', margin: 'auto' }}>
                <DialogTitle className='d-flex justify-content-center'>
                    <div className={`font ${style.Title} `}>
                        Create a Post
                    </div>
                    <div className='ms-auto'>
                        <i className="fa-solid fa-xmark " onClick={handleClose} style={{ cursor: 'pointer' }}></i>
                    </div>
                </DialogTitle>
                <DialogContent style={{ overflow: 'hidden' }}>
                    <Divider className='border-black mb-3' />
                    <DialogContentText>

                    </DialogContentText>
                </DialogContent>
            </Dialog >
        </Box>

    )
}
