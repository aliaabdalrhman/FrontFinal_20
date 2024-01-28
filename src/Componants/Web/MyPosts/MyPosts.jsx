import { Box, Toolbar } from '@mui/material'
import React from 'react'
import Post from '../Post/Post.jsx'
import axios from 'axios'

export default function MyPosts() {

  async function getPost() {
    try {
      let { data } = await axios.get('');
    }
    catch (error) {
      console.log('error', error);
    }




  }


  return (
    <div className="sid">
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />

      </Box>
    </div>

  )
}
