// import { Avatar, Box, Card, TextField } from '@mui/material'
// import React, { useEffect, useRef, useState } from 'react'
// import style from './CreatePost.module.css'
// import { InputText } from 'primereact/inputtext';
// import { Dialog, DialogContent, DialogContentText, Typography, DialogTitle, Divider } from '@mui/material';
// import { Button } from '@mui/material';
// import Slider from "react-slick";
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Formik, useFormik } from 'formik';
// import Checkbox from '@mui/material/Checkbox';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
// import { EmailContext } from '../../../Context/GetEmail';
// import { useContext } from 'react';
// import { toast } from 'react-toastify';
// import DialogActions from '@mui/material/DialogActions';
// import Alert from '@mui/material/Alert';



// export default function CreatePost2({ communityname }) {


//     const [image, setImage] = useState({});

//     async function getInformation() {
//         try {
//             let { data } = await axios.get(`http://localhost:3700/userDo/${localStorage.getItem('email')}/viewMyPersonalInformation`);
//             setImage(data.image.secure_url)
//         }
//         catch (error) {
//             console.log('error:', error);
//         }
//     }

//     let { _id } = useParams();

//     let [properities, setProperities] = useState([]);

//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 600,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplay: true,
//     };
//     async function getPropereties() {
//         try {
//             let { data } = await axios.get(`http://localhost:3700/community/${communityname}/viewProperty`);
//             setProperities(data);
//         }
//         catch (error) {
//             console.log('error:', error);
//         }
//     }
//     const [open, setOpen] = useState(false);
//     const [scroll, setScroll] = useState('paper');

//     const handleClickOpen = (scrollType) => () => {
//         setOpen(true);
//         setScroll(scrollType);
//     };

//     const handleClose = () => {
//         setmissingProperties([])
//         formik.resetForm()
//         setOpen(false);
//     };
//     const descriptionElementRef = useRef(null);
//     const [selectedValue, setSelectedValue] = useState('owner');
//     const [propertyData, setPropertyData] = useState({});
//     const handleRadioChange = (event) => {
//         setSelectedValue(event.target.value);
//     };
//     const handleInputChange = (event, propertyid) => {
//         const inputValue = event.target.value;
//         setPropertyData({ ...propertyData, [propertyid]: event.target.value });

//     };
//     const [missingProperties, setmissingProperties] = useState([]);
//     const [showImageUpload, setShowImageUpload] = useState(false);

//     const formik = useFormik({
//         initialValues: {
//             selectedValue: 'owner', // افتراضياً
//             // القيم الافتراضية لكل خاصية يمكن أن تكون فارغة أو بناءً على الحاجة
//         },
//         onSubmit: async (values) => {
//             try {
//                 // جمع البيانات المطلوبة من الفورم
//                 const formData = {
//                     type: values.selectedValue,
//                     input: properities.map((property) => ({
//                         property: property.property,
//                         value: values[property.property] || '', // يمكنك ضبط القيم الافتراضية حسب الحاجة
//                     })),
//                 };
//                 console.log(formData)
//                 // إرسال البيانات إلى الخادم
//                 const response = await fetch(`http://localhost:3700/communities/${communityname}/${localStorage.getItem('email')}/createPost`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(formData),
//                 });
//                 // التعامل مع الرد من الخادم
//                 const data = await response.json();
//                 console.log(data);
//                 localStorage.setItem('postId', data.post._id);
//                 if (response.ok && data.msg === 'Created successfully :)') {
//                     formik.resetForm();
//                     setmissingProperties([]);
//                     setShowImageUpload(true);
//                 }
//                 else if (data.msg == 'Invalid property values for the given post type') {
//                     setmissingProperties(data.missingProperties);
//                 }

//             } catch (error) {
//                 toast.error(error.response.data.msg);
//                 console.error('Error submitting form:', error);
//             }
//         },
//     });

//     const [selectedImages, setSelectedImages] = useState(null);

//     const handleImageChange = (e) => {
//         setSelectedImages(e.target.files);
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const formData = new FormData();
//             for (const image of selectedImages) {
//                 formData.append('Images', image);
//             }

//             const { data } = await axios.post(`http://localhost:3700/communities/${localStorage.getItem('postId')}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             if (data.message == 'Success') {
//                 toast.success('successfully created post')
//                 localStorage.removeItem('postId');
//                 formik.resetForm();
//             }
//         } catch (error) {
//             console.error('Error uploading images:', error);
//         }
//     }


