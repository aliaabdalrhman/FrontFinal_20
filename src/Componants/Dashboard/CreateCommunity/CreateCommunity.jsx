import React, { useState } from 'react'
import style from './CreateCommunity.module.css'
import { InputText } from 'primereact/inputtext'
import { Button, Divider } from '@mui/material'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox'
import axios from 'axios'
import { Formik, Form, Field } from 'formik';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TreeSelect } from 'primereact/treeselect';
import { CreateCommunitySchema } from '../../../Pages/Schemas/CreateCommunity'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


export default function CreateCommunity() {

  //  let [checked,setchecked]=useState(false);


  let formik1 = useFormik({
    initialValues: {
      communityName: '',
      communityDiscription: ''
    },
    // validationSchema: SignInSchema,
    onSubmit: sendData,

  })

  // let formik2 = useFormik({
  //   initialValues: {
  //     propertyD: '',
  //     valueD: '',
  //     ownerfillD: false,
  //     coustomerfillD: false,
  //   },
  //   // validationSchema: CreateCommunitySchema,
  //   onSubmit: sendDataFromTabel,
  // })

  async function sendData(values) {
    // let  data  = await axios.post('https://abr-dcxu.onrender.com/community/createCommunity', values)
    // console.log(data)
    console.log(values)
    // console.log(data);
    formik1.resetForm()
    // .catch((err) => {
      // console.log('error');
    //   // setStatusError(err.response.data.stack.split(" ").slice(1, 4).join(" "));
    // });
    // if(data.message=='Community created successfully'){
    //   console.log(data);
    // }


  }

  // async function sendDataFromTabel(values, { setSubmitting }) {

  //   const allData = {
  //     tableData: dataList, // قم بتعيين قيمة dataList بالبيانات الموجودة في الجدول
  //     // formData: values // قيم النموذج
  //   };
  //   console.log(allData.tableData);
  //   setDataList([]);
  //   formik1.resetForm();
  //   // let { data } = await axios.post('https://abr-dcxu.onrender.com/community/addProperty', allData)
  //   // console.log(data)

  //   //   .finally(() => {
  //   //     setSubmitting(false); // قم بتعيين قيمة setSubmitting إلى false بمجرد الانتهاء من الطلب
  //   //   });
  // }



  const nodes = [
    { key: 'String', label: 'String', data: 'string' },
    { key: 'Double', label: 'Double', data: 'double' },
    { key: 'Integer', label: 'Integer', data: 'integer' }
  ];

  const [formData, setFormData] = useState({ propertyD: '', ownerFillD: false, coustomerFillD: false });
  const [valueD, setvalueD] = useState(null);
  const [dataList, setDataList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = { ...formData, valueD };
    setDataList([...dataList, newData]);
    setFormData({ propertyD: '', ownerFillD: false, coustomerFillD: false });
    console.log(newData);
    // formik1.resetForm();
    setvalueD(null);
   
  };
  return (
    <>
      <div className="sid ">
        <div className={`d-flex justify-content-center ${style.title}`}>
          <h2 className='mb-2 mt-5'>Create New Community </h2>
        </div>
        <div className='d-flex justify-content-center gap-5'>
          <div className='d-flex'>
            <form onSubmit={(e) => {
              e.preventDefault(); // منع إعادة تحميل الصفحة عند الضغط على زر الإرسال
              sendData(formik1.values); // استدعاء دالة لإرسال البيانات
              // formik1.resetForm(); // مسح البيانات من الفورم بعد الإرسال
            }} className={`mt-5 ${style.form1}`}>
              <div className={`p-float-label ${style.input}`}>
                <InputText id="communityName"
                  type='text'
                  className={`textfield ${style.TextField} `}
                  name='communityName'
                  value={formik1.values.communityName}
                  onChange={formik1.handleChange}
                />
                <label htmlFor="communityName" className='ms-2'>Community Name</label>
              </div>
              <div className={`p-float-label ${style.input}`}>
                <InputText id="communityDiscription"
                  type='text'
                  className={`textfield ${style.TextField} `}
                  name='communityDiscription'
                  value={formik1.values.communityDiscription}
                  onChange={formik1.handleChange} />
                <label htmlFor="communityDiscription" className='ms-2'>Community Description</label>
              </div>
              <div>
                <Button component="label" variant="outlined" className={`${style.upload}`} startIcon={<CloudUploadIcon />}>
                  Upload image
                  <VisuallyHiddenInput type="file" accept="image/*" />
                </Button>
              </div>
              <div>
                <Button type='submit' variant="contained" className={`button mt-4 ${style.send}`} >
                  send data
                </Button>
              </div>
            </form>
            <form onSubmit={handleSubmit} className='mt-5 ms-5 '>
              <div className={`p-float-label ${style.input}`}>
                <InputText inputId="propertyD"
                  value={formData.propertyD}
                  required
                  className={`textfield ${style.TextField}`}
                  onChange={(e) => setFormData({ ...formData, propertyD: e.target.value })} />
                <label htmlFor="propertyD">Property</label>
              </div>
              <div className={`p-float-label ${style.input}`}>
                <TreeSelect inputId="valueD"
                  required
                  name='valueD'
                  className={`textfield ${style.TextField}`}
                  value={valueD} options={nodes}
                  onChange={(e) => setvalueD(e.value)}
                  optionLabel="name" />
                <label htmlFor="valueD">ValueType</label>
              </div>
              <div className="d-flex gap-3 mt-3">
                <label htmlFor="ownerFillD" className="ml-2">Owner Fill</label>
                <Checkbox inputId="ownerFillD"
                  name='ownerFillD'
                  className={`${style.check}`}
                  checked={formData.ownerFillD}
                  onChange={(e) => setFormData({ ...formData, ownerFillD: e.checked })} />
              </div>
              <div className="d-flex gap-3 mt-3">
                <label htmlFor="customerFillD" className="ml-2">Coustomer Fill</label>
                <Checkbox inputId="customerFillD"
                  name='customerFillD'
                  checked={formData.coustomerFillD}
                  onChange={(e) => setFormData({ ...formData, coustomerFillD: e.checked })} />
              </div>
              <div className="">
                <Button type='submit' variant="contained" className={`button mt-2 ${style.send1}`}>add</Button>
              </div>
            </form>
            {/* <form onSubmit={handleSubmit} className='mt-5 ms-5 '>
              <div className={`p-float-label ${style.input}`}>
                <InputText inputId="propertyD"
                  value={formData.propertyD}
                  required
                  className={`textfield ${style.TextField}`}
                  onChange={(e) => setFormData({ ...formData, propertyD: e.target.value })} />
                <label htmlFor="propertyD">Property</label>
              </div>
              <div className={`p-float-label ${style.input}`}>
                <TreeSelect inputId="valueD"
                  required
                  name='valueD'
                  className={`textfield ${style.TextField}`}
                  value={valueD} options={nodes}
                  onChange={(e) => setvalueD(e.value)}
                  optionLabel="name" />
                <label htmlFor="valueD">ValueType</label>
              </div>
              <div className="d-flex gap-3 mt-3">
                <label htmlFor="ownerFillD" className="ml-2">Owner Fill</label>
                <Checkbox inputId="ownerFillD"
                  name='ownerFillD'
                  className={`${style.check}`}
                  checked={formData.ownerfillD}
                  onChange={(e) => setFormData({ ...formData, ownerFillD: e.checked })} />
              </div>
              <div className="d-flex gap-3 mt-3">
                <label htmlFor="customerFillD" className="ml-2">Coustomer Fill</label>
                <Checkbox inputId="customerFillD"
                  name='customerFillD'
                  checked={formData.coustomerfillD}
                  onChange={(e) => setFormData({ ...formData, coustomerFillD: e.checked })} />
              </div>
              <div className="">
                <Button type='submit' variant="contained" className={`button mt-2 ${style.send1}`}>add</Button>
              </div>
            </form> */}
          </div>

        </div>
        <div className="d-flex justify-content-center  mt-5">
          <div className='w-75 mt-5'>
            <table className='table'>
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
                {dataList.map((data, index) => (
                  <tr key={index} className='text-center'>
                    <td >{data.propertyD}</td>
                    <td >{data.valueD}</td>
                    <td >{data.ownerFillD ? 'Yes' : 'No'}</td>
                    <td>{data.coustomerFillD ? 'Yes' : 'No'}</td>
                    <td > <i className="fa-solid fa-trash" /></td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>

        </div>
        {/* <div className="ms-5">
          <form onSubmit={formik2.handleSubmit} className='mt-2'>
            <div>
              <Button type='submit' variant="contained" className={`button mt-2 ${style.send1}`}>send Data </Button>
            </div>
          </form>
        </div> */}

      </div>

    </>
  )
}
