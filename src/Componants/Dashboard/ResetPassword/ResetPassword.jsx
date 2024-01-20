import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material';
import { Button } from '@mui/material';
import React, { useState } from 'react'
import style from '../ResetPassword/ResetPassword.module.css'
import { InputText } from 'primereact/inputtext';
export default function ResetPassword() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant="contained" className={`button ${style.btn}`} size='small'  onClick={handleClickOpen}>Reset Password</Button>
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
            <form className='mt-4' action="">
              <div className={`p-float-label ${style.input}`}>
                <InputText id="npassword" type='password' className={`textfield ${style.TextField}`} />
                <label htmlFor="npassword" className='ms-2'>New Password</label>
              </div>
              <div className="p-float-label mb-4">
                <InputText id="cnpassword" type='password' className={`textfield ${style.TextField}`} />
                <label htmlFor="cnpassword" className='ms-2'>Confirm New Password</label>
              </div>
              <Box sx={{ml:33}}>
                <Button variant="contained" className={`button  ${style.Cancel}`} >
                  Cancel
                </Button>
                <Button variant="contained" className={`button ms-2 `}  >
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
