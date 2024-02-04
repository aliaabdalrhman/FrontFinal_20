import { Box, CardActions, Toolbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import style from './Post.module.css'
import { Card, CardContent, Typography, Avatar, Collapse, Button } from '@mui/material';
import Slider from "react-slick";
import SendIcon from '@mui/icons-material/Send';
import { InputText } from "primereact/inputtext";
import axios from 'axios';
import { format } from 'date-fns';
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
    const [commentsMap, setCommentsMap] = useState({}); // Map to store comments for each post
    const handleToggleComments = (postId) => {
        setCommentsMap((prevCommentsMap) => ({
            ...prevCommentsMap,
            [postId]: !prevCommentsMap[postId],
        }));
    };
    let [posts, setPosts] = useState([]);
    async function getPosts() {
        try {
            let { data } = await axios.get(`http://localhost:3700/communities/${communityname}/viewPosts`);
            setPosts(data);
        }
        catch (error) {
            console.log('error:', error);
        }
    }
    const handleDeleteComment = (communityname, postId, useremail, commentId) => {
        const confirmDelete = () => {
            if (window.confirm('are you sure to delete this comment ?')) {
                const apiUrl = `http://localhost:3700/comments/${communityname}/${postId}/${useremail}/deleteCommentAdmin/${commentId}`;
                axios.delete(apiUrl, { data: { communityname: communityname, postId: postId, user_email: useremail, commentId: commentId } })
                    .then(response => {
                        toast.success('successfully deleted comment')
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        toast.error('error in delete');
                    });
            }
        };
        confirmDelete();
    };
    const handleDeletePost = (user_email, community_name, _id) => {
        const confirmDelete = () => {
            if (window.confirm('are you sure to delete this post ?')) {
                const apiUrl = `http://localhost:3700/communities/${community_name}/${user_email}/deletePostAdmin/${_id}`;
                axios.delete(apiUrl, { data: { user_email: user_email, community_name: community_name, _id: _id } })
                    .then(response => {
                        toast.success('successfully deleted Post')
                        getPosts();
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
        getPosts();
    }, [])

    return (
        <Box component="main" sx={{ flexGrow: 1 }}>
            {/* <Toolbar /> */}
            {posts.map((post, index) =>
                <Box className='d-flex justify-content-center' key={index}>
                    <Card variant="outlined " className={`shadow-sm ${style.card}`} >
                        <Box sx={{ p: 1 }}>
                            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                <Box style={{ display: 'flex', alignItems: 'center' }}>
                                    {post.post.userImage == null ? <Avatar className='border' alt='' /> : <Avatar src={post.post.userImage.secure_url} className='border' alt='' />}
                                    <div style={{ marginLeft: '10px' }}>
                                        <div className='d-flex'>
                                            <Typography variant="h6" className='font me-2 mt-1 '>{post.post.user_name}</Typography>
                                            <Typography className='font mt-2'> {post.post.post_type == 'owner' ? 'is display this product' : 'is requests this product'}</Typography>
                                        </div>
                                        <Typography variant="subtitle2" color="textSecondary" className='font'>
                                            {post.post.createdAt && format(new Date(post.post.createdAt), 'dd-MM-yyyy')}
                                        </Typography>
                                    </div>
                                </Box>
                                <i className="fa-solid fa-trash mb-4" style={{ cursor: 'pointer' }}
                                    onClick={() => handleDeletePost(`${localStorage.getItem('email')}`, post.post.community_name, post.post._id)}
                                />
                            </Box>
                            <Box sx={{ mt: 3 }} style={{ display: 'flex' }}>
                                <Box className={` ms-2  ${style.content}`} >
                                    {post.post.properties.map((property, propertyIndex) =>
                                        <>
                                            <div>
                                                {property.property == 'Name' ? <p className={`${style.title1}`}>{property.value} </p> : ''}
                                            </div>
                                            <div>
                                                <div className="d-flex  mb-2" key={propertyIndex}>
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
                                sx={{ borderRight: '1px solid #0000002c', width: '100%', cursor: 'pointer' }}
                                onClick={() => handleToggleComments(post.post._id)}
                                className={`d-flex justify-content-center text-center p-2 ${style.action1}`}
                            >
                                <i className="fa-regular fa-comment" style={{ fontSize: 25, color: '#918d99', marginLeft: '10px', marginRight: '5px' }}></i>
                                <Typography variant="" sx={{ fontSize: '16px' }} color="textSecondary" className='font'>
                                    Comment
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
                                                <i className="fa-solid fa-trash  me-2"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleDeleteComment(post.post.community_name, post.post._id, localStorage.getItem('email'), comment._id)} /> {format(new Date(comment.createdAt), 'dd-MM-yyyy')}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </Box>
                        </Collapse>
                    </Card>

                </Box >
            )}
        </Box >


    )
}
