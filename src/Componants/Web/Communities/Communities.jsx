import { Box, Button, Toolbar } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import '../../../Pages/Css/Pages.css'
import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import style from './Communities.module.css'
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
import { Grid } from '@mui/material';
import { RoleContext } from '../../../Context/GetRole.js';
import { toast } from 'react-toastify';



export default function Communities() {

  const [loading, setLoading] = useState(true);
  const [communities, setCommunities] = useState([]);


  async function getCommunities() {
    try {
      let { data } = await axios.get(`http://localhost:3700/community/${localStorage.getItem('email')}/getCommunities`);
      console.log(data.communities)
      setCommunities(data.communities);
    }
    catch (error) {
      console.log('error:', error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      getCommunities();
      setLoading(false);

    }, 3000);
  }, [])

  return (
    <div className='sid '>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {loading ? (
          <Grid container spacing={3} justifyContent="center">
            {[...Array(6)].map((_, index) => (
              <Grid item key={index}>
                <Skeleton variant="rectangular" width={370} height={290} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <div className={`d-flex justify-content-center mt-5 ${style.header}`} >
            {communities.map((community) =>
              <Link to={`${community._id}`} state={{ id: community._id }} key={community._id}>
                <Card className={`${style.card}`} key={community._id} >
                  <h1 >{community.community_name}
                    <p className={style.desc}>{community.description}</p>
                  </h1>
                  <img src={community.image.secure_url} className={`${style.img}`} alt='this is image' />
                </Card>
              </Link>
            )}
          </div>
        )
        }
      </Box>
    </div>
  )
}
