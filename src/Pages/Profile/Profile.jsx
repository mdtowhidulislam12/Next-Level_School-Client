import React from 'react';
import lottieFile from '../../comming-soon.json'

import { useAuth } from '../../AuthProvider/Authprovider'; // Assuming useAuth is your custom hook for authentication
import Lottie from 'lottie-react';

const Profile = () => {
  const { user, logOut } = useAuth();
  
 

  return (
    <>

    <div className=' bg-gradient-to-tr from-purple-900 to-blue-900 min-h-64  card-body '>
        <div className="lg:flex md:gap-6 items-center">
        <div>
        <img className='w-24 rounded-full' src={user?.photoURL || user?.image} alt="avatar" />
        </div>
        <div>
        <h2 className="text-xl font-bold text-white">{user?.displayName || user?.email}</h2>
        <p className='text-slate-100'><span>5.3k </span> followers <span>. 78 following</span></p>
        <p className='text-blue-200'> <a href={user?.email}>{user?.email}</a></p>
        </div>

        </div>

        <div className="w-full bg-orange-200 border border-orange-200 mt-5"></div>


        <div className='mt-6 flex-col  justify-items-center'>
            <button className='btn btn-primary'>Edit your profile</button><br />
            <button className='btn btn-secondary mt-6'>Membership Subscriptions </button>
            
            </div>
        <div className='text-white font-semibold'>Upgrading.....</div>

        <Lottie className='' animationData={lottieFile} loop={true}></Lottie>

        <div>
            
        </div>
    </div>
    </>
  )
};

export default Profile;
