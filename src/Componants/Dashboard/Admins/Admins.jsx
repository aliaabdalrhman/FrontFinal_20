import React, { useContext, useEffect, useState } from 'react'
import '../../../Pages/Css/Pages.css'
import { Avatar, Box, Button, Toolbar, Typography } from '@mui/material'
import style from './Admins.module.css'
import AddAdmin from '../AddAdmin/AddAdmin.jsx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ResetPassword from '../ResetPassword/ResetPassword.jsx';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import { RoleContext } from '../../../Context/GetRole.js';
import { EmailContext } from '../../../Context/GetEmail.js';
import { useNavigate } from 'react-router-dom';

export default function Admins() {

  let navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [subadmins, setSubAdmins] = useState([]);
  const [accordionData, setAccordionData] = useState([]);
  const { role } = useContext(RoleContext);

  const handleAccordionClick = (index) => {
    const updatedAccordionData = [...accordionData];
    updatedAccordionData[index].isOpen = !updatedAccordionData[index].isOpen;
    setAccordionData(updatedAccordionData);
  };
  async function viewAdmins() {
    try {
      let { data } = await axios.get(`http://localhost:3700/admins/${localStorage.getItem('email')}/viewAdmin`);

      setAdmins(data.Admins);
      const initialAccordionState = data.Admins.map(() => {
        return { isOpen: false };
      });
      setAccordionData(initialAccordionState);
      setLoading(false);
    }
    catch (error) {
      if (error.config.message == 'Request failed with status code 404') {
        // toast.error(error.response.data.message);
        // navigate('/*')
        console.log(error);
      }
      else {
        toast.error(error.message);
      }
    }
  }
  async function viewSubAdmins() {
    try {
      let { data } = await axios.get(`http://localhost:3700/admins/${localStorage.getItem('email')}/viewCommunityAdmin`);
      console.log(data)
      setSubAdmins(data);
      const initialAccordionState = data.map(() => {
        return { isOpen: false };
      });
      setAccordionData(initialAccordionState);
      setLoading(false);
    }
    catch (error) {
      if (error.config.message == 'Request failed with status code 404') {
        // toast.error(error.response.data.message);
        // navigate('/*')
        console.log(error);
      }
      else {
        toast.error(error.message);
      }
    }
  }

  const handleEnableDisableAccount = (email) => {
    const updatedAdmins = [...admins];
    const adminIndex = updatedAdmins.findIndex(admin => admin.email === email);
    if (adminIndex !== -1) {
      const apiUrl = updatedAdmins[adminIndex].state_us ? `http://localhost:3700/admins/disableAccount/${email}` : `http://localhost:3700/admins/enableAccount/${email}`;
      axios.post(apiUrl, { adminId: email })
        .then(response => {
          if (response.data.msg === 'Account is enabled' || response.data.msg === 'Account is disabled') {
            updatedAdmins[adminIndex].state_us = !updatedAdmins[adminIndex].state_us;
            setAdmins(updatedAdmins);
            // toast.success('Account Deleted Successfully');
            localStorage.setItem('admins', JSON.stringify(updatedAdmins));
          } else {
            toast.error('Error in Delete Account ');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  const handleDeleteAccount = (email) => {
    const confirmDelete = () => {
      if (window.confirm('are you sure to delete this User ?')) {
        const apiUrl = `http://localhost:3700/admins/deleteAdmin/${email}`; // استبدل برابط الـ API الخاص بحذف الحساب
        axios.delete(apiUrl, { data: { email: email } })
          .then(response => {
            toast.success('Account Deleted Successfully ');
            viewAdmins(); // إعادة تحميل قائمة المستخدمين بعد الحذف
          })
          .catch(error => {
            toast.error(error.response.data.message);
          });
      }
    };
    confirmDelete();
  };

  useEffect((() => {
    setTimeout(() => {
      { role == 'SuperAdmin' ? viewAdmins() : viewSubAdmins(); }
      setLoading(false);
    }, 3000);
    const savedAdmins = localStorage.getItem('admins');
    if (savedAdmins) {
      setAdmins(JSON.parse(savedAdmins));
    }
  }), [])

  return (
    <div className='sid'>
      {role == 'SuperAdmin' ? <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <AddAdmin viewAdmins={viewAdmins} />
        {loading ? (
          <Box sx={{ width: 1150, ml: 4 }}>
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} sx={{ height: 100 }} />
            ))}
          </Box>
        ) : (
          admins.map((admin, index) => (
            <Box key={index} sx={{ transform: 'scale(0.96)', borderRadius: '50px', mt: 2 }}>
              <Accordion
                key={index}
                expanded={accordionData[index].isOpen}
                onChange={() => handleAccordionClick(index)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className='font'>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }} >
                      {!accordionData[index].isOpen ? (
                        <>
                          {admin.image == null ? <Avatar alt='' style={{ width: '40px', height: '40px' }} className='border' /> : <Avatar src={admin.image.secure_url} alt='' style={{ width: '40px', height: '40px' }} className='border' />}
                          <Typography variant='h6' className='font ms-2 mt-1'>
                            {admin.first_name} {admin.last_name}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant='h5' className='font ms-2 mt-2'>
                          {admin.first_name} {admin.last_name}
                        </Typography>
                      )}
                    </Box>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails >
                  <Box sx={{ mt: 1 }}>
                    <Box sx={{ flexDirection: 'row' }} className='d-flex justify-content-center gap-5 ' >
                      <Box className='d-flex justify-content-center align-items-center ms-2'>
                        {admin.image == null ? <Avatar alt='' className='border' style={{ width: '200px', height: '200px' }} /> : <Avatar src={admin.image.secure_url} alt='' className='border' style={{ width: '200px', height: '200px' }} />}
                      </Box>
                      <Box className='d-flex justify-content-center align-items-center '>
                        <div className="row">
                          <div className="col-md-6 d-flex mb-2">
                            <p className={`${style.title}`}>First Name:</p>
                            <p className={`${style.info}`}>{admin.first_name}</p>
                          </div>
                          <div className="col-md-6 d-flex mb-2">
                            <p variant="h6" className={`${style.title}`}>Last Name: </p>
                            <p className={`${style.info}`}>{admin.last_name}</p>
                          </div>
                          <div className="col-md-6 d-flex mb-2">
                            <p className={`${style.title}`}>Email: </p>
                            <p className={`${style.info}`}>{admin.email}</p>
                          </div>
                          {admin.role == 'SubAdmin' ? <div className="col-md-6 d-flex mb-2">
                            <p className={`${style.title}`}  >Admin At: </p>
                            <p className={`${style.info}`}>{admin.community_id}</p>
                          </div> : ''}

                          <div className="col-md-6 d-flex mb-2">
                            <p className={`${style.title}`} >Address: </p>
                            <p className={`${style.info}`}>{admin.address}</p>
                          </div>
                          <div className="col-md-6 d-flex mb-2">
                            <p className={`${style.title}`} >Created Date: </p>
                            <p className={`${style.info}`}>{format(new Date(admin.created_date), 'dd-MM-yyyy')}</p>
                          </div>
                          <div className="col-md-6 d-flex mb-2">
                            <p className={`${style.title}`}>Stateus: </p>
                            <p className={`${style.info}`}>
                              {admin.state_us == true ? <>
                                Enabel
                              </> : <> Disabel </>}
                            </p>
                          </div>
                          <div className="col-md-6 d-flex mb-2">
                            <p className={`${style.title}`} >Role: </p>
                            <p className={`${style.info}`}>{admin.role}</p>
                          </div>
                          <div className="col-md-6 d-flex mb-2">
                            <p className={`${style.title}`}  >Birthday: </p>
                            <p className={`${style.info}`}>{format(new Date(admin.birth_date), 'dd-MM-yyyy')}</p>
                          </div>
                        </div>
                      </Box>
                    </Box>
                    {role == 'SuperAdmin' ?
                      <Box sx={{ display: 'flex', flexDirection: 'row', mt: 5, ml: 82 }}>
                        <Button variant="contained"
                          onClick={() => handleEnableDisableAccount(admin.email)}
                          className={`button ${style.btn}`}
                          size="small" sx={{ mr: 2 }} >
                          {admin.state_us == true ? <>
                            Disabel Account
                          </> : <> Enabel Account </>}
                        </Button>
                        <Button
                          variant="contained"
                          className={`button ${style.btn}`}
                          size='small'
                          sx={{ mr: 2 }}
                          onClick={() => handleDeleteAccount(admin.email)}
                        > Delete Account
                        </Button>
                        <ResetPassword email={admin.email} />
                      </Box> : <> </>}
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
          ))
        )}
      </Box> :
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {loading ? (
            <Box sx={{ width: 1150, ml: 4 }}>
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} sx={{ height: 100 }} />
              ))}
            </Box>
          ) : (
            subadmins.map((subadmin, index) => (
              <Box key={index} sx={{ transform: 'scale(0.96)', borderRadius: '50px', mt: 2 }}>
                <Accordion
                  key={index}
                  expanded={accordionData[index].isOpen}
                  onChange={() => handleAccordionClick(index)}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className='font'>
                      <Box sx={{ display: 'flex', flexDirection: 'row' }} >
                        {!accordionData[index].isOpen ? (
                          <>
                            {subadmin.image == null ? <Avatar alt='' style={{ width: '40px', height: '40px' }} className='border' /> : <Avatar src={subadmin.image.secure_url} alt='' style={{ width: '40px', height: '40px' }} className='border' />}
                            <Typography variant='h6' className='font ms-2 mt-1'>
                              {subadmin.first_name} {subadmin.last_name}
                            </Typography>
                          </>
                        ) : (
                          <Typography variant='h5' className='font ms-2 mt-2'>
                            {subadmin.first_name} {subadmin.last_name}
                          </Typography>
                        )}
                      </Box>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails >
                    <Box sx={{ mt: 1 }}>
                      <Box sx={{ flexDirection: 'row' }} className='d-flex justify-content-center gap-5 ' >
                        <Box className='d-flex justify-content-center align-items-center ms-2'>
                          <Avatar src='Images/myphoto.jpg' alt='' className='border' style={{ width: '220px', height: '220px' }} />
                        </Box>
                        <Box className='d-flex justify-content-center align-items-center '>
                          <div className="row">
                            <div className="col-md-6 d-flex mb-2">
                              <p className={`${style.title}`}>First Name:</p>
                              <p className={`${style.info}`}>{subadmin.first_name}</p>
                            </div>
                            <div className="col-md-6 d-flex mb-2">
                              <p variant="h6" className={`${style.title}`}>Last Name: </p>
                              <p className={`${style.info}`}>{subadmin.last_name}</p>
                            </div>
                            <div className="col-md-6 d-flex mb-2">
                              <p className={`${style.title}`}>Email: </p>
                              <p className={`${style.info}`}>{subadmin.email}</p>
                            </div>
                            <div className="col-md-6 d-flex mb-2">
                              <p className={`${style.title}`}  >Admin At: </p>
                              <p className={`${style.info}`}>{subadmin.community_id}</p>
                            </div>

                            <div className="col-md-6 d-flex mb-2">
                              <p className={`${style.title}`} >Address: </p>
                              <p className={`${style.info}`}>{subadmin.address}</p>
                            </div>
                            <div className="col-md-6 d-flex mb-2">
                              <p className={`${style.title}`} >Created Date: </p>
                              <p className={`${style.info}`}>{format(new Date(subadmin.created_date), 'dd-MM-yyyy')}</p>
                            </div>
                            <div className="col-md-6 d-flex mb-2">
                              <p className={`${style.title}`}>Stateus: </p>
                              <p className={`${style.info}`}>
                                {subadmin.state_us == true ? <>
                                  Enabel
                                </> : <> Disabel </>}
                              </p>
                            </div>
                            <div className="col-md-6 d-flex mb-2">
                              <p className={`${style.title}`} >Role: </p>
                              <p className={`${style.info}`}>{subadmin.role}</p>
                            </div>
                            <div className="col-md-6 d-flex mb-2">
                              <p className={`${style.title}`}  >Birthday: </p>
                              <p className={`${style.info}`}>{format(new Date(subadmin.birth_date), 'dd-MM-yyyy')}</p>
                            </div>
                          </div>
                        </Box>
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
            ))
          )}
        </Box>}
    </div>
  );
}
