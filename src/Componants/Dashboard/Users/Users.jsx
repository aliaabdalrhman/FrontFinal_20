import { Avatar, Box, Button, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../../../Pages/Css/Pages.css'
import style from './Users.module.css'
import AddUser from '../AddUser/AddUser.jsx';
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

export default function Users() {

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [accordionData, setAccordionData] = useState([]);
  let [communityDetailsFetched, setCommunityDetailsFetched] = useState(false);

  const handleAccordionClick = (index) => {
    const updatedAccordionData = [...accordionData];
    updatedAccordionData[index].isOpen = !updatedAccordionData[index].isOpen;
    setAccordionData(updatedAccordionData);
  };
  async function viewUsers() {
    try {
      let { data } = await axios.get('http://localhost:3700/user/viewUser');

      if (data.message == 'success') {
        console.log(data.Users)
        setUsers(data.Users);
        setCommunityDetailsFetched(true);
        const initialAccordionState = data.Users.map(() => {
          return { isOpen: false };
        });
        setAccordionData(initialAccordionState);
        setLoading(false);
      }

    } catch (err) {
      console.log(err);
    }
  }
  const handleEnableDisableAccount = (email) => {
    const updatedUsers = [...users];
    const userIndex = updatedUsers.findIndex(user => user.email === email);
    if (userIndex !== -1) {
      const apiUrl = updatedUsers[userIndex].state_us ? `http://localhost:3700/admins/disableAccount/${email}` : `http://localhost:3700/admins/enableAccount/${email}`;
      axios.post(apiUrl, { userId: email })
        .then(response => {
          if (response.data.msg === 'Account is enabled' || response.data.msg === 'Account is disabled') {
            updatedUsers[userIndex].state_us = !updatedUsers[userIndex].state_us;
            setUsers(updatedUsers);
            toast.success('Account Deleted Successfully');
            // حفظ الحالة المحدثة في localStorage
            localStorage.setItem('users', JSON.stringify(updatedUsers));
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
        const apiUrl = `http://localhost:3700/user/deleteUser/${email}`; // استبدل برابط الـ API الخاص بحذف الحساب
        axios.delete(apiUrl, { data: { email: email } })
          .then(response => {
            toast.success('The account was successfully deleted');
            viewUsers(); // إعادة تحميل قائمة المستخدمين بعد الحذف
          })
          .catch(error => {
            console.error('Error:', error);
            toast.error('error occurred during the deletion of the account');
          });
      }
    };
    confirmDelete();
  };

  useEffect(() => {
    viewUsers();
    // console.log(users)
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);
  return (


    <div className='sid'>
      {communityDetailsFetched == true ?
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <AddUser viewUsers={viewUsers} />
          {loading ? (
            <Box spacing={1} sx={{ width: 1150, ml: 4 }}>
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} sx={{ height: 100 }} />
              ))}
            </Box>
          ) : (
            users.map((user, index) => (
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
                            {user.image == null ? <Avatar alt='' style={{ width: '40px', height: '40px' }} className='border' /> :
                              <Avatar src={user.image.secure_url} alt='' style={{ width: '40px', height: '40px' }} className='border' />}
                            <Typography variant='h6' className='font ms-2 mt-1'>
                              {user.firstName} {user.lastName}
                            </Typography>
                          </>
                        ) : (
                          <Typography variant='h5' className='font ms-2 mt-2'>
                            {user.firstName} {user.lastName}
                          </Typography>
                        )}
                      </Box>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ mt: 1 }}>
                      <Box sx={{ flexDirection: 'row' }} className='d-flex justify-content-center gap-5 '>
                        <Box className='d-flex justify-content-center align-items-center ms-2 '>
                          {user.image == null ? <Avatar alt='' className='border' style={{ width: '200px', height: '200px' }} /> : <Avatar src={user.image.secure_url} alt='' className='border' style={{ width: '200px', height: '200px' }} />}
                        </Box>
                        <Box className='d-flex justify-content-center align-items-center '>
                          <div className="row">
                            <div className="col-md-6 d-flex mb-2">
                              <p className={`${style.title}`}>First Name: </p>
                              <p className={`${style.info}`}>{user.firstName}</p>
                            </div>
                            <div className="col-md-6 d-flex mb-2">
                              <p className={`${style.title}`}>Last Name: </p>
                              <p className={`${style.info}`}>{user.lastName}</p>
                            </div>
                            <div className="col-md-6 d-flex mb-2">
                              <p className={`${style.title}`}>Email: </p>
                              <p className={`${style.info}`}>{user.email}</p>
                            </div>
                            <div className="col-md-6 d-flex mb-2">
                              <p className={`${style.title}`}>Address: </p>
                              <p className={`${style.info}`}>{user.address}</p>
                            </div>

                            <div className="col-md-6 d-flex mb-2">
                              <p className={`${style.title}`}>Stateus: </p>
                              <p className={`${style.info}`}>
                                {user.state_us ? 'Enabled' : 'Disabled'}
                              </p>
                            </div>
                            <div className="col-md-6 d-flex mb-2">
                              <p className={`${style.title}`}>Created Date: </p>

                              <p className={`${style.info}`}>{user.createdAt && format(new Date(user.createdAt), 'dd-MM-yyyy')}</p>
                            </div>
                            <div className="col-md-6 d-flex mb-2">
                              <p className={`${style.title}`}>Birthday: </p>
                              <p className={`${style.info}`}>{user.birth_date}</p>
                            </div>
                          </div>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'row', mt: 5, ml: 82 }}>
                        <Button variant="contained"
                          onClick={() => handleEnableDisableAccount(user.email)}
                          className={`button ${style.btn}`}
                          size="small" sx={{ mr: 2 }} > {user.state_us ? 'Disable Account' : 'Enable Account'}
                        </Button>
                        <Button variant="contained"
                          className={`button ${style.btn}`}
                          size="small" sx={{ mr: 2 }}
                          onClick={() => handleDeleteAccount(user.email)}>Delete Account</Button>
                        <ResetPassword email={user.email} />
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
            ))
          )}
        </Box>
        : ''}

    </div>
  );
}
