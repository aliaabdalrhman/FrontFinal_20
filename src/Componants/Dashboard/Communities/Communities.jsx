import { Box, Button, Toolbar } from '@mui/material'
import React, { useEffect } from 'react'
import '../../../Pages/Css/Pages.css'
import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import AddCommunity from '../AddCommunity/AddCommunity.jsx';
import style from './Communities.module.css'
import axios from 'axios';




export default function Communities() {

  // let Navigate = useNavigate();

  // const AddNewCommunity = () => {
  //   Navigate('/createNewCommunity')
  // }
  // async function welcome() {
  //   let  {data}  = await axios.get('https://ecommerce-node-3.vercel.app/category');
  //   console.log(data);
  // }

  // useEffect(() => {
  //   welcome();
  // }, [])
  return (
    <div className='sid '>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box sx={{ mt: 1, mb: 3 }}>
          {/* <AddCommunity /> */}

          <Link to='createcommunity'>
            <Button variant="contained" className='button ms-4'>
              Create new Community
            </Button>
          </Link>
        </Box>
        <div className={`d-flex justify-content-center  ${style.header}`} >
          <Link to='community'>
            <Card className={`${style.card} `} >
              <h1 >phone</h1>
              <img src='images/iphone.jpeg' className={`${style.img}`} alt='this is image' />

            </Card>
          </Link>

          <Link to='community'>
            <Card className={`${style.card} `} >
              <h1 >Laptop</h1>
              <img src='images/Lap1.jpeg'
                className={`${style.img}`}
                alt='this is image'
              />
            </Card>
          </Link>

          <Link to='community'>
            <Card className={`${style.card} `}  >
              <h1 >Ipad</h1>
              <img src='images/ipad1.jpeg'
                className={`${style.img}`}
                alt='this is image'
              />
            </Card>
          </Link>
          <Link to='community'>
            <Card className={`${style.card} `} >
              <div class={` ${style.overlay}`} >
                <h1 >phone</h1>
                <img src='images/iphone.jpeg' className={`${style.img}`} alt='this is image' />
              </div>
            </Card>
          </Link>
          <Link to='community'>
            <Card className={`${style.card} `}>
              <h1 >Laptop</h1>
              <img src='images/Lap1.jpeg'
                className={`${style.img}`}
                alt='this is image'
              />
            </Card>
          </Link>
        </div>
      </Box>
    </div>
  )
}