//     useEffect(() => {
//         getInformation();
//         getPropereties();
//         if (open) {
//             const { current: descriptionElement } = descriptionElementRef;
//             if (descriptionElement !== null) {
//                 descriptionElement.focus();
//             }
//         }
//     },
//         [open] //المفروض هون [open] 
//     );

//     return (
//         <>
//             <Box className='d-flex justify-content-center'>
//                 <Card variant="outlined " className={`shadow-sm ${style.card}`}>
//                     <div className={`d-flex   ${style.content}`}>
//                         <Avatar src={image} className='border' sx={{ width: '58px', height: '58px', mr: 2 }} />
//                         <label htmlFor="" className={`${style.TextField1}`} onClick={handleClickOpen('paper')}>
//                             <Box className='ms-3 mt-3' >
//                                 Create a post ...
//                             </Box>
//                         </label>
//                     </div>
//                 </Card>
//                 <Dialog
//                     open={open}
//                     scroll={scroll}
//                     aria-labelledby="scroll-dialog-title"
//                     aria-describedby="scroll-dialog-description"
//                     fullWidth maxWidth="xl"
//                     sx={{ width: '700px', maxheight: '500px', margin: 'auto' }}
//                 >
//                     <DialogTitle id="scroll-dialog-title" className='font d-flex justify-content-center'>
//                         <div className={style.Title1}>
//                             Create Post
//                         </div>
//                         <div className=' d-flex justify-content-center align-items-center ms-auto' onClick={() => { handleClose(); formik.resetForm(); setShowImageUpload(false) }}>
//                             <i className="fa-solid fa-xmark ms-auto" style={{ cursor: 'pointer' }} />
//                         </div>
//                     </DialogTitle>

//                     <DialogContent dividers={scroll === 'paper'}>
//                         <DialogContentText
//                             id="scroll-dialog-description"
//                             tabIndex={-1}
//                         >
//                             <form onSubmit={formik.handleSubmit}>
//                                 <div>
//                                     <RadioGroup
//                                         row
//                                         aria-labelledby="demo-radio-buttons-group-label"
//                                         name="selectedValue"
//                                         value={formik.values.selectedValue}
//                                         onChange={formik.handleChange}
//                                     >
//                                         <FormControlLabel value="owner" control={<Radio />} label="Owner" />
//                                         <FormControlLabel value="customer" control={<Radio />} label="Customer" />
//                                     </RadioGroup>
//                                     <div className='mt-3 mb-3'>
//                                         {properities.map((property) => (
//                                             <div key={property._id} className="d-flex mb-3">
//                                                 <label htmlFor={property.property} className={`label mt-1 w-25 ${style.title}`}>{property.property}:</label>
//                                                 <TextField
//                                                     size="small"
//                                                     id={property.property}
//                                                     name={property.property}
//                                                     type="text"
//                                                     className={`${style.info}`}
//                                                     {...formik.getFieldProps(property.property)}
//                                                 />
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                                 {missingProperties.length > 0 && (
//                                     <Alert severity="error">You must fill this property: {missingProperties.map((miss) => <span key={miss}>  {miss}  </span>)}</Alert>
//                                 )}
//                                 {!showImageUpload && <DialogActions sx={{ mb: 1 }}>
//                                     <Button type="submit" variant='outlined' className='button' onClick={() => setShowImageUpload(false)} >Create</Button>
//                                 </DialogActions>}
//                             </form >
//                             {showImageUpload &&
//                                 <form onSubmit={handleFormSubmit}>
//                                     <input
//                                         className="form-control"
//                                         type="file"
//                                         // id="imageUpload"
//                                         // name="Images"
//                                         multiple
//                                         onChange={handleImageChange} />
//                                     <DialogActions sx={{ mb: 1 }}>
//                                         {/* <Button variant='outlined' className='button' onClick={() => { handleClose(); formik.resetForm(); setShowImageUpload(false) }}>Cancel</Button> */}
//                                         <Button type='submit' variant='outlined' className='button'>Add Image </Button>
//                                     </DialogActions>
//                                 </form>
//                             }
//                         </DialogContentText>
//                     </DialogContent>

//                     {/* <Button type="submit" variant='outlined' className='button' >Create</Button> */}
//                 </Dialog>
//             </Box >
//         </>
//     )
// }

