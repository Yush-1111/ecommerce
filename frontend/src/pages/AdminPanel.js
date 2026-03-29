import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from 'react-icons/fa6';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/Role';
import { getAuthToken } from '../helpers/auth';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();
    const token = getAuthToken();
    const normalizedRole = user?.role?.toUpperCase();

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        if (user && normalizedRole !== ROLE.ADMIN) {
            navigate('/');
        }
    }, [navigate, normalizedRole, token, user]);

    if (token && !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-lg text-gray-600">Loading admin panel...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white shadow-md md:min-h-screen">
                <div className="px-4 py-5 md:h-32 bg-blue-500 flex flex-row md:flex-col items-center justify-start md:justify-center gap-4 md:space-y-2">
                    <div className="w-20 h-20 border-2 border-white rounded-full overflow-hidden">
                        {user?.profilePic ? (
                            <img src={user?.profilePic} alt={user?.name} className="w-full h-full object-cover" />
                        ) : (
                            <FaRegCircleUser className="w-20 h-20 text-white" />
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="text-white text-base md:text-lg font-semibold capitalize truncate">{user?.name}</p>
                        <p className="text-white text-sm">{user?.role}</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="grid grid-cols-2 md:grid-cols-1 gap-2 p-4">
                    <Link
                        to="all-users"
                        className="block px-4 py-3 rounded-md text-center md:text-left text-gray-700 font-semibold hover:bg-blue-100 hover:text-blue-600 transition"
                    >
                        All Users
                    </Link>
                    <Link
                        to="all-products"
                        className="block px-4 py-3 rounded-md text-center md:text-left text-gray-700 font-semibold hover:bg-blue-100 hover:text-blue-600 transition"
                    >
                        All Products
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-3 sm:p-4 md:p-6 bg-gray-100 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminPanel;
