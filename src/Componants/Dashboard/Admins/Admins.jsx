import React, { useEffect, useState } from 'react'
import '../../../Pages/Css/Pages.css'
import { Avatar, Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, Toolbar, Typography } from '@mui/material'
import style from './Admins.module.css'
import AddAdmin from '../AddAdmin/AddAdmin.jsx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ResetPassword from '../ResetPassword/ResetPassword.jsx';
import axios from 'axios';
import { useFormik } from 'formik';

export default function Admins() {
  const [accordionData, setAccordionData] = useState([
    {}, {}, {}, {}, {}
  ]);

  const initialAccordionState = accordionData.map((item) => {
    return { isOpen: false };
  });

  // تعيين الحالة الأولية
  useState(initialAccordionState);

  const handleAccordionClick = (index) => {
    const updatedAccordionData = [...accordionData];
    updatedAccordionData[index].isOpen = !updatedAccordionData[index].isOpen;
    setAccordionData(updatedAccordionData);
  };
  const [isAccountEnabled, setIsAccountEnabled] = useState(true);

  let [admins, setadmins] = useState([]);
  async function viewAdmins() {
    let { data } = await axios.get('https://abr-dcxu.onrender.com/admins/viewAdmin')
    console.log(data);
    setadmins(data)
  }
  // const [email, setEmail] = useState('');
  const handleButtonClick = () => {
    if (isAccountEnabled) {
      setIsAccountEnabled(false);
      // axios.post('localhost:3000/admins/disableAdmin', { email })
      //   .then(response => {
      //     setIsAccountEnabled(false);
      //   })
      //   .catch(error => {
      //     // يمكنك التعامل مع الأخطاء هنا
      //   });
    } else {
      setIsAccountEnabled(true);

      // axios.post('localhost:3000/admins/enableAccount', { email })
      //   .then(response => {
      //     setIsAccountEnabled(true);
      //   })
      //   .catch(error => {
      //     // يمكنك التعامل مع الأخطاء هنا
      //   });
    }
  };
  async function handleDeleteAccount(email) {
    let { data } = await axios.post('http://localhost:3000/admins/deleteAdmin', email)
    console.log(data)

  }
  useEffect((() => {
    // viewAdmins();
  }), [])
  return (
    <div className='sid'>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <AddAdmin />
        <Box sx={{ transform: 'scale(0.96)', borderRadius: '50px', mt: 2 }}>
          {accordionData.map((accordion, index) => (
            <Accordion
              className={`mb-3 ${style.accordion}`}
              key={index}
              expanded={accordion.isOpen}
              onChange={() => handleAccordionClick(index)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography className='font'>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }} >
                    {accordion.isOpen ? <Typography variant='h5' className='font ms-2 mt-2'> Alia  </Typography> : <>
                      <Avatar src='Images/myphoto.jpg' style={{ width: '40px', height: '40px' }} alt='' className='border' />
                      <Typography variant='h6' className='font ms-2 mt-1'> Alia </Typography>
                    </>
                    }
                  </Box>
                </Typography>
              </AccordionSummary>
              <AccordionDetails >
                {/* {admins.map((admin) => { */}
                <Box sx={{ mt: 1 }}>
                  <Box sx={{ flexDirection: 'row' }} className='d-flex justify-content-center gap-5 ' >
                    <Box className='d-flex justify-content-center align-items-center ms-2'>
                      <Avatar src='Images/myphoto.jpg' alt='' className='border' style={{ width: '220px', height: '220px' }} />
                    </Box>
                    <Box className='d-flex justify-content-center align-items-center '>

                      <div className="row">
                        <div className="col-md-6 d-flex mb-2">
                          <p className={`${style.title}`}>Admin Name:</p>
                          {/* <p className={`${style.info}`}>{admin.first_name}{admin.last_name}</p> */}
                        </div>
                        <div className="col-md-6 d-flex mb-2">
                          <p variant="h6" className={`${style.title}`}>Email: </p>
                          {/* <p className={`${style.info}`}>{admin.email}</p> */}
                        </div>
                        <div className="col-md-6 d-flex mb-2">
                          <p className={`${style.title}`}>Admin At: </p>
                          {/* <p className={`${style.info}`}>{admin.community_id}</p> */}
                        </div>
                        <div className="col-md-6 d-flex mb-2">
                          <p className={`${style.title}`} >Created At: </p>
                          {/* <p className={`${style.info}`}>lorem12</p> */}
                        </div>
                        <div className="col-md-6 d-flex mb-2">
                          <p className={`${style.title}`}  >Status: </p>
                          {/* <p className={`${style.info}`}>{admin.state_us}</p> */}
                        </div>
                        <div className="col-md-6 d-flex mb-2">
                          <p className={`${style.title}`} >Address: </p>
                          {/* <p className={`${style.info}`}>{admin.address}</p> */}
                        </div>
                        <div className="col-md-6 d-flex mb-2">
                          <p className={`${style.title}`} >Created Date: </p>
                          {/* <p className={`${style.info}`}>{admin.created_date}</p> */}
                        </div>

                        <div className="col-md-6 d-flex mb-2">
                          <p className={`${style.title}`} >Degree: </p>
                          {/* <p className={`${style.info}`}>3</p> */}
                        </div>
                        <div className="col-md-6 d-flex mb-2">
                          <p className={`${style.title}`}  >Pio: </p>
                          {/* <p className={`${style.info}`}>Lorem ipsum dolor sit amet.</p> */}
                        </div>
                        <div className="col-md-6 d-flex mb-2">
                          <p className={`${style.title}`}  >Birthday: </p>
                          {/* <p className={`${style.info}`}>{admin.birth_date}</p> */}
                        </div>
                      </div>
                    </Box>
                  </Box>
                  {/* <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /> */}
                  <Box sx={{ display: 'flex', flexDirection: 'row', mt: 5, ml: 82 }}>
                    <Button variant="contained" className={`button ${style.btn}`} size='small' sx={{ mr: 2 }} onClick={handleButtonClick}>  {isAccountEnabled ? 'Disable Account' : 'Enable Account'}</Button>
                    {/* <Button variant="contained" className={`button ${style.btn}`} size='small' sx={{ mr: 2 }} >Enable Account</Button> */}
                    <Button variant="contained" className={`button ${style.btn}`} size='small' sx={{ mr: 2 }}
                    // onClick={()=>handleDeleteAccount({admin.email})}
                    >Delete Account</Button>
                    <ResetPassword />
                  </Box>
                </Box>
                {/* })}  */}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </div>
  )
}
