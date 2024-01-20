import React from 'react'
import { Box, Toolbar } from '@mui/material'
import Post from '../Post/Post.jsx'

export default function MyComment() {
    return (
        <div className="sid">
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Toolbar />
                <Post />
                <Post />
            </Box>
        </div>
    )
}
