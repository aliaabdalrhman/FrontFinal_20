import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material';
import { Button } from '@mui/material';
import React, { useState } from 'react'
import style from '../ResetPassword/ResetPassword.module.css'
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

export default function ResetPassword({ email }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let formik = useFormik({
    initialValues: {
      password: '',
    },
    onSubmit: resetPassword,
  })
  let navigate = useNavigate();

  async function resetPassword(values) {
    try {
      let { data } = await axios.post(`https://abr-dcxu.onrender.com/admins/recoverPassword/${email}`, values)
      console.log(data.msg)
      formik.resetForm()

    }
    catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <Button variant="contained" className={`button ${style.btn}`} size='small' onClick={handleClickOpen}>Reset Password</Button>
      <Dialog open={open} fullWidth maxWidth="xl" sx={{ width: '588px', margin: 'auto' }}>
        <DialogTitle className='font d-flex justify-content-center'>
          <div className={`${style.Title} `}>
            Reset Password
          </div>
          <div className='ms-auto'>
            <i className="fa-solid fa-xmark " onClick={handleClose} style={{ cursor: 'pointer' }}></i>
          </div>
        </DialogTitle>
        <DialogContent >
          <Divider className='border-black mb-4' />
          <DialogContentText className='font'>
            <form onSubmit={formik.handleSubmit} className='mt-4'>
              <div className={`p-float-label ${style.input}`}>
                <InputText id="email"
                  type='email'
                  name='email'
                  disabled
                  value={email}
                  className={`textfield ${style.TextField}`} />
                <label htmlFor="email" className='ms-2'>Email</label>
              </div>
              <div className="p-float-label mb-4">
                <InputText id="password"
                  type='password'
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className={`textfield ${style.TextField}`} />
                <label htmlFor="npassword" className='ms-2'> New Password</label>
              </div>
              <Box sx={{}}>
                <Button type='submit' variant="contained" className={`button ms-2 `}  >
                  Change
                </Button>
              </Box>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog >

    </>
  )
}