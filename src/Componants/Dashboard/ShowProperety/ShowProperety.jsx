import axios from 'axios';
import React, { useEffect, useState } from 'react'
import style from './ShowProperety.module.css'
import { toast } from 'react-toastify';

export default function ShowProperety({ community_name }) {

    let [properities, setProperities] = useState([]);


    async function getPropereties(community_name) {
        try {
            let { data } = await axios.get(`http://localhost:3700/community/${community_name}/viewProperty`);
            console.log(data);
            setProperities(data);
        }
        catch (error) {
            console.log('error:', error);
        }
    }
    const handleDeleteCommunity = (community_name, _id) => {
        const confirmDelete = () => {
            if (window.confirm('are you sure to delete this properety ?')) {
                const apiUrl = `http://localhost:3700/community/${community_name}/deleteProperty/${_id}`; // استبدل برابط الـ API الخاص بحذف الحساب
                axios.delete(apiUrl, { data: { _id: _id, community_name: community_name } })
                    .then(response => {
                        toast.success('successfully deleted properety', {
                            position: 'top-center',
                            autoClose: true,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: true,
                            theme: 'dark'
                        });
                        getPropereties(community_name); // إعادة تحميل قائمة المستخدمين بعد الحذف
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        toast.error('error in delete', {
                            position: 'top-center',
                            autoClose: false,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: true,
                            theme: 'dark'
                        });
                    });
            }
        };
        confirmDelete();
    };

    useEffect(() => {
        getPropereties(community_name);
    }, []);
    return (
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
                            <td > <i className="fa-solid fa-trash" style={{ cursor: 'pointer' }} onClick={() => handleDeleteCommunity(community_name, properety._id)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
