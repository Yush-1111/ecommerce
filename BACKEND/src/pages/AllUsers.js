import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: ""
    });

    const fetchAllUsers = async () => {
        const fetchData = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: 'include'
        });

        const dataResponse = await fetchData.json();

        if (dataResponse.success) {
            setAllUsers(dataResponse.data);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div className='bg-gray-50 min-h-screen p-6'>
            <div className='overflow-x-auto shadow-md sm:rounded-lg bg-white'>
                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-white'>
                        <tr>
                            <th className='px-6 py-3'>Sr.</th>
                            <th className='px-6 py-3'>Name</th>
                            <th className='px-6 py-3'>Email</th>
                            <th className='px-6 py-3'>Role</th>
                            <th className='px-6 py-3'>Created Date</th>
                            <th className='px-6 py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUser.map((el, index) => (
                            <tr key={el._id} className='bg-white border-b hover:bg-gray-50 transition-all'>
                                <td className='px-6 py-4'>{index + 1}</td>
                                <td className='px-6 py-4 font-medium text-gray-900'>{el?.name}</td>
                                <td className='px-6 py-4'>{el?.email}</td>
                                <td className='px-6 py-4'>
                                    <span className={`px-3 py-1 rounded-full text-white ${el?.role === 'Admin' ? 'bg-blue-500' : 'bg-green-500'}`}>
                                        {el?.role}
                                    </span>
                                </td>
                                <td className='px-6 py-4'>{moment(el?.createdAt).format('LL')}</td>
                                <td className='px-6 py-4 text-center'>
                                    <button
                                        className='bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 rounded-full p-2'
                                        onClick={() => {
                                            setUpdateUserDetails(el);
                                            setOpenUpdateRole(true);
                                        }}
                                    >
                                        <MdModeEdit className='w-5 h-5' />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {openUpdateRole && (
                <ChangeUserRole
                    onClose={() => setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )}
        </div>
    );
};

export default AllUsers;
