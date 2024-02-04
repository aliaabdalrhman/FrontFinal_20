import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, MenuItem, Select, TextField } from '@mui/material';
import style from './AddAdmin.module.css'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function AddAdmin({ viewAdmins }) {
  const [open, setOpen] = useState(false);
  const [communities, setCommunities] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    viewAdmins();
    setOpen(false);
  };

  let [StatusError, setStatusError] = useState(' ');

  let formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      adminAt: '',
      degree: '',
      bithday: '',
      address: ''
    },
    onSubmit: addadmin,
  })
  async function addadmin(values) {
    try {
      let { data } = await axios.post('http://localhost:3700/admins/addAdmin', values);
      if (data.msg == "admin created") {
        toast.success('successfully Added Admin')
        formik.resetForm()
      }
    }
    catch (error) {
      toast.error('Error in Add Admin !!!')
      setStatusError(error.response.data.msg)
    }
  }

  async function getadmindata() {
    try {
      let { data } = await axios.get('http://localhost:3700/admins/addAdmin/community');
      setCommunities(data);

    } catch (err) {
      console.log('error')
    }
    // let { data } = await axios.get('http://localhost:3700/admins/addAdmin/community')
    // setCommunities(data);
  }

  useEffect((() => {
    getadmindata();
  }), [])

  return (
    <>
      <Button variant="contained" className='button mb-3 ms-4 ' onClick={handleClickOpen}>
        Add New Admin
      </Button>
      <Dialog open={open} fullWidth maxWidth="xl" sx={{ width: '700px', height: '1000px', margin: 'auto' }}>
        <DialogTitle className='font d-flex justify-content-center'>
          <div className={` ${style.Title} `}>
            Add new Admin
          </div>
          <div className=' d-flex justify-content-center align-items-center ms-auto' onClick={handleClose}>
            <i className="fa-solid fa-xmark ms-auto" style={{ cursor: 'pointer' }} />
          </div>
        </DialogTitle>
        <DialogContent style={{ overflow: 'hidden' }}>
          <Divider className='border-black mb-3' />
          <DialogContentText className='font'>
            <form onSubmit={formik.handleSubmit} className=' mt-4' >
              <div className="d-flex mb-4">
                <label htmlFor="first_name" className="label w-25 mt-1">First Name:</label>
                <TextField id="first_name"
                  name='first_name'
                  size="small"
                  type='text'
                  className='w-75'
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  required
                />
              </div>
              <div className="d-flex mb-4">
                <label htmlFor="last_name" className="label w-25 mt-1">Last Name:</label>
                <TextField id="last_name"
                  size="small"
                  name='last_name'
                  type='text'
                  className='w-75'
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  required />
              </div>
              <div className="d-flex mb-4">
                <label htmlFor="email" className="label w-25 mt-1">Email :</label>
                <TextField id="email"
                  name='email'
                  size="small"
                  type='email'
                  className='w-75'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  required />
              </div>
              <div className="d-flex mb-4">
                <label htmlFor="password" className="label w-25 mt-1">Password :</label>
                <TextField id="password"
                  name='password'
                  size="small"
                  type='password'
                  className='w-75'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  required />
              </div>

              <div className="d-flex mb-4">
                <label htmlFor="degree" className="form-label w-25 mt-1">Degree :</label>
                <Select
                  id='degree'
                  className="w-75"
                  size="small"
                  name='degree'
                  displayEmpty
                  required
                  value={formik.values.degree}
                  onChange={formik.handleChange}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value='SuperAdmin'>SuperAdmin</MenuItem>
                  <MenuItem value='SubAdmin'>SubAdmin</MenuItem>
                </Select>
              </div>
              {formik.values.degree == 'SubAdmin' ? <div className="d-flex mb-4">
                <label htmlFor="adminAt" className="form-label w-25 mt-1">Admin at :</label>
                <Select
                  id='adminAt'
                  className="w-75"
                  size="small"
                  displayEmpty
                  name='adminAt'
                  value={formik.values.adminAt}
                  onChange={formik.handleChange}
                  required
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {communities.map((community) =>
                    <MenuItem value={community.community_name}>
                      {community.community_name}
                    </MenuItem>
                  )}
                </Select>
              </div> : ''}

              <div className="d-flex mb-4">
                <label htmlFor="bithday" className="form-label w-25 mt-1">Birthday :</label>
                <TextField size="small"
                  name='bithday'
                  id='bithday'
                  type='date'
                  className='w-75'
                  value={formik.values.bithday}
                  onChange={formik.handleChange}
                  required />
              </div>
              <div className="d-flex mb-3">
                <label htmlFor="address" className="label w-25 mt-1">Address :</label>
                <TextField id="address"
                  name='address'
                  size="small"
                  type='text'
                  className='w-75'
                  variant="outlined"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  required />
              </div>
              {/* <div className=" text-danger text-capitalize">
                {StatusError}
              </div> */}
              <Box sx={{ display: 'flex', flexDirection: 'row' }} >
                <Box sx={{ flex: '1 1 auto' }} />
                <Button type='submit' variant='outlined' className='button'>
                  Save
                </Button>
              </Box>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog >
    </>
  )
}
