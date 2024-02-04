import { Toolbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box } from '@mui/material'
import style from './MyPosts.module.css'
import { Card, Typography, Avatar } from '@mui/material';
import Slider from "react-slick";
import { toast } from 'react-toastify'
import { format } from 'date-fns';
export default function MyPosts() {

  const [image, setImage] = useState('');
  let [posts, setPosts] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  async function getInformation() {
    try {
      let { data } = await axios.get(`http://localhost:3700/userDo/${localStorage.getItem('email')}/viewMyPersonalInformation`);
      { data.image == null ? setImage(null) : setImage(data.image.secure_url) }

    }
    catch (error) {
      console.log('error:', error);
    }
  }
  async function getMyPost() {
    try {
      let { data } = await axios.get(`http://localhost:3700/userDo/${localStorage.getItem('email')}/viewMyPosts`);
      setPosts(data)
    }
    catch (error) {
      console.log('error', error);
    }
  }
  const handleDeletePost = (user_email, community_name, _id) => {
    const confirmDelete = () => {
      if (window.confirm('are you sure to delete this post ?')) {
        const apiUrl = `http://localhost:3700/communities/${community_name}/${user_email}/deletePost/${_id}`;
        axios.delete(apiUrl, { data: { user_email: user_email, community_name: community_name, _id: _id } })
          .then(response => {
            toast.success('successfully deleted Post')
            getMyPost();
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
    getInformation();
    getMyPost();
  }, []);


  return (
    <div className="sid mt-4">
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        {posts.map((post, index) =>
          <Box className='d-flex justify-content-center' key={index}>
            <Card variant="outlined " className={`shadow-sm ${style.card}`} >
              <Box sx={{ p: 1 }}>
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box style={{ display: 'flex', alignItems: 'center' }}>
                    {image == null ? <Avatar className='border' alt='' /> : <Avatar className='border' src={image} alt='' />}
                    <div style={{ marginLeft: '10px' }}>
                      <div className='d-flex'>
                        <Typography variant="h6" className='font me-2 mt-1 '>{post.post.user_name}</Typography>
                        <Typography className='font mt-2'> {post.post_type == 'owner' ? 'is displaying this product' : 'is requesting this product'}</Typography>
                      </div>
                      <Typography variant="subtitle2" color="textSecondary" className='font'>
                        {post.post.createdAt && format(new Date(post.post.createdAt), 'dd-MM-yyyy')}
                      </Typography>
                    </div>
                  </Box>
                  <i className="fa-solid fa-trash mb-4" style={{ cursor: 'pointer' }} onClick={() => handleDeletePost(post.post.user_email, post.post.community_name, post.post._id)} />
                </Box>
                <Box sx={{ mt: 3 }} style={{ display: 'flex' }}>
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
                {post.commentsNumber} like , {post.commentsNumber} comment
              </Typography>
            </Card>
          </Box >
        )}
      </Box>
    </div>

  )
}
