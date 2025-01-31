import React, { useState } from 'react';
import lottieRegister from '../../register.json';
import Lottie from 'lottie-react';
import { FcGoogle } from 'react-icons/fc';
import { FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider/Authprovider';
import axios from 'axios';

const Register = () => {
    const { signInWithGoogle, signUpWithEmail,user} = useAuth();
    const [imageURL, setImageURL] = useState('');
    const navigate = useNavigate();

    console.log(user)

    // const imgbbAPIKey = '388c794c9b95d21a340b9a471a96b087';
    const imgbbAPIKey = import.meta.env.VITE_IMAGEBB_API_KEY;

    const handleCreateUser = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form.image.files[0];

        if (!image) {
            return alert('Please upload an image.');
        }

        try {
            const formData = new FormData();
            formData.append('image', image);

            const imgbbResponse = await axios.post(
                `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
                formData
            );

            const uploadedImageURL = imgbbResponse.data.data.url;
            setImageURL(uploadedImageURL);

            await signUpWithEmail(email, password);
            const userData = { name, email, image: uploadedImageURL };

            await axios.post('http://localhost:5000/users', userData);

            navigate('/');
        } catch (error) {
            console.error('Error during registration:', error.message);
        }
    };

    const handleGoogleSignUp = async (e) => {
        e.preventDefault();
        try {
            const googleUser = await signInWithGoogle();
            
            navigate('/')
            if (!googleUser || !googleUser.user) {
                throw new Error('Google sign-in failed');
            };
    
            
    
            const userData = {
                name: user?.displayName,
                email: user?.email,
                image: user?.photoURL,
            };
            console.log(userData)
    
            const response = await axios.post('http://localhost:5000/users', userData);
    
            console.log('Server response:', response);
            
    
            // if (response.status === 200 || response.status === 201) {
            //     navigate('/');  
            // } else {
            //     console.error('Failed to register user with Google');
            // }
        } catch (error) {
            console.error('Error signing up with Google:', error.message);
        }
    };
    
    





    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:ml-6 lg:text-left">
                        <div>
                            <Lottie animationData={lottieRegister} loop={true}></Lottie>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleCreateUser} className="card-body">
                            <h1 className="text-3xl font-bold text-center">Register now!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Upload Photo</span>
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    className="file-input file-input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mt-6 space-y-6">
                                <button className="btn btn-primary">Create Account</button>
                                <button onClick={handleGoogleSignUp} className="btn">
                                    Continue with <FcGoogle />
                                </button>

                                <div className="flex justify-between items-center">
                                    <p>Already have an account? Please!</p>
                                    <Link
                                        to={'/login'}
                                        className="flex justify-between items-center font-semibold"
                                    >
                                        Login <FaArrowRight className="ml-2" />
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
