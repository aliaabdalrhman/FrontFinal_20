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
import UpdateCommunity from '../UpdateCommunity/UpdateCommunity.jsx';
import { toast } from 'react-toastify';
import AddProperety from '../AddProperety/AddProperety.jsx';


export default function Communities() {

  const [loading, setLoading] = useState(true);
  const [communities, setCommunities] = useState([]);
  const { role } = useContext(RoleContext);

  async function getCommunities() {
    try {
      let { data } = await axios.get('https://abr-dcxu.onrender.com/community/getCommunities');
      // console.log(data.communities)
      setCommunities(data.communities);
    }
    catch (error) {
      console.log('error:', error);
    }
  }


  const handleDeleteCommunity = (community_name) => {
    const confirmDelete = () => {
      if (window.confirm('are you sure to delete this community ?')) {
        const apiUrl = `https://abr-dcxu.onrender.com/community/${community_name}/deleteCommunity`;
        axios.delete(apiUrl, { data: { community_name: community_name } })
          .then(response => {
            toast.success('successfully deleted community', {
              position: 'top-center',
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: true,
              theme: 'dark'
            });
            getCommunities(); // إعادة تحميل قائمة المستخدمين بعد الحذف
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
    setTimeout(() => {
      getCommunities();
      setLoading(false);

    }, 3000);
  }, [])

  return (
    <div className='sid '>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box sx={{ mt: 1, mb: 3 }}>
          {role == 'SuperAdmin' ?
            <>
              <Link to='createcommunity'>
                <Button variant="contained" className='button ms-4'>
                  Create new Community
                </Button>
              </Link>
            </>
            : <></>}
        </Box>
        {loading ? (
          <Grid container spacing={3} justifyContent="center">
            {[...Array(6)].map((_, index) => (
              <Grid item key={index}>
                <Skeleton variant="rectangular" width={370} height={290} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <div className={`d-flex justify-content-center ${style.header}`} >
            {communities.map((community) =>
              <Link to={`${community._id}`} key={community._id} state={{ id: community._id }}>
                <Card className={`${style.card}`} key={community._id} >
                  <Link to='/dashboard/communities'>
                    <i className={`fa-solid fa-trash ${style.delete}`} onClick={() => handleDeleteCommunity(community.community_name)}></i></Link>
                  <Link to={{ pathname: `updatecommunity/${community._id}`, state: { community: community } }}>
                    <i className={`fa-solid fa-pen-to-square ${style.update}`}></i>
                  </Link>
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
