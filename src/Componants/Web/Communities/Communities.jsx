import { Box, Button, Toolbar } from '@mui/material'
import React from 'react'
import '../../../Pages/Css/Pages.css'
import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import style from './Communities.module.css'


export default function Communities() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 1500,

  };
  let Navigate = useNavigate();

  // const ToCommunity = () => {
  //   Navigate('/communities/community')
  // }
  return (
    <div className='sid '>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box sx={{ mt: 3 }}>
        </Box>
        <div className={`d-flex justify-content-center  ${style.header}`} >
          <Link to='community'>
            <Card className={`${style.card} `} >
              <h1 >phone</h1>
              <img src='images/iphone.jpeg' className={`${style.img}`} alt='this is image' />

            </Card>
          </Link>
          <Link to='community'>
            <Card className={`${style.card} `}  >
              <h1 >Laptop</h1>
              <img src='images/Lap1.jpeg'
                className={`${style.img}`}
                alt='this is image'
              />
            </Card></Link>

          <Link to='community'>
            <Card className={`${style.card} `} >

              <h1 >Ipad</h1>
              <img src='images/ipad1.jpeg'
                className={`${style.img}`}
                alt='this is image'
              />

            </Card>
          </Link>

          <Link to='community'>
            <Card className={`${style.card} `}  >
              <div class={` ${style.overlay}`} >
                <h1 >phone</h1>
                <img src='images/iphone.jpeg' className={`${style.img}`} alt='this is image' />
              </div>
            </Card>
          </Link>

          <Link to='community'>
            <Card className={`${style.card} `}  >
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
        </div>
      </Box>
    </div>

  )
}
