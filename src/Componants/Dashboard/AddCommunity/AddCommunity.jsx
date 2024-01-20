import { Box, Button, Divider, DialogContent, DialogContentText, Dialog, DialogTitle, Stepper, Step, StepLabel, TextField, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { FileUpload } from 'primereact/fileupload';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import style from './AddCommunity.module.css'
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useFormik } from 'formik';
import axios from 'axios';
const steps = ['Create Community', 'Add Image', 'Add Properties'];

export default function AddCommunity() {
    const [nodes, setNodes] = useState([]);
    const [open, setOpen] = useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    let [data, setData] = useState([]);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setActiveStep(0);
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const formik = useFormik({
        initialValues: {
            communityName: '',
            communityDescription: '',

        },
        onSubmit: { sendCommunity },

    })
    async function sendCommunity(values) {

        let { data } = await axios.post('https://abr-dcxu.onrender.com/community/createCommunity', values);
        console.log(data)
            .catch((err) => {
                console.log('error');
                //   setStatusError(err.response.data.stack.split(" ").slice(1, 4).join(" "));
            });
        if (data.message == 'Community created successfully') {
            //   setErroes([]);
            //   setStatusError(' ');
            //   navigate('/login');
            console.log('welcome');
        }
        // else {
        //   setErroes(data.validationError);
        // }
    }

    const formik1 = useFormik({
        initialValues: {
            propertyD: '',
            valueD: '',
            ownerFillD: '',
            customerFillD: ''
        },
        onSubmit: { sendCommunityDetalies },

    })
    async function sendCommunityDetalies(values) {

        let { data } = await axios.post('https://abr-dcxu.onrender.com/community/addProperty', values);
        console.log(data)
            .catch((err) => {
                console.log('error');
                //   setStatusError(err.response.data.stack.split(" ").slice(1, 4).join(" "));
            });
        if (data.message == 'Community created successfully') {
            //   setErroes([]);
            //   setStatusError(' ');
            //   navigate('/login');
            console.log('welcome');
        }
        // else {
        //   setErroes(data.validationError);
        // }
    }

    function addData() {
        let files = [];
        for (let i = 1; i <= 5; i++) {
            let node = {
                key: i,
                data: {
                    Property: <>
                        <div className='font'>
                            Property {i}
                        </div>
                    </>,
                    ValueType: <>
                        <div className='font'>
                            String
                        </div>
                    </>
                    ,
                    OwnerFill: <>
                        <div className='font'>
                            No
                        </div>
                    </>
                    ,
                    CoustomerFill: <>
                        <div className='font'>
                            Yes
                        </div>
                    </>,
                    Delete: <>
                        <div className=''>
                            <i class="fa-solid fa-trash " ></i>
                        </div>

                    </>
                },
            };
            files.push(node);
        }
        setData(files);
        setNodes(files);
    }

    return (
        <>
            <Button variant="contained" className='button ms-4' onClick={handleClickOpen}>
                Create new Community
            </Button>
            <Dialog open={open} fullWidth maxWidth="xl" sx={{ width: '900px', margin: 'auto' }}>
                <DialogTitle className='font d-flex justify-content-btween'>
                    <div className={` ${style.Title} `}>
                        Create new Community
                    </div>
                    <div className='d-flex justify-content-center align-items-center ms-auto' onClick={handleClose}>
                        <i class="fa-solid fa-xmark ms-auto" style={{ cursor: 'pointer' }} ></i>
                    </div>
                </DialogTitle>
                <DialogContent >
                    <Divider className='border-black mb-3' />
                    <DialogContentText className='font'>
                        <Box sx={{ height: '530px' }} >
                            <Stepper activeStep={activeStep} className=' me-3 mt-3'>
                                {steps.map((label) => {
                                    const stepProps = {};
                                    const labelProps = {};
                                    return (
                                        <Step key={label} {...stepProps}>
                                            <StepLabel {...labelProps} >{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                            {activeStep == 0 ? <>
                                <Box >
                                    <form className=' mt-5 ' onSubmit={formik.onSubmit} >
                                        <div className="d-flex mb-4">
                                            <label htmlFor="" className={`form-label w-25 mt-2 ${style.label}`}>Community Name:</label>
                                            <InputText id="communityName"
                                                type='text'
                                                className='w-100'
                                                name='communityName'
                                                value={formik.values.communityName}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div class="mb-4">
                                            <div><label for="exampleFormControlTextarea1" className={`form-label ${style.label}`}>Community Description:</label></div>
                                            <InputTextarea rows={5} cols={90}
                                                name='communityDescription'
                                                value={formik.values.communityDescription}
                                                onChange={formik.handleChange} />

                                        </div>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 3, position: 'fixed', bottom: 65, right: 372 }}>
                                            <Box sx={{ flex: '1 1 auto' }} />
                                            {/* <Button type='submit' variant='outlined' className='button me-2'>
                                                send data
                                            </Button> */}
                                            <Button type='submit' onClick={handleNext} variant='outlined' className='button'>
                                                Next
                                            </Button>
                                            {/* <Button type='submit' onClick={(e) => {
                                                e.preventDefault(); // منع سلوك الافتراضي
                                                handleNext(); // استمرار في المعالجة
                                            }} variant='outlined' className='button'>
                                                Next
                                            </Button> */}
                                        </Box>
                                    </form>
                                </Box>
                            </> : ''}
                            {activeStep == 1 ? <>
                                <Box >
                                    <form className='mt-4'>
                                        <div className={`mt-4 ${style.Uploadimg}`}>
                                            <p>Upload Cover Image :</p>
                                            <FileUpload name="demo[]"
                                                url={'/api/upload'}
                                                accept="image/*" maxFileSize={1000000} maxFiles={1}
                                                emptyTemplate={
                                                    <Box sx={{ height: '96px' }}>

                                                    </Box>
                                                }
                                            />
                                        </div>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 3, position: 'fixed', bottom: 65, right: 372 }}>
                                            <Box sx={{ flex: '1 1 auto' }} />
                                            <Button variant='outlined' onClick={handleBack} className='button me-2'>Back</Button>
                                            <Button onClick={handleNext} variant='outlined' className='button'>
                                                Next
                                            </Button>
                                        </Box>
                                    </form>
                                </Box>
                            </> : ''}
                            {activeStep == 2 ? <>
                                <Box >
                                    <form className='mt-4 row ' onSubmit={formik.onSubmit}>
                                        <div className="col-md-3 d-flex justify-content-center ">
                                            <div>
                                                <div className='d-flex justify-content-center'>
                                                    <label htmlFor="inputEmail4" className="form-label mt-1">Property</label>
                                                </div>
                                                <InputText id="propertyD"
                                                    type='text'
                                                    className={`${style.InputText}`}
                                                    name='propertyD'
                                                    value={formik.values.propertyD}
                                                    onChange={formik.handleChange}       
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3 d-flex justify-content-center ">
                                            <div>
                                                <div className='d-flex justify-content-center'>
                                                    <label htmlFor="inputEmail4" className="form-label mt-1">Value Type</label>
                                                </div>
                                                <Select
                                                    className=''
                                                    sx={{ minWidth: 180 }}
                                                    size="small"
                                                    displayEmpty
                                                >
                                                    <MenuItem value="">
                                                        <em> </em>
                                                    </MenuItem>
                                                    <MenuItem value='String'>String</MenuItem>
                                                    <MenuItem value='Integer'>Integer</MenuItem>
                                                    <MenuItem value='Double'>Double</MenuItem>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="col-md-3 d-flex justify-content-center">
                                            <div>
                                                <label htmlFor="inputEmail4" className="form-label  mt-1">Owner Fill</label>
                                                <div className=" d-flex justify-content-center ">
                                                    <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} className='mb-2' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 d-flex justify-content-center ">
                                            <div>
                                                <label htmlFor="inputEmail4" className="form-label  mt-1">Coustomer Fill</label>
                                                <div className=" d-flex justify-content-center ">
                                                    <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} className='mb-2' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <Button className='button ' onClick={() => { addData() }} variant='outlined'>Add</Button>
                                        </div>
                                    </form>
                                    <div className="card mt-3  d-flex justify-content-center ">
                                        <TreeTable value={nodes} paginator rows={3} className=''  >
                                            <Column field="Property" header="Property" style={{ fontSize: '14px', textAlign: 'center' }}  ></Column>
                                            <Column field="ValueType" header="Value Type" style={{ fontSize: '14px', textAlign: 'center' }} ></Column>
                                            <Column field="OwnerFill" header="Owner Fill" style={{ fontSize: '14px', textAlign: 'center' }}></Column>
                                            <Column field="CoustomerFill" header="Coustomer Fill" style={{ fontSize: '14px', textAlign: 'center' }}></Column>
                                            <Column field="Delete" header="Delete" style={{ fontSize: '14px', textAlign: 'center' }}></Column>
                                        </TreeTable>
                                    </div>

                                    <Box sx={{ display: 'flex', flexDirection: 'row', position: 'fixed', bottom: 65, right: 372 }}>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button variant='outlined' onClick={handleBack} className='button me-2'>Back</Button>
                                        <Button variant='outlined' className='button' onClick={handleClose}  >Create</Button>
                                    </Box>

                                </Box>
                            </> : ''}
                        </Box>

                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}
