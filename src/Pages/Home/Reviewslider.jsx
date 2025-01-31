import React from 'react';
import SimpleSwiper from './Swaiper/SimpleSwiper';
import SectionTitle from '../../Components/Shared/SectionTitle';

const Reviewslider = () => {
    return (
        <div className='my-6 md:px-40'>
            <SectionTitle title={'What Our Client says!'} subTitle={'Rattings'}></SectionTitle>
            <SimpleSwiper></SimpleSwiper>
        </div>
    );
};

export default Reviewslider;