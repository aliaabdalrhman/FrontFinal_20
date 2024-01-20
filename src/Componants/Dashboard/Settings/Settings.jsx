import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Avatar, Button, Toolbar } from '@mui/material';
import '../../../Pages/Css/Pages.css'
import style from '../Settings/Settings.module.css'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Link, useNavigate } from 'react-router-dom';

function CustomTabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Setting() {

  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const forgotPassword = () => {
    navigate('/forgotPassword')
  }

  return (
    <div className='sid'>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box sx={{ height: 520, width: '80%' }} className='d-flex justify-content-center' >
          <Box sx={{ mt: 6 }} >
            <Box className='d-flex justify-content-center '>
              <Avatar src='img/image1.jpg' className='border' style={{ width: '220px', height: '220px', marginRight: '10px' }} alt='' />
              <Box sx={{ mt: 20, mr: 3 }}>
                <i className="fa-regular fa-pen-to-square me-2 d-flex mb-1" style={{ cursor: 'pointer' }} />
                <i className="fa-solid fa-trash" style={{ cursor: 'pointer' }} />
              </Box>
            </Box>
            <Typography variant='h6' className='mt-3 font ' sx={{ fontSize: '22px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)', ml: 4 }}>
              Alia Abdalrhman
            </Typography>

          </Box>
          <Box sx={{ width: '68%', borderLeft: '1px solid #0000002c' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Personal Information"  className='font'{...a11yProps(0)} />
                <Tab label="change password" className='font' {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Box className='d-flex font' >
                <form >
                  {/* <Box sx={{mb:3}} >
            <h2 >Personal Information </h2>
          </Box> */}
                  <Box sx={{ ml: 1, mt: 3 }}>
                    <div className='d-flex justify-content-between gap-4'>
                      <div className={`p-float-label ${style.input}`}>
                        <InputText id="FirstName" type='text' className={`${style.TextField1}`} />
                        <label htmlFor="FirstName" className='ms-2'>First Name</label>
                      </div>
                      <div className={`p-float-label ${style.input}`}>
                        <InputText id="LastName" type='text' className={`${style.TextField1}`} />
                        <label htmlFor="LastName" className='ms-2'>Last Name</label>
                      </div>
                    </div>
                    <div className='d-flex justify-content-between gap-4'>
                      <div className={`p-float-label ${style.input}`}>
                        <InputText id="phonenumber" type='text' className={`${style.TextField1}`} />
                        <label htmlFor="phonenumber" className='ms-2'>Phone Number</label>
                      </div>
                      <div className={`p-float-label ${style.input}`}>
                        <InputText id="email" type='email' className={` ${style.TextField1}`} />
                        <label htmlFor="email" className='ms-2'>Email</label>
                      </div>
                    </div>
                    <div className='d-flex justify-content-between gap-4'>
                      <div className={`p-float-label ${style.input}`}>
                        <InputText id="phonenumber" type='text' className={`${style.TextField1}`} />
                        <label htmlFor="phonenumber" className='ms-2'>Country</label>
                      </div>
                      <div className={`p-float-label ${style.input}`}>
                        <InputText id="community" type='email' className={` ${style.TextField1}`} />
                        <label htmlFor="community" className='ms-2'>Community</label>
                      </div>
                    </div>
                    <div className={`p-float-label ${style.input}`}>
                      <InputTextarea rows={4} cols={100} className={`${style.TextArea}`} />
                      <label htmlFor="Pio" className='ms-2'>Pio</label>
                    </div>
                  </Box>

                  <Box sx={{ ml: 72 }}>
                    <Button variant="outlined" className={`button  ${style.btn}`} >
                      Cancel
                    </Button>
                    <Button variant="contained" className={`button ms-2 ${style.btn}`}  >
                      save
                    </Button>
                  </Box>
                </form>
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Box className='d-flex font'  >
                <form >
                  {/* <Box sx={{mb:4}}>
            <h2 className=''>Change Password</h2>
          </Box> */}
                  <Box sx={{ ml: 1, mt: 3 }}>
                    <div className={`p-float-label ${style.input}`}>
                      <InputText id="oPassword" type='password' className={`${style.TextField1}`} />
                      <label htmlFor="oPassword" className='ms-2'>Old Password</label>
                    </div>
                    <div className={`p-float-label ${style.input}`}>
                      <InputText id="nPassword" type='password' className={`${style.TextField1}`} />
                      <label htmlFor="nPassword" className='ms-2'>New Password</label>
                    </div>
                    <div className={`p-float-label ${style.input}`}>
                      <InputText id="cPassword" type='password' className={`${style.TextField1}`} />
                      <label htmlFor="cPassword" className='ms-2'>Confirm New Password</label>
                    </div>
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <Button variant="contained" className={`button  ${style.btn}`} >
                      Change
                    </Button>
                  </Box>
                  <Box sx={{ ml: 2, mt: 3 }}>
                    <Link className={`text-decoration-none ${style.forgot}`}  style={{ color: '#156ac0' }} onClick={forgotPassword}> Forgot Password ?</Link>
                  </Box>
                </form>
              </Box>
            </CustomTabPanel>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

