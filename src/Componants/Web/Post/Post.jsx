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
import { format } from 'date-fns';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

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

    const [comments, setComments] = useState([]);
    let [posts, setPosts] = useState([]);
    async function getPosts() {
        try {
            let { data } = await axios.get(`http://localhost:3700/communities/${communityname}/viewPosts`);
            setPosts(data);
            const initialCommentsState = {};
            const initialNewCommentsState = {};
            data.forEach((post) => {
                initialCommentsState[post.post._id] = false;
                initialNewCommentsState[post.post._id] = '';
            });
            setCommentsMap(initialCommentsState);
            setNewComments(initialNewCommentsState);
        } catch (error) {
            console.log('error:', error);
        }
    }

    const [image, setImage] = useState({});
    const [myId, setMyId] = useState('')
    async function getUserInfo() {
        try {
            let { data } = await axios.get(`http://localhost:3700/userDo/${localStorage.getItem('email')}/viewMyPersonalInformation`);
            { data.image == null ? setImage(null) : setImage(data.image.secure_url) }
            setMyId(data._id);
        }
        catch (error) {
            console.log('error:', error);
        }
    }
    const [commentsMap, setCommentsMap] = useState({}); // Map to store comments for each post
    const [newComments, setNewComments] = useState({});

    const handleToggleComments = (postId) => {
        setCommentsMap((prevCommentsMap) => ({
            ...prevCommentsMap,
            [postId]: !prevCommentsMap[postId],
        }));
    };
    const handleCommentInputChange = (postId, value) => {
        setNewComments((prevNewComments) => ({
            ...prevNewComments,
            [postId]: value,
        }));
    };
    const [CommentSubmitting, setCommentSubmitting] = useState(false);
    const handleCommentSubmit = async (communityName, userEmail, postId) => {

        try {
            const inputValue = newComments[postId];
            if (inputValue.trim() !== '') {
                // Set loading state while sending the comment
                setCommentSubmitting(true);

                // Send comment to the server and update the comments for the specific post
                const { data } = await axios.post(`http://localhost:3700/comments/${communityName}/${postId}/${userEmail}/createComment`, { content: inputValue });
                if (data.msg == 'this comment created successfully') {
                    toast.success('comment created successfully');
                }
                getPosts();
                // Reset the input value for the specific post
                setNewComments((prevNewComments) => ({
                    ...prevNewComments,
                    [postId]: '',
                }))

                // Clear loading state
                setCommentSubmitting(false);
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
            // Clear loading state
            setCommentSubmitting(false);
        }
    };
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const handleLikeClick = async (postId) => {
        try {
            // Replace 'your-api-endpoint' with the actual endpoint of your API
            const response = await axios.post(`http://localhost:3700/userDo/${postId}/like/${myId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            );
            console.log(response.data);
            if (response.status === 200) {
                setIsLiked(true);
                setLikesCount(likesCount + 1);
                getPosts();
            } else {
                console.error('Failed to like the post');
            }
        } catch (error) {
            console.error('Error liking the post', error);
        }
    };

    const [selectedUser, setSelectedUser] = useState(null);
    const [select, setSelect] = useState(true);
    const handleUserClick = (user) => {
        setSelectedUser(user);
        setSelect(!select);
    };

    const users = [
        // { id: 1, name: 'Batool Saleh' },
        { id: 2, name: 'Raghad Suwan' },
        // { id: 3, name: 'Shaimaa Mukahal' },
        // { id: 4, name: 'Raghad Yaseen' },
    ];
    const [postShowNewBox, setPostShowNewBox] = useState({});
    const handleBoxClick = (postId) => {
        setPostShowNewBox((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    };

    useEffect(() => {
        getUserInfo();
        getPosts();
        console.log(posts)
    }, [])

    return (

        <Box  >
            {posts.map((post, index) =>
                <Box className='d-flex justify-content-center' key={index}>
                    <Card variant="outlined " className={`shadow-sm ${style.card}`} >
                        <Box sx={{ p: 1 }} >
                            <Box style={{ display: 'flex', alignItems: 'center' }}>
                                {post.post.userImage == null ? <Avatar className='border' alt='' /> : <Avatar src={post.post.userImage.secure_url} className='border' alt='' />}
                                <div style={{ marginLeft: '10px' }}>
                                    <div className='d-flex'>
                                        <Typography variant="h6" className='font me-2 mt-1 '>{post.post && post.post.user_name ? post.post.user_name : 'Unknown User'}
                                        </Typography>
                                        <Typography className='font mt-2'> {post.post.post_type == 'owner' ? 'is display this product' : 'is requests this product'}</Typography>
                                    </div>
                                    <Typography variant="subtitle2" color="textSecondary" className='font'>
                                        {post.post.createdAt && format(new Date(post.post.createdAt), 'dd-MM-yyyy')}
                                    </Typography>
                                </div>
                            </Box>
                            <Box sx={{ mt: 2 }} style={{ display: 'flex' }}>
                                <Box className={` ms-2  ${style.content}`} >
                                    {post.post.properties.map((property, propertyIndex) =>
                                        <>
                                            <div>
                                                {property.property == 'Name' ? <p className={`${style.title1}`}>{property.value} </p> : ''}
                                            </div>
                                            <div>
                                                <div className="d-flex  mb-4" key={propertyIndex}>
                                                    {property.property !== 'Name' ? <>
                                                        <p className={`${style.title}`}>{property.property} :</p>
                                                        <p className={`${style.info}`}>{property.value} </p>
                                                    </> : ''}

                                                </div>
                                            </div>
                                        </>
                                    )}
                                </Box>
                                <Box className={`w-100 ${style.Slid}`} >
                                    <Slider className={`w-50`} {...settings}>
                                        {post.post.Images.map((image) =>
                                            <div className=" text-center d-flex justify-content-center " >
                                                {image == null ? <img className={`${style.img}`}></img> : <img src={image.secure_url} className={`${style.img}`}></img>}
                                            </div>)}
                                    </Slider>
                                </Box>
                            </Box>
                        </Box>
                        <Typography color="textSecondary" sx={{ fontSize: '13px', ml: 2, mb: 1 }} className='font'>
                            {post.likesNumber} like ,  {post.commentsNumber} comment
                        </Typography>
                        <Box sx={{ borderTop: '1px solid #0000002c' }} className={`d-flex justify-content-center  ${style.action}`} >
                            <Box
                                sx={{ borderRight: '1px solid #0000002c', width: '33.33%', cursor: 'pointer' }}
                                className={`d-flex justify-content-center text-center p-2 ${style.action1}`}
                            >
                                {post.likesInfo.some(like => like.userId === myId) ? (
                                    <i
                                        className={`fa-solid fa-thumbs-up`}
                                        style={{
                                            color: '#156ac0',
                                            fontSize: 25,
                                            marginLeft: '10px',
                                            marginRight: '5px',
                                        }}
                                        onClick={() => handleLikeClick(post.postId)}
                                    ></i>
                                ) : (
                                    <i
                                        className={`fa-regular fa-thumbs-up`}
                                        style={{
                                            color: '#918d99',
                                            fontSize: 25,
                                            marginLeft: '10px',
                                            marginRight: '5px',
                                        }}
                                        onClick={() => handleLikeClick(post.postId)}
                                    ></i>
                                )}
                                <Typography variant="" sx={{ fontSize: '16px', mr: 2 }} color="textSecondary" className='font'>
                                    Likes
                                </Typography>
                            </Box>
                            <Box
                                sx={{ borderRight: '1px solid #0000002c', width: '33.33%', cursor: 'pointer' }}
                                onClick={() => handleToggleComments(post.post._id)}
                                className={`d-flex justify-content-center text-center p-2 ${style.action1}`}
                            >
                                <i className="fa-regular fa-comment" style={{ fontSize: 25, color: '#918d99', marginLeft: '10px', marginRight: '5px' }}></i>
                                <Typography variant="" sx={{ fontSize: '16px' }} color="textSecondary" className='font'>
                                    Comment
                                </Typography>
                            </Box>
                            <Box
                                sx={{ width: '33.33%', cursor: 'pointer' }}
                                className={`d-flex justify-content-center text-center p-2 ${style.action1}`}
                                onClick={() => handleBoxClick(post.post._id)}                            >
                                <i className="fa-regular fa-message" style={{ fontSize: 25, marginLeft: '10px', color: '#918d99', marginRight: '5px' }}></i>
                                <Typography variant="" sx={{ fontSize: '16px', mr: 2 }} color="textSecondary" className='font'>
                                    Message
                                </Typography>
                            </Box>
                        </Box>
                        <Collapse in={commentsMap[post.post._id] || false}>
                            <Box sx={{ borderTop: '1px solid #0000002c', maxHeight: 170, height: 'auto', overflow: 'auto' }} >
                                {post.comments.map((comment, commentIndex) => (
                                    <div key={commentIndex}>
                                        <Box className='d-flex alignItems-center mt-3'>
                                            {comment.userImage == null ? <Avatar sx={{ ml: 1 }} alt='' fullWidth /> : <Avatar
                                                src={comment.userImage.secure_url}
                                                sx={{ ml: 1 }} alt='' fullWidth />}
                                            <Box sx={{ ml: 1 }} className={`${style.commentcontent}`}>
                                                <p className={`font ${style.commentUser}`}>
                                                    {comment.user_name}
                                                </p>
                                                <p variant="h6" style={{ fontSize: '15px' }} className='font'>
                                                    {comment.content}
                                                </p>
                                            </Box>
                                        </Box>
                                        {comment.createdAt && (
                                            <p className={style.date}>
                                                {format(new Date(comment.createdAt), 'dd-MM-yyyy')}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </Box>
                            <CardContent>
                                <Box className='d-flex align-items-center'>
                                    <Avatar src={image} className='border me-2' alt='' fullWidth />
                                    <InputText
                                        id={`content-${post.post._id}`}
                                        type='text'
                                        placeholder='Add a comment...'
                                        className={` w-100 ${style.sendmsg}`}
                                        value={newComments[post.post._id]}
                                        onChange={(e) => handleCommentInputChange(post.post._id, e.target.value)}
                                        name={`content-${post.post._id}`}
                                    />
                                    <SendIcon
                                        className='ms-2 '
                                        type='submit'
                                        onClick={() => handleCommentSubmit(post.post.community_name, localStorage.getItem('email'), post.post._id)}
                                        style={{ cursor: 'pointer', fontSize: '30px', color: '#156ac0' }}
                                    />
                                </Box>
                            </CardContent>
                        </Collapse>
                    </Card>
                    {postShowNewBox[post.post._id] && (
                        <Box sx={{ mt: 2, mb: 2 }} >
                            <Card className={`shadow-sm  ${style.msgCard}`} sx={{ maxHeight: 500, height: 406, overflow: 'auto' }}  >
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
            )}

        </Box >
    )
}
