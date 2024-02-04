import { Box, Toolbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Post from '../Post/Post.jsx'
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Community() {
  let { _id } = useParams();
  let [communityname, setCommunityname] = useState('');
  let [communityDetailsFetched, setCommunityDetailsFetched] = useState(false);

  async function getcommunityDetails() {
    try {
      let { data } = await axios.get(`http://localhost:3700/community/${_id}`);
      if (data.message == 'success') {
        // console.log(data);
        setCommunityname(data.Community.community_name);
        setCommunityDetailsFetched(true);
      }
    }
    catch (error) {
      console.log('error:', error)
    }
  }

  useEffect(() => {
    getcommunityDetails();
  }, [])

  return (
    <div className="sid">
      <Box component="main" sx={{ flexGrow: 1, pt: 2 }}>
        <Toolbar />
        {communityDetailsFetched && <Post communityname={communityname} />}
      </Box>
    </div>

  )
}
