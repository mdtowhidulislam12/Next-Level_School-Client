import React from 'react';
import Lottie from 'lottie-react';
import errorLottie from '../../Error-404.json'
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div>
            <Lottie className='w-96 mx-auto' animationData={errorLottie} loop={true}></Lottie>
            <div className='flex justify-center items-center'>
                <Link to={'/'} className=''><button className='btn btn-warning'>GO TO HOME</button></Link>
            </div>
        </div>
    );
};

export default Error;