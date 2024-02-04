import { Button, Avatar, Box, Dialog, DialogContent, DialogTitle, Divider, DialogContentText, TextField } from '@mui/material';
import style from './AddUser.module.css'
import React, { useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

export default function AddUser({ viewUsers }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    viewUsers();
    setOpen(false);
  };

  let formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      birthday: '',
      address: ''
    },
    onSubmit: adduser
  })

  let [StatusError, setStatusError] = useState(' ');

  async function adduser(values) {
    try {
      let { data } = await axios.post('http://localhost:3700/user/addUser', values);
      if (data.msg === "user created") {
        toast.success('successfully Added User')
        formik.resetForm();
      }
    }
    catch (error) {
      toast.error('Error in Add User !!!');
      setStatusError(error.response.data.msg)
    }
  }

  return (
    <>
      <Button variant="contained" className='button mb-3 ms-4 ' onClick={handleClickOpen}>
        Add New User
      </Button>
      <Dialog open={open} fullWidth maxWidth="xl" sx={{ width: '520px', margin: 'auto' }}>
        <DialogTitle className='font d-flex justify-content-btween'>
          <div className={` ${style.Title} `}>
            Add new User
          </div>
          <div className='  d-flex justify-content-center align-items-center ms-auto' onClick={handleClose}>
            <i className="fa-solid fa-xmark ms-auto" style={{ cursor: 'pointer' }} />
          </div>
        </DialogTitle>
        <DialogContent style={{ overflow: 'hidden' }} >
          <Divider className='border-black mb-3' />
          <DialogContentText className='font'>
            <form onSubmit={formik.handleSubmit} className=' mt-4 ' >
              <div className="d-flex mb-4">
                <label htmlFor="" className="label w-25 mt-1">First Name:</label>
                <TextField id=""
                  size="small"
                  name='firstName'
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  label=" "
                  type='text'
                  className='w-75' />
              </div>
              <div className="d-flex mb-4">
                <label htmlFor="" className="label w-25 mt-1">Last Name:</label>
                <TextField id=""
                  size="small"
                  name='lastName'
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  label=" "
                  type='text'
                  className='w-75' />
              </div>
              <div className="d-flex mb-4">
                <label htmlFor="" className="label w-25 mt-1">Email :</label>
                <TextField id=""
                  size="small"
                  name='email'
                  type='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className='w-75' />
              </div>
              <div className="d-flex mb-4">
                <label htmlFor="" className="label w-25 mt-1">Password :</label>
                <TextField id=""
                  size="small"
                  type='password'
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className='w-75' />
              </div>
              <div className="d-flex mb-4">
                <label htmlFor="bithday" className="form-label w-25 mt-1">Birthday :</label>
                <TextField id="bithday"
                  size="small"
                  type='date'
                  name='birthday'
                  className='w-75'
                  value={formik.values.birthday}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="d-flex mb-4">
                <label htmlFor="address" className="label w-25 mt-1">Address :</label>
                <TextField id="address"
                  size="small"
                  type='text'
                  name='address'
                  className='w-75'
                  value={formik.values.address}
                  onChange={formik.handleChange} />
              </div>
              <Box sx={{ display: 'flex', flexDirection: 'row', mt: 3 }} >
                <Box sx={{ flex: '1 1 auto' }} />
                <Button type='submit'
                  variant='outlined'
                  className='button'>
                  Save
                </Button>
              </Box>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  )
}
