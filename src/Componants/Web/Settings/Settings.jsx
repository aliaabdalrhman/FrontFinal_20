import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Avatar, Button, Toolbar } from '@mui/material';
import style from '../Settings/Settings.module.css'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Link, useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { EmailContext } from '../../../Context/GetEmail';
import { format } from 'date-fns';

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

  const [userData, setUserData] = useState(null);
  const { Email1 } = useContext(EmailContext);

  async function getUserInfo() {
    try {
      let { data } = await axios.get(`https://abr-dcxu.onrender.com/userDo/${Email1}/viewMyPersonalInformation`);
      console.log(data);
      // setUserData(data);
    }
    catch (error) {
      console.log('error:', error);
    }
  }

  useEffect(() => {

    getUserInfo();

  }, [])
  return (
    <div className='sid' >
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box sx={{ height: 520, width: '80%' }} className='d-flex justify-content-center' >
          <Box sx={{ mt: 6 }} >
            <Box className='d-flex justify-content-center '>
              <Avatar src='img/image1.jpg' className='border ' style={{ width: '220px', height: '220px', marginRight: '10px' }} alt='' />
              <Box sx={{ mt: 20, mr: 3 }} >
                <i className="fa-regular fa-pen-to-square me-2 d-flex mb-1" style={{ cursor: 'pointer' }} />
                <i className="fa-solid fa-trash" style={{ cursor: 'pointer' }} />
              </Box>
            </Box>
            <Typography className='mt-3 font ' sx={{ fontSize: '22px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)', ml: 5 }}>
              Alia Abdalrhman
            </Typography>

          </Box>
          <Box sx={{ width: '68%', borderLeft: '1px solid #0000002c' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Personal Information" className='font'{...a11yProps(0)} />
                <Tab label="change password" className='font'{...a11yProps(1)} />
                {/* <Tab label="notification" {...a11yProps(2)} /> */}
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Box className={`d-flex font`} >
                <form >
                  {/* <Box sx={{ mb: 4 }} >
                    <Typography variant='h5' >Personal Information :</Typography>
                  </Box> */}
                  <Box sx={{ ml: 1, mt: 3 }}>
                    <div className='d-flex justify-content-between gap-4'>
                      <div className={`mb-3 ${style.input}`}>
                        <label htmlFor="firstname" className="form-label">First Name :</label>
                        <input type="text"
                          className={`form-control textfield ${style.TextField}`}
                          id="firstName"
                          name='firstName'
                        placeholder={userData.firstName}
                        // value={formik.values.community_name}
                        // onChange={formik.handleChange} 
                        />
                      </div>
                      <div className={`mb-3 ${style.input}`}>
                        <label htmlFor="lastName" className="form-label">Last Name :</label>
                        <input type="text"
                          className={`form-control textfield ${style.TextField}`}
                          id="lastName"
                          name='lastName'
                        placeholder={userData.lastName}
                        // value={formik.values.community_name}
                        // onChange={formik.handleChange} 
                        />
                      </div>
                    </div>
                    <div className='d-flex justify-content-between gap-4'>
                      <div className={`mb-3 ${style.input}`}>
                        <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                        <input type="text"
                          className={`form-control textfield ${style.TextField}`}
                          id="phoneNumber"
                          name='phoneNumber'
                        // placeholder='Phone Name'
                        // value={formik.values.community_name}
                        // onChange={formik.handleChange} 
                        />
                      </div>
                      <div className={`mb-3 ${style.input}`}>
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="text"
                          className={`form-control textfield ${style.TextField}`}
                          id="email"
                          name='email'
                          disabled
                        placeholder={userData.email}
                        // value={formik.values.community_name}
                        // onChange={formik.handleChange} 
                        />
                      </div>
                    </div>
                    <div className='d-flex justify-content-between gap-4'>
                      <div className={`mb-3 ${style.input}`}>
                        <label htmlFor="address" className="form-label">Adderss :</label>
                        <input type="text"
                          className={`form-control textfield ${style.TextField}`}
                          id="address"
                          name='address'
                        placeholder={userData.address}
                        // value={formik.values.community_name}
                        // onChange={formik.handleChange} 
                        />
                      </div>
                      <div className={`mb-3 ${style.input}`}>
                        <label htmlFor="birth_date" className="form-label">Birthday :</label>
                        <input type="text"
                          name='birth_date'
                          className={`form-control textfield ${style.TextField}`}
                          id="birth_date"
                        placeholder={format(new Date(userData.birth_date), 'dd-MM-yyyy')}
                        // value={formik.values.community_name}
                        // onChange={formik.handleChange} 
                        />
                      </div>

                    </div>
                  </Box>
                  <Box sx={{}}>
                    <Button variant="contained" className={`button ms-2 ${style.btn}`}  >
                      save
                    </Button>
                  </Box>
                </form>
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Box className={`d-flex font`} >
                <form >
                  <Box sx={{ ml: 1, mt: 3 }}>
                    <div className={`mb-3 ${style.input}`}>
                      <label htmlFor="oldPassword" className="form-label">Old Password :</label>
                      <input type="oldPassword"
                        className={`form-control textfield ${style.TextField}`}
                        id="oldPassword"
                      // placeholder='Email'
                      // value={formik.values.community_name}
                      // onChange={formik.handleChange} 
                      />
                    </div>
                    <div className={`mb-3 ${style.input}`}>
                      <label htmlFor="newPassword" className="form-label">New Password :</label>
                      <input type="newPassword"
                        className={`form-control textfield ${style.TextField}`}
                        id="newPassword"
                      // placeholder='Email'
                      // value={formik.values.community_name}
                      // onChange={formik.handleChange} 
                      />
                    </div>
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <Button variant="contained" className={`button  ${style.btn}`} >
                      Change
                    </Button>
                  </Box>
                  <Box sx={{ ml: 2, mt: 3 }}>
                    <Link className={`text-decoration-none ${style.forgot}`} style={{ color: '#156ac0' }} onClick={forgotPassword}> Forgot Password ?</Link>
                  </Box>
                </form>
              </Box>
            </CustomTabPanel>
            {/* <CustomTabPanel value={value} index={2}>
              <Box className={`d-flex`} >
                <form >
                  <Box sx={{ mb: 4 }}>
                    <h2 className=''>Notification</h2>
                  </Box>

                </form>
              </Box>
            </CustomTabPanel> */}
          </Box>
        </Box>
      </Box>
    </div>
  )
}
