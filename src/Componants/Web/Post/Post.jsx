import { Box, CardActions } from '@mui/material'
import React, { useEffect, useState } from 'react'
import style from './Post.module.css'
import { Card, CardContent, Typography, Avatar, Collapse, Button } from '@mui/material';
import Slider from "react-slick";
import SendIcon from '@mui/icons-material/Send';
import UserList from './UserList';
import Message from './Message';
import { InputText } from "primereact/inputtext";
import axios from 'axios';

export default function Post({ communityname }) {

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

    const [isLiked, setIsLiked] = useState(false);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    // const [postComments, setPostComments] = useState(comments);
    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };
    const handleToggleComments = () => {
        setIsCommentsOpen(!isCommentsOpen);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim() !== '') {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    const [selectedUser, setSelectedUser] = useState(null);

    const [select, setSelect] = useState(true);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setSelect(!select);
    };

    const users = [
        { id: 1, name: 'Batool Saleh' },
        { id: 2, name: 'Raghad Suwan' },
        { id: 3, name: 'Shaimaa Mukahal' },
        { id: 4, name: 'Raghad Yaseen' },
    ];
    let [posts, setPosts] = useState([]);

    async function getPosts(communityname) {
        try {
            let { data } = await axios.get(`https://abr-dcxu.onrender.com/communities/${communityname}/viewPosts`);
            console.log(data);
            setPosts(data);
        }
        catch (error) {
            console.log('error:', error);
        }
    }

    useEffect(() => {
        // getPosts(communityname);

    }, [])



    return (

        <Box  >
            {/* <Card variant="outlined " className={`shadow-sm ${style.card}`} >
                <CardContent>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src='img/image1.jpg' alt='' />
                        <div style={{ marginLeft: '10px' }}>
                            <div className='d-flex'>
                                <Typography variant="h6" className='me-2'>Alia Abdalrhman</Typography>
                                <Typography className='mt-1'> is exposed this product</Typography>
                            </div>
                            <Typography variant="subtitle2" color="textSecondary">
                                10:30 Am 25.Oct.2023
                            </Typography>
                        </div>
                    </Box>
                    <Box style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                        <Box className={` ms-2  ${style.content}`} >
                            <h3 className={`mb-3 ${style.Title}`}>iPhone 13 Pro Max </h3>
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
                                    Gold
                                </p>
                            </div>
                            <div className="d-flex  mb-2">
                                <p className={`${style.title}`}>Note:</p>
                                <p className={`${style.info}`}>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing.                                       </p >
                            </div>
                        </Box>
                        <Box className={`w-50 ms-2 ${style.Slider}`} >
                            <Slider {...settings}>
                                <div className="col-md-4 text-center d-flex justify-content-center w-100" >
                                    <div >
                                        <img className={`${style.img}`} src='images/iphone.jpeg' alt='this is image' />
                                    </div>
                                </div>
                                <div className="col-md-4 text-center d-flex justify-content-center" >
                                    <div  >
                                        <img className={`${style.img}`} src='images/iphone1.jpeg' alt='this is image' />
                                    </div>
                                </div>
                                <div className="col-md-4 text-center d-flex justify-content-center" >
                                    <div  >
                                        <img className={`${style.img}`} src='images/iphone2.jpeg' alt='this is image' />
                                    </div>
                                </div>
                            </Slider>
                        </Box>
                    </Box>
                </CardContent>
                <Box sx={{ borderTop: '1px solid #0000002c' }} >
                    <CardActions className='d-flex justify-content-center ' >
                        <Box sx={{ borderRight: '1px solid #0000002c', width: '50%' }} className='d-flex justify-content-center text-center ' >
                            <i className="fa-regular fa-thumbs-up" style={{ fontSize: 22, marginLeft: '10px', marginRight: '5px' }} />
                            <Typography variant="" className='me-2' color="textSecondary">
                                34 Likes
                            </Typography>
                        </Box>
                        <Box sx={{ width: '50%' }} className='d-flex justify-content-center text-center '>
                            <i class="fa-regular fa-comment" style={{ fontSize: 22, marginLeft: '10px', marginRight: '5px' }}></i>
                            <Typography variant="" className='me-2' color="textSecondary">
                                20 Comments
                            </Typography>
                        </Box>

                    </CardActions>
                </Box>
                <Collapse in={isCommentsOpen}>
                    <CardContent sx={{ borderTop: '1px solid #0000002c' }} >
                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src='images/myphoto.jpg' alt='' fullWidth />
                            <Box sx={{ mt: 1, mb: 1 }} style={{ marginLeft: '10px' }}>
                                <Typography variant="h7">Raghad Suwan </Typography>
                                <Typography variant="subtitle2" color="textSecondary">
                                    <p> comment ,Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo, laboriosam!</p>
                                </Typography>
                            </Box>
                        </Box>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src='images/myphoto.jpg' alt='' fullWidth />
                            <Box style={{ marginLeft: '10px' }}>
                                <Typography variant="h7">Batool Saleh</Typography>
                                <Typography variant="subtitle2" color="textSecondary">
                                    <p> comment ,Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo, laboriosam!</p>
                                </Typography>
                            </Box>
                        </div>
                    </CardContent>
                    <CardContent>
                        <Box style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src='img/image1.jpg' className='me-2' alt='' fullWidth />
                            <TextField
                                fullWidth
                                multiline
                                rows={1}
                                placeholder="Add a comment..."
                                // value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                        </Box>
                        <Button
                            variant="outlined"
                            onClick={handleCommentSubmit}
                            style={{ marginTop: '10px' }}
                            className='button ms-5'
                        >
                            Comment <SendIcon className='ms-2' />
                        </Button>
                    </CardContent>
                </Collapse>
            </Card> */}

            <Box className='d-flex justify-content-center'>
                <Card variant="outlined " className={`shadow-sm ${style.card}`} >

                    {/* {posts.map((post) => */}
                        <Box sx={{ p: 1 }}>
                            <Box style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar className='border' src='img/image1.jpg' alt='' />
                                <div style={{ marginLeft: '10px' }}>
                                    <div className='d-flex'>
                                        <Typography v0ariant="h6" className='font me-2 m-1 '>Alia abdalrhman</Typography>
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
                    {/* )} */}
                    <Box sx={{ borderTop: '1px solid #0000002c' }} className={`d-flex justify-content-center  ${style.action}`} >
                        <Box sx={{ borderRight: '1px solid #0000002c', width: '33.33%', cursor: 'pointer' }}
                            onClick={handleLikeClick}
                            className={`d-flex justify-content-center text-center p-2 ${style.action1}`}>
                            {isLiked ? <i className="fa-solid fa-thumbs-up" style={{ color: '#156ac0', fontSize: 25, marginLeft: '10px', marginRight: '5px' }}></i> : <i className="fa-regular fa-thumbs-up" style={{ fontSize: 25, color: '#918d99', marginLeft: '10px', marginRight: '5px' }}></i>}
                            <Typography variant="" sx={{ fontSize: '16px', mr: 2 }} color="textSecondary" className='font'>
                                Likes
                            </Typography>
                        </Box>
                        <Box sx={{ borderRight: '1px solid #0000002c', width: '33.33%', cursor: 'pointer' }}
                            onClick={handleToggleComments}
                            className={`d-flex justify-content-center text-center p-2 ${style.action1}`}>

                            <i className="fa-regular fa-comment" style={{ fontSize: 25, color: '#918d99', marginLeft: '10px', marginRight: '5px' }}></i>
                            <Typography variant="" sx={{ fontSize: '16px' }} color="textSecondary" className='font'>
                                Comment
                            </Typography>
                        </Box>
                        <Box sx={{ width: '33.33%', cursor: 'pointer' }}
                            className={`d-flex justify-content-center text-center p-2 ${style.action1}`}
                            onClick={handleBoxClick}
                        >
                            <i className="fa-regular fa-message" style={{ fontSize: 25, marginLeft: '10px', color: '#918d99', marginRight: '5px' }}></i>
                            <Typography variant="" sx={{ fontSize: '16px', mr: 2 }} color="textSecondary" className='font'>
                                Message
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
                {showNewBox && (
                    <Box sx={{ mt: 1 }} >
                        <Card className={`shadow-sm  ${style.msgCard}`} sx={{ maxHeight: 500, height: 500, overflow: 'auto' }}  >
                            <>
                                {select ? <>
                                    <Box sx={{ borderBottom: '1px solid #0000002c' }} className='d-flex justify-content-center gap-4'>
                                        <Typography variant='h6' sx={{ mt: 1, ml: 13 }} className='font'>
                                            Chats(4)
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            size='small'
                                            onClick={handleCommentSubmit}
                                            className={`font button mb-2 mt-2 ${style.outofstack} `} >
                                            Out Of Stack
                                        </Button>
                                    </Box>
                                    <div>
                                        <div>
                                            <UserList
                                                users={users}
                                                selectedUser={selectedUser}
                                                onUserClick={handleUserClick}
                                            />
                                        </div>
                                    </div>
                                </>
                                    : <>
                                        <div >
                                            {selectedUser && (
                                                <>
                                                    <Message select={select} setSelect={setSelect} selectedUser={selectedUser} />
                                                </>
                                            )}
                                        </div>
                                    </>
                                }
                            </>
                        </Card>

                    </Box>
                )}
            </Box >
        </Box >

    )
}
