import React, { useEffect, useState } from 'react'
import { useCallback } from 'react';
import style from './UpdateCommunity.module.css'
import { Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProperety from '../AddProperety/AddProperety'
import { useDropzone } from 'react-dropzone';

export default function UpdateCommunity() {
  let { _id } = useParams();
  let [Community, setCommunity] = useState({});
  let [image, setImage] = useState(null);
  let [error, setError] = useState('');
  let [properities, setProperities] = useState([]);

  async function getcommunityDetails() {
    try {
      let { data } = await axios.get(`http://localhost:3700/community/${_id}`);
      setCommunity(data.Community);
      setImage(data.Community.image.secure_url)
    }
    catch (error) {
      console.log('Error !!!', error)
    }
  }

  const initialValues = {
    community_name: '',
    description: '',
    image: null,
  };

  const onDrop = useCallback(acceptedFiles => {
    formik.setFieldValue('image', acceptedFiles[0]); // تعيين الصورة المحددة إلى حقل الصورة في formik
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*', maxFiles: 1 }); // تحديد أنه يمكن تحميل ملف واحد من نوع الصور فقط

  const formik = useFormik({
    initialValues,
    onSubmit: updateData
  });

  async function updateData(values) {
    const formData = new FormData();
    formData.append('community_name', values.community_name);
    formData.append('description', values.description);
    formData.append('image', values.image);
    console.log(values)
    try {
      const { data } = await axios.put(`http://localhost:3700/community/${_id}`, formData);
      console.log(data)
      if (data.message === 'Community updated successfully') {
        setError('')
        toast.success('successfully updated community');
      }
      else {
        console.log('error')
      }
    }
    catch (error) {
      console.log(error.response.data.message)
      setError(error.response.data.message);
    }
  };
  async function getPropereties(communityname) {
    try {
      let { data } = await axios.get(`http://localhost:3700/community/${communityname}/viewProperty`);
      setProperities(data);
    }
    catch (error) {
      console.log('error:', error);
    }
  }

  useEffect(() => {
    getcommunityDetails();
    getPropereties(Community.community_name);
  }, [])

  return (
    <>
      <div className="sid ">
        <div className={`d-flex ${style.title}`}>
          <h2 className='mb-2 mt-5 ms-5'>Update New Community </h2>
        </div>
        <form onSubmit={formik.handleSubmit} encType='multipart/form-data' className={`d-flex gap-5 mt-5 ${style.form1}`}>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>  get image to here..</p>
            ) : (
              formik.values.image ? (
                <div className='ms-5'>
                  <img src={URL.createObjectURL(formik.values.image)} alt="upload image" width={280} height={280} />
                  <p>Image uploaded</p>
                </div>
              ) : (
                <div className='ms-5'>
                  <img src={image} alt="Uploaded" width={280} height={280} />
                </div>
              )
            )}
          </div>

          <div className='mt-3'>
            <div >
              <div className={`mb-3 ${style.input}`}>
                <label htmlFor="community_name" className="form-label">Community Name :</label>
                <input type="text"
                  className={`form-control textfield ${style.TextField}`}
                  id="community_name"
                  name='community_name'
                  placeholder={Community.community_name}
                  value={formik.values.community_name}
                  onChange={formik.handleChange} />
              </div>

              <div className={`mb-3 ${style.input}`}>
                <label htmlFor="Description" className="form-label">Community Description :</label>
                <input type="text"
                  className={`form-control textfield ${style.TextField}`}
                  id="Description"
                  name='description'
                  placeholder={Community.description}
                  value={formik.values.description}
                  onChange={formik.handleChange} 
                  />
              </div>
            </div>
            <div className='text-danger'>
              {error}
            </div>
            <div className={`d-flex ${style.sendd}`}>
              <div>
                <Button type='submit' variant="contained" className={`button  ${style.send}`} >
                  update data
                </Button>
              </div>
            </div>
          </div>
        </form>
        <div className='mt-4'>
          <AddProperety community_name={Community.community_name} />
        </div>
      </div>
    </>
  )
}

