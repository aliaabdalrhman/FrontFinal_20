
import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Avatar, Button, Toolbar } from '@mui/material';
import style from '../Settings/Settings.module.css'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Link, useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { EmailContext } from '../../../Context/GetEmail';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';
export default function UpdateImage({ userData }) {
    const onDrop = React.useCallback((acceptedFiles) => {
        formik3.setFieldValue('image', acceptedFiles[0]);
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxFiles: 1,
    });
    const formik3 = useFormik({
        initialValues: {
            image: null,
        },
        onSubmit: updateImage,
    });
    async function updateImage(values) {
        const formData = new FormData();
        formData.append('image', values.image);
        try {
            const { data } = await axios.post(`http://localhost:3700/userDo/${localStorage.getItem('email')}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (data.message === 'Success') {
                toast.success('The image was successfully updated');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    }
    const [email, setemail] = useState(localStorage.getItem('email'))
    const deleteImage = (email) => {
        const confirmDelete = () => {
            if (window.confirm('are you sure to delete your image ?')) {
                const apiUrl = `http://localhost:3700/userDo/${email}`;
                axios.delete(apiUrl, { data: { email: email } })
                    .then(response => {
                        toast.success('successfully deleted Your Image')
                        // getCommunities(); // إعادة تحميل قائمة المستخدمين بعد الحذف
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        toast.error('error in delete');
                    });
            }
        };
        confirmDelete();
    };
    useEffect(() => {
        //  console.log(email)
    }, [])

    return (
        <><form onSubmit={formik3.handleSubmit} encType='multipart/form-data'>
            <Box className='d-flex justify-content-center '>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>  get image to here..</p>
                    ) : (
                        formik3.values.image ? (
                            <div>
                                {userData.image == null ? <Avatar src={URL.createObjectURL(formik3.values.image)} alt="Uploaded" /> : <Avatar src={URL.createObjectURL(formik3.values.image)} alt="Uploaded" sx={{ width: 260, height: 260, mr: 4, borderRadius: 50 }} />}
                                <p>Image uploaded</p>
                            </div>
                        ) : (
                            <> <div>
                                {userData.image == null ? <Avatar sx={{ width: 260, height: 260, mr: 4 }} variant="circular">
                                </Avatar> : <Avatar src={userData.image.secure_url} sx={{ width: 260, height: 260, mr: 4 }} variant="circular">
                                </Avatar>}
                            </div>
                                <Box sx={{ mt: 0, ml: 30 }}>
                                    <i className="fa-solid fa-trash" style={{ cursor: 'pointer' }} onClick={() => deleteImage(email)} />
                                </Box>
                            </>
                        )
                    )}
                </div>
            </Box>
            <Button type='submit' variant='contained' className='button mt-4 ms-4'>Update your image</Button>
            {/* <Button variant='contained' className='button mt-4' onClick={() => deleteImage(email)}>Delete your image</Button> */}
        </form></>
    )
}
