import React from 'react';
import { FaHome, FaUser, FaChartBar, FaCogs, FaSignOutAlt, FaPlus, FaListAlt, FaUserAlt } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../AuthProvider/Authprovider';


const Dashboard = () => {
    const { user, logOut } = useAuth();

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="bg-gradient-to-tr from-purple-900 to-blue-900 text-white w-64 p-4 hidden lg:block">
                <div className="text-2xl font-bold text-center mb-8">Dashboard</div>
                <nav className="space-y-4">
                    <Link to="/" className="flex items-center space-x-3 hover:bg-primary-focus p-2 rounded">
                        <FaHome size={20} />
                        <span>Home</span>
                    </Link>
                    <Link to="/admindashboard" className="flex items-center space-x-3 hover:bg-primary-focus p-2 rounded">
                        <FaUserAlt size={20} />
                        <span>Admin</span>
                    </Link>
                    <Link to="/dashboard/addproduct" className="flex items-center space-x-3 hover:bg-primary-focus p-2 rounded">
                        <FaPlus size={20} />
                        <span>Add Product</span>
                    </Link>
                    <Link to="/dashboard/myproducts/email" className="flex items-center space-x-3 hover:bg-primary-focus p-2 rounded">
                        <FaListAlt size={20} />
                        <span>My Products</span>
                    </Link>
                    
                    <Link to="/profile" className="flex items-center space-x-3 hover:bg-primary-focus p-2 rounded">
                        <FaUser size={20} />
                        <span>Profile</span>
                    </Link>
                    <Link to="/analytics" className="flex items-center space-x-3 hover:bg-primary-focus p-2 rounded">
                        <FaChartBar size={20} />
                        <span>Analytics</span>
                    </Link>
                    <Link to="/settings" className="flex items-center space-x-3 hover:bg-primary-focus p-2 rounded">
                        <FaCogs size={20} />
                        <span>Settings</span>
                    </Link>
                    <button onClick={logOut} className="flex items-center space-x-3 hover:bg-base-300 p-2 rounded">
                        <FaSignOutAlt size={20} />
                        <span>Logout</span>
                    </button>
                </nav>
            </div>

            {/* Mobile Sidebar */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full bg-gradient-to-tr from-purple-900 to-blue-900 z-50 text-white p-2 flex justify-around">
                <Link to="/" className="flex flex-col items-center">
                    <FaHome size={20} />
                    <span className="text-xs">Home</span>
                </Link>
                <Link to="/AdminDashboard" className="flex flex-col items-center">
                    <FaUserAlt size={20} />
                    <span className="text-xs">Admin</span>
                </Link>
                <Link to="/profile" className="flex flex-col items-center">
                    <FaUser size={20} />
                    <span className="text-xs">Profile</span>
                </Link>
                <Link to="/analytics" className="flex flex-col items-center">
                    <FaChartBar size={20} />
                    <span className="text-xs">Analytics</span>
                </Link>
                <Link to="/dashboard/addproduct" className="flex flex-col items-center">
                    <FaPlus size={20} />
                    <span className="text-xs">Add Product</span>
                </Link>
                <Link to="/dashboard/myproducts/email" className="flex flex-col items-center">
                    <FaListAlt size={20} />
                    <span className="text-xs">My Products</span>
                </Link>
                {/* <Link to="/settings" className="flex flex-col items-center">
                    <FaCogs size={20} />
                    <span className="text-xs">Settings</span>
                </Link>
                <button onClick={logOut} className="flex flex-col items-center">
                    <FaSignOutAlt size={20} />
                    <span className="text-xs">Logout</span>
                </button> */}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-auto">
                <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg ">
                    <h1 className="text-3xl font-bold mb-6">Welcome, {user?.displayName || 'User'}!</h1>
                    <div className=''> <Outlet /></div> 
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
