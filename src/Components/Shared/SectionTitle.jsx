import React from 'react';

const SectionTitle = ({ title, subTitle }) => {
    return (
        <div className='w-fit mx-auto my-6'>
            <div>
                <p className='text-purple-900 uppercase text-center font-bold'>---{subTitle}---</p>
                <div className="divider divide-x-4 w-96 mx-auto "></div>
                <h2 className='uppercase bg-gradient-to-tr from-purple-900 to-blue-900 bg-clip-text text-center text-transparent text-3xl font-bold'>{title}</h2>
                <div className="divider divide-x-4 w-96 mx-auto"></div>
            </div>
        </div>
    );
};

export default SectionTitle;