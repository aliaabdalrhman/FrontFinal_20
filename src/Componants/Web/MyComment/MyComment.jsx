import { Box, CardActions, Toolbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import style from './MyComment.module.css'
import { Card, CardContent, Typography, Avatar, Collapse, Button } from '@mui/material';
import Slider from "react-slick";
import SendIcon from '@mui/icons-material/Send';
// import UserList from './UserList';
// import Message from './Message';
import { InputText } from "primereact/inputtext";
import axios from 'axios';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

export default function MyComment() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    let [posts, setPosts] = useState([]);

    async function getPostsContainMyComment() {
        try {
            let { data } = await axios.get(`http://localhost:3700/userDo/${localStorage.getItem('email')}/viewMyComments`);
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

    async function getUserInfo() {
        try {
            let { data } = await axios.get(`http://localhost:3700/userDo/${localStorage.getItem('email')}/viewMyPersonalInformation`);
            { data.image == null ? setImage(null) : setImage(data.image.secure_url) }
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

    const handleDeleteComment = (communityname, postId, useremail, commentId) => {
        const confirmDelete = () => {
            if (window.confirm('are you sure to delete this comment ?')) {
                const apiUrl = `http://localhost:3700/comments/${communityname}/${postId}/${useremail}/deleteComment/${commentId}`;
                axios.delete(apiUrl, { data: { communityname: communityname, postId: postId, user_email: useremail, commentId: commentId } })
                    .then(response => {
                        toast.success('successfully deleted comment')
                        getPostsContainMyComment(); // إعادة تحميل قائمة المستخدمين بعد الحذف
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        toast.error('error in delete');
                    });
            }
        };
        confirmDelete();
    };

    useEffect(() => {
        getUserInfo();
        getPostsContainMyComment()
    }, [])


    return (
        <div className="sid">
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Toolbar />
                {posts.map((post, index) =>
                    <Box className='d-flex justify-content-center' key={index}>

                        <Card variant="outlined " className={`shadow-sm ${style.card}`} >
                            <Box sx={{ p: 1 }} >
                                <Box style={{ display: 'flex', alignItems: 'center' }}>
                                    {post.postCreatorImage == null ? <Avatar className='border' alt='' /> : <Avatar className='border' src={post.postCreatorImage.secure_url} alt='' />}
                                    <div style={{ marginLeft: '10px' }}>
                                        <div className='d-flex'>
                                            <Typography variant="h6" className='font me-2 mt-1 '>{post.postDetails.user_name}</Typography>
                                            <Typography className='font mt-2'> {post.postDetails.post_type == 'owner' ? 'is display this product' : 'is requests this product'}</Typography>
                                        </div>
                                        <Typography variant="subtitle2" color="textSecondary" className='font'>
                                            {post.postDetails.createdAt && format(new Date(post.postDetails.createdAt), 'dd-MM-yyyy')}
                                        </Typography>
                                    </div>
                                </Box>
                                <Box sx={{ mt: 3 }} style={{ display: 'flex' }}>
                                    <Box className={` ms-2 ${style.content}`} >
                                        {post.postDetails.properties.map((property, propertyIndex) =>
                                            <>
                                                <div>
                                                    {property.property == 'Name' ? <p className={`${style.title1}`}>{property.value} </p> : ''}
                                                </div>

                                                <div>
                                                    <div className={`d-flex  mb-4 ${style.textcontainer}`} key={propertyIndex}>
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
                                            {post.postDetails.Images.map((image) =>
                                                <div className=" text-center d-flex justify-content-center " >
                                                    {image == null ? <img className={`${style.img}`}></img> : <img src={image.secure_url} className={`${style.img}`}></img>}
                                                </div>)}
                                        </Slider>
                                    </Box>
                                </Box>
                            </Box>
                            <Typography color="textSecondary" sx={{ fontSize: '13px', ml: 2, mb: 1 }} className='font'>
                                {/* {post.post.like} like , {post.commentsNumber} comment */}
                            </Typography>
                            <Box sx={{ borderTop: '1px solid #0000002c' }} className={`d-flex justify-content-center  ${style.action}`} >
                                <Box
                                    sx={{ borderRight: '1px solid #0000002c', width: '100%', cursor: 'pointer' }}
                                    onClick={() => handleToggleComments(post.postDetails._id)}
                                    className={`d-flex justify-content-center text-center p-2 ${style.action1}`}
                                >
                                    <i className="fa-regular fa-comment" style={{ fontSize: 25, color: '#918d99', marginLeft: '10px', marginRight: '5px' }}></i>
                                    <Typography variant="" sx={{ fontSize: '16px' }} color="textSecondary" className='font'>
                                        Comment
                                    </Typography>
                                </Box>
                            </Box>
                            <Collapse in={commentsMap[post.postDetails._id] || false}>
                                <Box sx={{ borderTop: '1px solid #0000002c', maxHeight: 170, height: 'auto', overflow: 'auto' }} >
                                    {post.comments.map((comment, commentIndex) => (
                                        <div key={commentIndex}>
                                            <Box className='d-flex alignItems-center mt-3'>
                                                {image == null ? <Avatar
                                                    sx={{ ml: 1 }} alt='' fullWidth /> : <Avatar
                                                    src={image}
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
                                                    <i className="fa-solid fa-trash  me-2"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => handleDeleteComment(post.postDetails.community_name, post.postDetails._id, post.postDetails.user_email, comment._id)} />

                                                    {format(new Date(comment.createdAt), 'dd-MM-yyyy')}

                                                </p>
                                            )}

                                        </div>
                                    ))}
                                </Box>
                            </Collapse>
                        </Card>
                    </Box >
                )
                }
            </Box >
        </div >
    )
}
