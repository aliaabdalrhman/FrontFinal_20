import { Avatar, Box, Button, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../../../Pages/Css/Pages.css'
import { Column } from 'primereact/column';
import { TreeTable } from 'primereact/treetable';
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import style from './Users.module.css'
import AddUser from '../AddUser/AddUser.jsx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ResetPassword from '../ResetPassword/ResetPassword.jsx';

export default function Users() {

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

  return (
    <div className='sid'>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <AddUser />
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
                    {accordion.isOpen ? <Typography variant='h5' className='font ms-2 mt-2'> Alia abdalrhman </Typography> : <>
                      <Avatar src='img/image1.jpg' alt='' style={{ width: '40px', height: '40px' }} className='border' />
                      <Typography variant='h6' className='font ms-2 mt-1'> Alia abdalrhman</Typography>
                    </>
                    }
                  </Box>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>

                <Box sx={{mt:1}}>
                  <Box sx={{ flexDirection: 'row' }} className='d-flex justify-content-center gap-5 '>
                    <Box className='d-flex justify-content-center align-items-center ms-2 '>
                      <Avatar src='img/image1.jpg' alt='' className='border' style={{ width: '200px', height: '200px' }} />
                    </Box>
                    <Box className='d-flex justify-content-center align-items-center '>
                      <div className="row">
                        <div className="col-md-6 d-flex mb-2">
                          <p className={`${style.title}`}>User name: </p>
                          <p className={`${style.info}`}>Alia abdalrhman</p>
                        </div>
                        <div className="col-md-6 d-flex mb-2">
                          <p className={`${style.title}`}>Email: </p>
                          <p className={`${style.info}`}>Aliaabdalrhman@gmail.com</p>
                        </div>
                        <div className="col-md-6 d-flex mb-2">
                          <p className={`${style.title}`}>Address: </p>
                          <p className={`${style.info}`}>Palestine</p>
                        </div>
                        <div className="col-md-6 d-flex mb-2">
                          <p className={`${style.title}`}>Pio: </p>
                          <p className={`${style.info}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        <div className="col-md-6 d-flex mb-2">
                          <p className={`${style.title}`}>Created Date: </p>
                          <p className={`${style.info}`}>30-10-2022</p>
                        </div>
                        <div className="col-md-6 d-flex mb-2">
                          <p className={`${style.title}`}>Birthday: </p>
                          <p className={`${style.info}`}>17-10-2001</p>
                        </div>
                      </div>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', mt: 5, ml: 82 }}>
                    <Button variant="contained" className={`button ${style.btn}`} size="small" sx={{ mr: 2 }} >Disable Account</Button>
                    <Button variant="contained" className={`button ${style.btn}`} size="small" sx={{ mr: 2 }} >Delete Account</Button>
                    <ResetPassword />
                  </Box>
                </Box>

              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>


    </div>
  )
}
