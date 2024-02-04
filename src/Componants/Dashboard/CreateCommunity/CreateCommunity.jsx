import React, { useEffect, useState } from 'react'
import { useCallback } from 'react';
import style from './CreateCommunity.module.css'
import { InputText } from 'primereact/inputtext'
import { Avatar, Button, Divider } from '@mui/material'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProperety from '../AddProperety/AddProperety'
import { useDropzone } from 'react-dropzone';
import ShowProperety from '../ShowProperety/ShowProperety';
import Swal from 'sweetalert2';

export default function CreateCommunity() {
  let [error, setError] = useState('');

  const initialValues = {
    community_name: '',
    description: '',
    image: '',
  };
  const onDrop = useCallback(acceptedFiles => {
    formik.setFieldValue('image', acceptedFiles[0]); // تعيين الصورة المحددة إلى حقل الصورة في formik
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*', maxFiles: 1 }); // تحديد أنه يمكن تحميل ملف واحد من نوع الصور فقط

  const formik = useFormik({
    initialValues,
    onSubmit: sendData
  });
  async function sendData(values) {
    const formData = new FormData();
    formData.append('community_name', values.community_name);
    formData.append('description', values.description);
    formData.append('image', values.image);
    try {
      const { data } = await axios.post('http://localhost:3700/community/createCommunity', formData);
      if (data.message == 'Community created successfully') {
        setError('')
        toast.success('The community was successfully created')
        console.log(data.newCommunity);
      }
    }
    catch (error) {
      toast.error(error.response.data.message)

      setError(error.response.data.message);
    }
  };


  useEffect(() => {

  }, [])

  return (
    <>
      <div className="sid ">
        <div className={`d-flex ${style.title}`}>
          <h2 className='mb-2 mt-5'>Create New Community </h2>
        </div>
        <form onSubmit={formik.handleSubmit} encType='multipart/form-data' className={`d-flex gap-5 mt-5 ${style.form1}`}>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>  get image to here..</p>
            ) : (
              formik.values.image ? (
                <div className='ms-5'>
                  <img src={URL.createObjectURL(formik.values.image)} alt="Uploaded" width={280} height={280} />
                  <p>Image uploaded</p>
                </div>
              ) : (
                <div>
                  <Avatar sx={{ width: 280, height: 280, mr: 3, ml: 7 }} variant="square">
                    Add Community Image
                  </Avatar>
                </div>
              )
            )}
          </div>
          <div className='mt-3'>
            <div >
              <div className={`p-float-label ${style.input}`}>
                <InputText id="community_name"
                  type='text'
                  className={`textfield ${style.TextField} `}
                  name='community_name'
                  value={formik.values.community_name}
                  onChange={formik.handleChange}
                />
                <label htmlFor="communityName" className='ms-2'>Community Name</label>
              </div>
              <div className={`p-float-label ${style.input}`}>
                <InputText id="description"
                  type='text'
                  className={`textfield ${style.TextField} `}
                  name='description'
                  value={formik.values.description}
                  onChange={formik.handleChange} />
                <label htmlFor="description" className='ms-2'>Community Description</label>
              </div>
            </div>
            <div className='text-danger'>
              {error}
            </div>
            <div className={`d-flex ${style.sendd}`}>
              <div>
                <Button type='submit' variant="contained" className={`button  ${style.send}`} >
                  Create Community
                </Button>
              </div>
            </div>
          </div>
        </form>
        <div className='mt-4'>
          <AddProperety community_name={formik.values.community_name} />
        </div>
      </div>

    </>
  )
}
