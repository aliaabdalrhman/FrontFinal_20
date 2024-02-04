import React, { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, MenuItem, Select, TextField } from '@mui/material';
import { Checkbox } from 'primereact/checkbox'
import style from './AddProperety.module.css'
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
export default function AddProperety({ community_name }) {
    const [open, setOpen] = useState(false);
    let [error, setError] = useState('');
    let [properities, setProperities] = useState([]);


    const location = useLocation();

    const showButton = !location.pathname.includes('createcommunity');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        getPropereties(community_name);
        setOpen(false);
    };
    let formik = useFormik({
        initialValues: {
            "propertyD": "",
            "valueD": " ",
            "ownerFillD": false,
            "customerFillD": false,
        },
        onSubmit: sendProperety,
    })
    async function sendProperety(values) {
        try {
            let { data } = await axios.post(`http://localhost:3700/community/${community_name}/addProperty`, values)
            if (data == 'Added successfully.')
                formik.resetForm();
            toast.success('successfully added properety');
            setError('');

        }
        catch (error) {
            toast.error('faild added properety')
            console.log(error.response.data.message);
            setError(error.response.data.message);
        }
    }
    async function getPropereties(community_name) {
        try {
            let { data } = await axios.get(`http://localhost:3700/community/${community_name}/viewProperty`);
            // console.log(data);
            setProperities(data);
        }
        catch (error) {
            console.log('error:', error);
        }
    }
    const handleDeleteProperety = (community_name, _id) => {
        const confirmDelete = () => {
            if (window.confirm('are you sure to delete this properety ?')) {
                const apiUrl = `http://localhost:3700/community/${community_name}/deleteProperty/${_id}`; // استبدل برابط الـ API الخاص بحذف الحساب
                axios.delete(apiUrl, { data: { _id: _id, community_name: community_name } })
                    .then(response => {
                        toast.success('successfully deleted properety')
                        getPropereties(community_name); // إعادة تحميل قائمة المستخدمين بعد الحذف
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        toast.error('error in delete')
                    });
            }
        };
        confirmDelete();
    };

    const showProperety = () => {
        getPropereties(community_name);
    }

    useEffect(() => {
        getPropereties(community_name);
    }, []);
    return (
        <>
            {showButton && (
                <Button variant="contained" className='button mt-5 ms-5' onClick={showProperety}>
                    Show Properety
                </Button>
            )}
            <Button variant="contained" className='button mt-5  ms-2' onClick={() => handleClickOpen()}>
                Add Properety
            </Button>

            <Dialog open={open} fullWidth maxWidth="xl" sx={{ width: '700px', height: '1000px', margin: 'auto' }}>
                <DialogTitle className='font d-flex justify-content-center'>
                    <div className={` ${style.Title} `}>
                        Add Properety
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
                                <label htmlFor="communityD" className="label w-25 mt-1">Community Name:</label>
                                <TextField id="communityD"
                                    name='communityD'
                                    size="small"
                                    type='text'
                                    className='w-75'
                                    disabled
                                    value={community_name}
                                />
                            </div>
                            <div className="d-flex mb-4">
                                <label htmlFor="propertyD" className="label w-25 mt-1">Property :</label>
                                <TextField id="propertyD"
                                    name='propertyD'
                                    size="small"
                                    type='text'
                                    className='w-75'
                                    value={formik.values.propertyD}
                                    onChange={formik.handleChange}
                                    required />
                            </div>
                            <div className="d-flex mb-4">
                                <label htmlFor="valueD" className="form-label w-25 mt-1">ValueType :</label>
                                <Select
                                    id='valueD'
                                    className="w-75"
                                    size="small"
                                    name='valueD'
                                    displayEmpty
                                    required
                                    value={formik.values.valueD}
                                    onChange={formik.handleChange}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value='String'>String</MenuItem>
                                    <MenuItem value='Integer'>Integer</MenuItem>
                                    <MenuItem value='Double'>Double</MenuItem>

                                </Select>
                            </div>
                            <div className="d-flex gap-3 mb-4">
                                <label htmlFor="ownerFillD" className="ml-2">Owner Fill</label>
                                <Checkbox inputId="ownerFillD"
                                    name='ownerFillD'
                                    className={`${style.check1}`}
                                    checked={formik.values.ownerFillD}
                                    onChange={formik.handleChange}

                                />
                            </div>
                            <div className="d-flex gap-3 mb-4">
                                <label htmlFor="customerFillD" className="ml-2">Coustomer Fill</label>
                                <Checkbox inputId="customerFillD"
                                    name='customerFillD'
                                    className={`${style.check2}`}
                                    checked={formik.values.customerFillD}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className=" text-danger text-capitalize">
                                {Error}
                            </div>
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
            <div className={`${style.table}`} >
                <table className={`table w-75 `}>
                    <thead>
                        <tr className='text-center'>
                            <th >Property</th>
                            <th >Value Type</th>
                            <th >Owner Fill</th>
                            <th >Coustomer Fill</th>
                            <th >Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properities.map((properety, index) => (
                            <tr key={index} className='text-center'>
                                <td >{properety.property}</td>
                                <td >{properety.value}</td>
                                <td >{properety.owner_fill ? 'Yes' : 'No'}</td>
                                <td>{properety.customer_fill ? 'Yes' : 'No'}</td>
                                <td > <i className="fa-solid fa-trash" style={{ cursor: 'pointer' }} onClick={() => handleDeleteProperety(community_name, properety._id)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}
