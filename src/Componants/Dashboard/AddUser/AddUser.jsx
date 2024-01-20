import { Button, Avatar, Box, Dialog, DialogContent, DialogTitle, Divider, DialogContentText, TextField } from '@mui/material';
import style from './AddUser.module.css'
import React, { useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik';

export default function AddUser() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let formik = useFormik({
    initialValues: {


    },
    onSubmit: adduser
  })


  async function adduser(values) {
    let { data } = await axios.post('', values)
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
            <i class="fa-solid fa-xmark ms-auto" style={{ cursor: 'pointer' }}></i>
          </div>
        </DialogTitle>
        <DialogContent style={{ overflow: 'hidden' }} >
          <Divider className='border-black mb-3' />
          <DialogContentText className='font'>
            <form onSubmit={formik.handleSubmit} className=' mt-4 ' >
              <div className="d-flex mb-4">
                <label htmlFor="" className="label w-25 mt-1">User Name:</label>
                <TextField id=""
                  size="small"
                  label=" "
                  type='text'
                  className='w-75' />
              </div>
              <div className="d-flex mb-4">
                <label htmlFor="" className="label w-25 mt-1">Email :</label>
                <TextField id=""
                  size="small"
                  label=""
                  type='email'
                  className='w-75' />
              </div>
              <div className="d-flex mb-4">
                <label htmlFor="" className="label w-25 mt-1">Password :</label>
                <TextField id=""
                  size="small"
                  type='password'
                  className='w-75' />
              </div>
              <div className="d-flex mb-4">
                <label htmlFor="bithday" className="form-label w-25 mt-1">Birthday :</label>
                <TextField id="bithday"
                  size="small"
                  type='date'
                  className='w-75'
                  value={formik.values.bithday}
                  onChange={formik.handleChange} />
              </div>
              <div className="d-flex mb-4">
                <label htmlFor="address" className="label w-25 mt-1">Address :</label>
                <TextField id="address"
                  size="small"
                  type='text'
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
