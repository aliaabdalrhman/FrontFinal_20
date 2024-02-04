import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Avatar, Button, Toolbar } from '@mui/material';
import '../../../Pages/Css/Pages.css'
import style from '../Settings/Settings.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { RoleContext } from '../../../Context/GetRole.js';
import axios from 'axios';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import UpdateImage from './UpdateImage.jsx';



export default function Setting() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const { role } = useContext(RoleContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const forgotPassword = () => {
    navigate('/forgotPassword')
  }
  const [image, setImage] = useState('');

  const [adminData, setAdminData] = useState({});

  async function getAdminInfo() {
    try {
      let { data } = await axios.get(`http://localhost:3700/userDo/${localStorage.getItem('email')}/viewMyPersonalInformation`);
      { data.image == null ? setImage(null) : setImage(data.image.secure_url) }
      setAdminData(data);
    }
    catch (error) {
      console.log('error:', error);
    }
  }
  const onDrop = React.useCallback((acceptedFiles) => {
    formik2.setFieldValue('image', acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1,
  });
  const formik2 = useFormik({
    initialValues: {
      image: '',
    },
    onSubmit: addImage,
  });
  async function addImage(values) {
    const formData = new FormData();
    formData.append('image', values.image);
    try {
      const { data } = await axios.post(`http://localhost:3700/userDo/addimage/${localStorage.getItem('email')}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (data.message === 'Success') {
        toast.success('The image was successfully added');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  }
  const formik = useFormik({
    initialValues: {
      firstName: adminData.first_name ,
      lastName: adminData.last_name ,
      phone: adminData.phone ,
      birth_date: adminData.birth_date && format(new Date(adminData.birth_date), 'dd-MM-yyyy') ,
      address: adminData.address ,
    },
    onSubmit: updateData,
  });
  async function updateData() {
    const requestData = {
      firstName: formik.values.firstName,
      lastName: formik.values.lastName,
      phone: formik.values.phone,
      birth_date: formik.values.birth_date,
      address: formik.values.address,
    };

    try {
      const { data } = await axios.post(`http://localhost:3700/userDo/${localStorage.getItem('email')}/updateMyPersonalInformation`, requestData);

      console.log(data);

      if (data.acknowledged === true) {
        toast.success('Successfully updated information');
      } else {
        toast.error('Failed to update information');
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }


  let formik3 = useFormik({
    initialValues: {
      password: '',
      newpassword: '',
    },
    onSubmit: changePassword,
  })

  async function changePassword(values) {
    console.log(values)
    try {
      let { data } = await axios.post(`http://localhost:3700/userDo/${localStorage.getItem('email')}/changePassword`, values)
      console.log(data);
      if (data.msg == 'Password changed successfully') {
        toast.success('password successfully changed')
        formik3.resetForm()
      }
    }
    catch (error) {
      toast.error('error occurred during the changing of the password')
      console.log(error)
    }
  }
  useEffect(() => {
    getAdminInfo();
  },)

  return (
    <div className='sid'>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box sx={{ height: 520, width: '80%' }} className='d-flex justify-content-center' >
          <Box sx={{ mt: 6 }} >
            {adminData.image == null ?
              <form onSubmit={formik2.handleSubmit} encType='multipart/form-data'>
                <Box className='d-flex justify-content-center '>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>  get image to here..</p>
                    ) : (
                      formik2.values.image ? (
                        <div>
                          <Avatar src={URL.createObjectURL(formik2.values.image)} alt="Uploaded" sx={{ width: 260, height: 260, mr: 4, borderRadius: 50 }} />
                          <p>Image uploaded</p>
                        </div>
                      ) : (
                        <div>
                          {adminData.image == null ? <Avatar sx={{ width: 260, height: 260, mr: 4 }} variant="circular">
                          </Avatar> : <Avatar src={adminData.image.secure_url} sx={{ width: 260, height: 260, mr: 4 }} variant="circular">
                          </Avatar>}
                        </div>
                      )
                    )}
                  </div>
                </Box>
                <Button type='submit' variant='contained' className='button mt-4 ms-5'>add your image</Button>
              </form> : <UpdateImage adminData={adminData.image} />
            }
          </Box >
          <Box sx={{ width: '65%' }}>
            <div className='mt-2'>
              <h3 className='ms-4 font'>PERSONAL INFOEMATION</h3>
            </div>
            <Box className='d-flex font ms-4'  >
              <form onSubmit={formik.handleSubmit}>
                <Box sx={{ ml: 1, mt: 3 }}>
                  <div className='d-flex justify-content-between gap-4'>
                    <div className={`mb-3 ${style.input}`}>
                      <label htmlFor="firstName" className="form-label">First Name :</label>
                      <input type="text"
                        className={`form-control textfield ${style.TextField}`}
                        id="firstName"
                        name='firstName'
                        placeholder={adminData.first_name}
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className={`mb-3 ${style.input}`}>
                      <label htmlFor="lastName" className="form-label">Last Name :</label>
                      <input type="text"
                        className={`form-control textfield ${style.TextField}`}
                        id="lastName"
                        name='lastName'
                        placeholder={adminData.last_name}
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                  <div className='d-flex justify-content-between gap-4'>
                    <div className={`mb-3 ${style.input}`}>
                      <label htmlFor="birth_date" className="form-label">Birthday :</label>
                      <input type="text"
                        name='birth_date'
                        className={`form-control textfield ${style.TextField}`}
                        id="birth_date"
                        placeholder={adminData.birth_date && format(new Date(adminData.birth_date), 'dd-MM-yyyy')}
                        value={formik.values.birth_date}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className={`mb-3 ${style.input}`}>
                      <label htmlFor="phone" className="form-label">Phone Number:</label>
                      <input type="text"
                        className={`form-control textfield ${style.TextField}`}
                        id="phone"
                        name='phone'
                        placeholder={adminData.phone}
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                  <div className='d-flex justify-content-between gap-4'>
                    <div className={`mb-3 ${style.input}`}>
                      <label htmlFor="email" className="form-label">Email:</label>
                      <input type="text"
                        className={`form-control textfield ${style.TextField}`}
                        id="email"
                        name='email'
                        disabled
                        placeholder={adminData.email}
                      />
                    </div>
                    <div className={`mb-3 ${style.input}`}>
                      <label htmlFor="address" className="form-label">Adderss :</label>
                      <input type="text"
                        className={`form-control textfield ${style.TextField}`}
                        id="address"
                        name='address'
                        placeholder={adminData.address}
                        value={formik.values.address}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                  <div className='d-flex justify-content-between gap-4'>
                    {/*  for subadmin */}
                    {role == 'SubAdmin' ?
                      <div className={`mb-3 ${style.input}`}>
                        <label htmlFor="communityAt" className="form-label">Community At :</label>
                        <input type="text"
                          className={`form-control textfield ${style.TextField}`}
                          id="communityAt"
                          disabled
                          placeholder={adminData.community_id}
                        />
                      </div>
                      : <></>
                    }
                  </div>
                </Box>
                <Box className='ms-2 mb-5'>
                  <Button type='submit' variant="contained" className={`button ms-2 ${style.btn}`}  >
                    save
                  </Button>
                </Box>
              </form>
            </Box>
            <div className='mt-2'>
              <h3 className='ms-4 font'>CHANGE PASSWORD</h3>
            </div>
            <Box className='d-flex font ms-4'>
              <form onSubmit={formik3.handleSubmit}>
                <Box sx={{ ml: 1, mt: 3 }} className='d-flex justify-content-between gap-4'>
                  <div className={`mb-3 ${style.input}`}>
                    <label htmlFor="password" className="form-label">Old Password :</label>
                    <input type="Password"
                      className={`form-control textfield ${style.TextField}`}
                      id="password"
                      name='password'
                      value={formik3.values.password}
                      onChange={formik3.handleChange}
                    />
                  </div>
                  <div className={`mb-3 ${style.input}`}>
                    <label htmlFor="newpassword" className="form-label">New Password :</label>
                    <input type="Password"
                      className={`form-control textfield ${style.TextField}`}
                      id="newpassword"
                      name='newpassword'
                      value={formik3.values.newpassword}
                      onChange={formik3.handleChange}
                    />
                  </div>
                </Box>
                <Box sx={{ ml: 2 }}>
                  <Button type='submit' variant="contained" className={`button  ${style.btn}`} >
                    Change
                  </Button>
                </Box>
                <Box sx={{ ml: 2, mt: 3, mb: 4 }}>
                  <Link className={`text-decoration-none ${style.forgot}`} style={{ color: '#156ac0' }} onClick={forgotPassword}> Forgot Password ?</Link>
                </Box>
              </form>
            </Box>
          </Box>

        </Box>
      </Box>
    </div>
  );
}

