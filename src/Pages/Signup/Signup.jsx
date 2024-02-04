import React, { useState } from 'react'
import { Box, Divider, Typography } from '@mui/material'
import { Button } from '@mui/material'
import { InputText } from "primereact/inputtext";
import style from './Signup.module.css'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { SignUpSchema } from '../Schemas/Signup';
import axios from 'axios';

export default function Signup() {
  let [error, setErroer] = useState(null);
  let [statusError, setStatusError] = useState(' ');
  let navigate = useNavigate();


  let formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    onSubmit: sendSignUpData,
  })

  async function sendSignUpData(values) {

    let { data } = await axios.post('http://localhost:3700/auth/signup', values)
      .catch((err) => {
        console.log(err)
        setStatusError(err.response.data.error);
      });

    if (data.message == "User created successfully") {
      // setErroer([]);
      setStatusError(' ');
      console.log('welcome');
      navigate('/');
    }
    // else if (data.message == "Internal Server Error") {
    //   setErroer(data.error);
    // }
  }

  const GotoSignin = () => {
    navigate('/');
  }

  return (
    <div className='d-flex justify-content-center align-items-center '>
      <div className={`d-flex  ${style.signup}`}>
        <div className={`d-flex justify-content-center align-items-center ${style.asideR}`} >
          <div>
            <div className=" mb-5">
              <div className=''><img src="Images/Logo1.png" className='' />
                <p className={`font ms-2 ${style.logoName}`}>CommuNet</p>
              </div>
            </div>

            <div className="d-flex justify-content-center mb-4 ">
              <Typography className='font w-75 text-capitalize'>
  
                to keep conntact with us login with Your personal information.
              </Typography>
            </div>
            <div className="d-flex justify-content-center mb-5 ">
              <Button variant="" className={`button ${style.signupbtn}`}
                onClick={GotoSignin}
              >
                Sign in
              </Button>
            </div>
            <div className="d-flex justify-content-center mb-5 ">
            </div>
          </div>
        </div>
        <div className={`d-flex justify-content-center align-items-center ${style.asideL}`} >
          <form onSubmit={formik.handleSubmit}>
            <div className="form-content">
              <div className="d-flex justify-content-center ">
                <h2 className='mb-5'>Sign up </h2>
              </div>

              <div className='d-flex justify-content-between'>
                <div className={`p-float-label ${style.input}`}>
                  <InputText id="FirstName"
                    type='text'
                    className={`${style.TextField1}`}
                    name='firstName'
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    required
                  />
                  <label htmlFor="FirstName" className='ms-2'>First Name</label>
                </div>
                <div className="text-danger mb-2">

                </div>
                <div className={`p-float-label ${style.input}`}>
                  <InputText id="LastName"
                    type='text'
                    className={`${style.TextField1}`}
                    name='lastName'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    required
                  />
                  <label htmlFor="LastName" className='ms-2'>Last Name</label>
                </div>
              </div>
              <div className={`p-float-label ${style.input}`}>
                <InputText id="email"
                  type='email'
                  className={`textfield ${style.TextField}`}
                  name='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <label htmlFor="email" className='ms-2'>Email</label>
              </div>

              <div className={`p-float-label mb-4`}>
                <InputText id="password"
                  type='password'
                  className={`textfield ${style.TextField}`}
                  name='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  required
                />
                <label htmlFor="password" className='ms-2'>Password</label>
              </div>
            </div>

            <div className="d-flex justify-content-center ">
              <Button type='submit' variant="contained" className={`button ${style.signinbtn}`}>
                Sign up
              </Button>
            </div>
            {/* <div className="d-flex justify-content-center mb-2 ">
              <Divider className={`mt-3 ${style.divider}`} />
            </div> */}
            {/* <div className="d-flex justify-content-center  ">
              <p>
                or continue with
              </p>
            </div>
            <div className={`d-flex justify-content-center mb-2 ${style.icons}`}>
              <i className="fa-brands fa-google"></i>
              <i className="fa-brands fa-facebook-f" />
            </div> */}

          </form>
        </div>
      </div>
    </div>
  )
}
