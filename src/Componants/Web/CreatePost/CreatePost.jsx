import { Avatar, Box, Card, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import style from './CreatePost.module.css'
import { InputText } from 'primereact/inputtext';
import { Dialog, DialogContent, DialogContentText, Typography, DialogTitle, Divider } from '@mui/material';
import { Button } from '@mui/material';
import Slider from "react-slick";
// import { Checkbox } from 'primereact/checkbox'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Formik, useFormik } from 'formik';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { EmailContext } from '../../../Context/GetEmail';
import { useContext } from 'react';
import { toast } from 'react-toastify';


import DialogActions from '@mui/material/DialogActions';




export default function CreatePost() {

    const { Email1 } = useContext(EmailContext);
    let { _id } = useParams();
    let [community, setCommunity] = useState({});
    let [communityname, setCommunityname] = useState('');
    let [properities, setProperities] = useState([]);
    let [Posts, setPost] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    async function getcommunityDetails() {
        let { data } = await axios.get(`https://abr-dcxu.onrender.com/community/${_id}`);
        console.log(data)
        setCommunity(data.Community)
        setCommunityname(data.Community.community_name)
    }
    async function getPropereties(communityname) {
        try {
            let { data } = await axios.get(`https://abr-dcxu.onrender.com/community/${communityname}/viewProperty`);
            // console.log(data);
            setProperities(data);
        }
        catch (error) {
            console.log('error:', error);
        }
    }

    async function getPost() {
        try {
            // let { data } = await axios.get(`https://abr-dcxu.onrender.com/userDo/${Email1}/viewMyPosts`);
            // console.log(data);
            // setPost(data);
        }
        catch (error) {
            console.log('error:', error);
        }
    }

    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    // const [selectedValue, setSelectedValue] = useState('');

    // const handleRadioChange = (event) => {
    //     setSelectedValue(event.target.value);
    // };

    // const sendDataToApi = () => {
    //     // إرسال قيمة selectedValue إلى الـ API
    //     axios.post('https://example.com/api/data', { selectedValue })
    //         .then(response => {
    //             console.log('Data sent successfully:', response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error sending data:', error);
    //         });
    // };


    // const [formData, setFormData] = useState({});
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const response = await axios.post('http://localhost:3000/communities/ele/alosh@gmail.com/createPost', formData);
    //         console.log('Data sent successfully:', response.data);
    //     } catch (error) {
    //         console.error('Error sending data:', error);
    //     }
    // };

    // const handleInputChange = (event, propertyName) => {
    //     const value = event.target.value;
    //     setFormData({ ...formData, [propertyName]: value });
    // };


    const [selectedValue, setSelectedValue] = useState('owner');
    const [propertyData, setPropertyData] = useState({});

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleInputChange = (event, propertyid) => {
        const inputValue = event.target.value;

        setPropertyData({ ...propertyData, [propertyid]: event.target.value });

    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            type: selectedValue,
            input: propertyData
        };
        console.log(formData)
        axios.post(`https://abr-dcxu.onrender.com/communities/${communityname}/${Email1}/createPostold`, formData)
            .then((response) => {
                console.log(response)
                toast.success('successfully created post', {
                    position: 'top-center',
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: true,
                    theme: 'dark'
                });
            })
            .catch((error) => {
                toast.error(error, {
                    position: 'top-center',
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: false,
                    theme: 'dark'
                });

                console.error('Error sending data:', error);
            })

    };

    useEffect(() => {
        getcommunityDetails();
        getPropereties(communityname);
        getPost();

    }, [])

    return (
        <>
            <Box className='d-flex justify-content-center'>
                <Card variant="outlined " className={`shadow-sm ${style.card}`}>
                    <div className={`d-flex   ${style.content}`}>
                        <Avatar src='img/image1.jpg' className='border' sx={{ width: '58px', height: '58px', mr: 2 }} />
                        <label htmlFor="" className={`${style.TextField1}`} onClick={handleClickOpen('paper')}>
                            <Box className='ms-3 mt-3' >
                                Create a post ...
                            </Box>
                        </label>
                    </div>
                </Card>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    fullWidth maxWidth="xl"
                    sx={{ width: '700px', maxheight: '500px', margin: 'auto' }}
                >
                    <DialogTitle id="scroll-dialog-title" className='m-auto'>Create Post</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent dividers={scroll === 'paper'}>
                            <DialogContentText
                                id="scroll-dialog-description"
                                ref={descriptionElementRef}
                                tabIndex={-1}
                            >
                                <div>

                                    {/* <FormLabel id="demo-row-radio-buttons-group-label">Are you?</FormLabel> */}
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={selectedValue}
                                        onChange={handleRadioChange}
                                    >
                                        <FormControlLabel value="owner" control={<Radio />} label="Owner" />
                                        <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                                    </RadioGroup>

                                    {/* <div className='mt-3'>
                                        <p>Fill the propereties of this post :</p>
                                    </div> */}
                                    <div className='mt-3 mb-3'>
                                        {properities.map((property) => (
                                            <div key={property.id} className="d-flex mb-3">
                                                <label htmlFor={property.property} className={`label mt-1 w-25 ${style.title}`}>{property.property}:</label>
                                                <TextField
                                                    size="small"
                                                    id={property.property}
                                                    name={property.property}
                                                    type="text"
                                                    className={`${style.info}`}
                                                    onChange={(e) => handleInputChange(e, property.property)}
                                                />
                                            </div>
                                        ))}
                                        <div className="">
                                            {/* <label htmlFor="formFileMultiple" className="form-label">Add images :</label> */}
                                            <input className="form-control" type="file" id="formFileMultiple" multiple />
                                        </div>

                                        {/* <div classname="mb-3 mt-2">
                                            <label htmlfor="formFileMultiple" classname="form-label">Add images :</label>
                                            <input classname="form-control" type="file" id="formFileMultiple" multiple />
                                        </div> */}
                                    </div>
                                </div>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions sx={{ mb: 1 }}>
                            <Button variant='outlined' className='button' onClick={handleClose}>Cancel</Button>
                            <Button type="submit" variant='outlined' className='button'>Create</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Box>
        </>
    )
}

