import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            {/* header */}

            <Navbar></Navbar>
            {/* main */}
            <div className='min-h-64 md:mx-6 mt-20'>
                <Outlet></Outlet>
            </div>

            {/* Footer */}

            <Footer></Footer>
        </div>
    );
};

export default Layout;