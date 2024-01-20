import { Box, CardActions } from '@mui/material'
import React, { useState } from 'react'
import style from './Post.module.css'
import { Card, CardContent, Typography, Avatar, Collapse, Button } from '@mui/material';
import Slider from "react-slick";
import SendIcon from '@mui/icons-material/Send';
import { InputText } from "primereact/inputtext";

export default function Post() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };
    const [showNewBox, setShowNewBox] = useState(false);

    const handleBoxClick = () => {
        setShowNewBox(!showNewBox);
    };
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
 
    const handleToggleComments = () => {
        setIsCommentsOpen(!isCommentsOpen);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim() !== '') {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

   

   
    return (

        <Box  >
            <Box className='d-flex justify-content-center'>
                <Card variant="outlined " className={`shadow-sm ${style.card}`} >
                    <Box sx={{ p: 1 }}>
                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar className='border' src='img/image1.jpg' alt='' />
                            <div style={{ marginLeft: '10px' }}>
                                <div className='d-flex'>
                                    <Typography variant="h6" className='font me-2 '>Alia abdalrhman</Typography>
                                    <Typography className='font mt-1'> is exposed this product</Typography>
                                </div>
                                <Typography variant="subtitle2" color="textSecondary" className='font'>
                                    10:30 Am   25.Oct.2023
                                </Typography>
                            </div>
                        </Box>
                        <Box style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                            <Box className={` ms-2  ${style.content}`} >
                                <p className={`mb-3 ${style.Title}`}>iPhone 11 Pro </p>
                                <div className="d-flex  mb-2">
                                    <p className={`${style.title}`}>Brand:</p>
                                    <p className={`${style.info}`}>
                                        iPhone
                                    </p>
                                </div>
                                <div className="d-flex  mb-2">
                                    <p className={`${style.title}`}>CPU:</p>
                                    <p className={`${style.info}`}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    </p>
                                </div>
                                <div className="d-flex  mb-2">
                                    <p className={`${style.title}`}>RAM:</p>
                                    <p className={`${style.info}`}>
                                        256GB
                                    </p >
                                </div>
                                <div className="d-flex  mb-2">
                                    <p className={`${style.title}`}>Internal Storage:</p>
                                    <p className={`${style.info}`} > 6GB</p>
                                </div>
                                <div className="d-flex  mb-2">
                                    <p className={`${style.title}`}>Resolution:</p>
                                    <p className={`${style.info}`}>
                                        2712*1220
                                    </p>
                                </div>
                                <div className="d-flex  mb-2">
                                    <p className={`${style.title}`}>size:</p>
                                    <p className={`${style.info}`}>
                                        (272*120)
                                    </p >
                                </div>
                                <div className="d-flex  mb-2">
                                    <p className={`${style.title}`}>Color:</p>
                                    <p className={`${style.info}`}>
                                        Black
                                    </p>
                                </div>
                                <div className="d-flex ">
                                    <p className={`${style.title}`}>Note:</p>
                                    <p className={`${style.info}`}>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit?
                                    </p >
                                </div>

                                <Typography color="textSecondary" sx={{ fontSize: '13px' }} className='font'>
                                    20 like ,  30 comment
                                </Typography>
                            </Box>
                            {/* <Box className={`w-50 ${style.Slid}`} > */}
                            <Slider className={`w-50 ${style.Slid}`} {...settings}>
                                <div className=" text-center d-flex justify-content-center " >
                                    <img className={`${style.img}`} src='images/iphone3.jpeg' alt='this is image' />
                                </div>
                                <div className=" text-center d-flex justify-content-center" >
                                    <img className={`${style.img}`} src='images/iphone4.jpeg' alt='this is image' />
                                </div>
                                <div className=" text-center d-flex justify-content-center" >
                                    <img className={`${style.img}`} src='images/iphone5.jpeg' alt='this is image' />
                                </div>
                            </Slider>
                            {/* </Box> */}
                        </Box>
                    </Box>

                    <Box sx={{ borderTop: '1px solid #0000002c' }} className={`d-flex justify-content-center  ${style.action}`} >


                        <Box sx={{ borderRight: '1px solid #0000002c', width: '100%', cursor: 'pointer' }}
                            onClick={handleToggleComments}
                            className={`d-flex justify-content-center text-center p-2 ${style.action1}`}>

                            <i className="fa-regular fa-comment" style={{ fontSize: 25, color: '#918d99', marginLeft: '10px', marginRight: '5px' }}></i>
                            <Typography variant="" sx={{ fontSize: '16px' }} color="textSecondary" className='font'>
                                Comment
                            </Typography>
                        </Box>

                    </Box>
                    <Collapse in={isCommentsOpen}>
                        <Box sx={{ borderTop: '1px solid #0000002c', maxHeight: 170, height: 'auto', overflow: 'auto' }} >
                            {comments.map((comment, index) => (
                                <div key={index}>
                                    <Box className='d-flex alignItems-center mt-3 '>
                                        <Avatar src='img/image1.jpg' sx={{ mt: 1, ml: 1 }} alt='' fullWidth />
                                        <Box sx={{ ml: 1 }} className={`${style.commentcontent}`} >
                                            <Typography variant="h7" className='font'>Alia abdalrhman</Typography>
                                            <Typography variant="subtitle2" style={{ fontSize: '15px' }} className='font'>
                                                {comment}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </div>
                            ))}
                        </Box>
                        <CardContent>
                            <Box className='d-flex align-items-center'>
                                <Avatar src='img/image1.jpg' className='border me-2' alt='' fullWidth />
                                <InputText id="msg" type='text' placeholder='Add a comment...' onChange={(e) => setNewComment(e.target.value)} className={` w-100 ${style.sendmsg}`} value={newComment} />
                                <SendIcon className='ms-2 ' onClick={handleCommentSubmit} style={{ cursor: 'pointer', fontSize: '30px', color: '#156ac0' }} />
                            </Box>
                        </CardContent>
                    </Collapse>

                </Card>
               
            </Box >
        </Box >

    )
}
