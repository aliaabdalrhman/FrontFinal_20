import React from 'react'
import { Avatar, Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import style from './Post.module.css'
export default function UserList({ users, selectedUser, onUserClick }) {
    return (
        <>
            <List className={`${style.List} `}>
                {users.map((user) => (
                    <ListItem
                        className={`${style.ListItem}`}
                        sx={{ borderBottom: '1px solid #0000002c' }}
                        button
                        key={user.id}
                        onClick={() => onUserClick(user)}
                    // selected={selectedUser && selectedUser.id === user.id}
                    >
                        <Box sx={{ height: '45px ' }}
                            className={`d-flex justify-content-center mb-1`}
                            style={{ cursor: 'pointer' }}>
                            <Avatar alt='' className='mt-2' />
                            <div style={{ marginLeft: '10px' }}>
                                <div className='d-flex '>
                                    <div>
                                        <Typography variant="h7" className='font ' > <ListItemText primary={user.name} /></Typography>
                                        <p style={{ fontSize: '12px' }}>Hello Aliaa, ...</p>
                                    </div>
                                    <Typography variant="h7" color="textSecondary" className={`font mt-2 ${style.msgtime}`}>
                                        8:20 Am
                                    </Typography>
                                </div>
                            </div>
                        </Box>

                    </ListItem>
                ))}
            </List>
        </>

    )
}
