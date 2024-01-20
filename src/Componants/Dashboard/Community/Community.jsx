import { Box, Toolbar } from '@mui/material'
import React from 'react'
import Post from '../Post/Post.jsx'

export default function Community() {
 
  return (
    <div className="sid">
      <Box component="main" sx={{ flexGrow: 1,pt:2 }}>
        <Toolbar />
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
      </Box>
    </div>

  )
}
