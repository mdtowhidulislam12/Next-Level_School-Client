import React from 'react';
import { Link, } from 'react-router-dom';
import { useAuth } from '../../AuthProvider/Authprovider';
import { TbLogout } from 'react-icons/tb';

const Navbar = () => {
    const { user, logOut ,userData} = useAuth();
    console.log(user?.displayName)
    console.log(user?.email)
    

    const handleLogOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.error(error.message);
            alert('Failed to log out. Please try again.');
        }
    };

  
    

    const links = (
        <>
            <li><Link to="/" className="font-bold">Home</Link></li>
            <li><Link to="/about" className="font-bold">About Us</Link></li>
            <li><Link to="/service" className="font-bold">Services</Link></li>
        </>
    );

    return (
        <div>
            <div className="navbar bg-base-100  bg-opacity-70 fixed top-0 z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" aria-label="Open menu">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to="/" className="uppercase font-bold text-xl bg-gradient-to-tr from-purple-900 to-blue-900 bg-clip-text text-transparent md:text-3xl">
                        Next level school
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{links}</ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <div className="dropdown dropdown-end ">
                            <div tabIndex={0} role="button" aria-label="User menu" className="btn btn-ghost btn-circle avatar">
                                <div className="w-24 avatar online rounded-full ">
                                    <img className='w-24  rounded-full' alt="Profile" src={user?.image} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content text-white rounded-box z-10 mt-3 w-52 p-2 shadow min-h-64 bg-gradient-to-tr from-purple-900 to-blue-900">
                                <li className='font-bold'>{user?.displayName || user?.email}</li>
                                <li className='font-semibold mt-5'><Link to={'/profile'}>My Profile</Link></li>
                                <li className='font-semibold '><Link to={'/dashboard'}>Dashboard</Link></li>
                                <li className='font-semibold'><a>Settings</a></li>
                                <div className="divider divider-secondary mt-12"></div>
                                <li className='font-semibold  bg-slate-500 rounded-lg'>
                                    <button onClick={handleLogOut} className="flex text-orange-200 items-center gap-2">
                                        Logout <TbLogout />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/login" className="btn font-bold ">Log In</Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
