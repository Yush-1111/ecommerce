import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from 'react-icons/fa6';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/Role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate('/');
        }
    }, [user]);

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md h-full hidden md:block ">
                <div className="h-32  bg-blue-500 flex flex-col items-center justify-center space-y-2">
                    <div className="w-20 h-20 border-2 border-white rounded-full overflow-hidden">
                        {user?.profilePic ? (
                            <img src={user?.profilePic} alt={user?.name} className="w-full h-full object-cover" />
                        ) : (
                            <FaRegCircleUser className="w-20 h-20 text-white" />
                        )}
                    </div>
                    <p className="text-white text-lg font-semibold capitalize">{user?.name}</p>
                    <p className="text-white text-sm">{user?.role}</p>
                </div>

                {/* Navigation */}
                <nav className="mt-4 space-y-2 px-4 mb-4">
                    <Link
                        to="All-users"
                        className="block px-4 py-2 rounded-md text-gray-700 font-semibold hover:bg-blue-100 hover:text-blue-600 transition"
                    >
                        All Users
                    </Link>
                    <Link
                        to="All-Products"
                        className="block px-4 py-2 rounded-md text-gray-700 font-semibold hover:bg-blue-100 hover:text-blue-600 transition"
                    >
                        All Products
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-100 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminPanel;
