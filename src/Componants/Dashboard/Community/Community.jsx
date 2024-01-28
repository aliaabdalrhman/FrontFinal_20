import { Box, Toolbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Post from '../Post/Post.jsx'
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Community() {

  let { _id } = useParams();
  let [community, setCommunity] = useState({});
  let [communityname, setCommunityname] = useState('');
  let [properities, setProperities] = useState([]);

  async function getcommunityDetails() {
    try {
      let { data } = await axios.get(`https://abr-dcxu.onrender.com/community/${_id}`);
      console.log(data)
      setCommunity(data.Community)
      setCommunityname(data.Community.community_name)
    }
    catch (error) {
      console.log('error:', error)
    }
  }

  async function getPropereties(communityname) {
    try {
      let { data } = await axios.get(`https://abr-dcxu.onrender.com/community/${communityname}/viewProperty`);
      console.log(data);
      setProperities(data);
    }
    catch (error) {
      console.log('error:', error);
    }
  }
  useEffect(() => {
    getcommunityDetails();
    getPropereties(communityname);

  }, [])

  return (
    <div className="sid">
      <Box component="main" sx={{ flexGrow: 1, pt: 2 }}>
        <Toolbar />
        <Post communityname={communityname} />
      </Box>
    </div>

  )
}
