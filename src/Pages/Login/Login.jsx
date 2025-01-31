import React from 'react';
import lottie from '../../Login-user.json';
import Lottie from 'lottie-react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../../AuthProvider/Authprovider';

const Login = () => {
    const { signInWithGoogle, signInWithEmail,user } = useAuth();
    const navigate = useNavigate();

    // Login with email and password
    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            await signInWithEmail(email, password);
        
            
                navigate('/');
            
            
        } catch (error) {
            console.log(error.message);
        }
    };

    // Login with Google
    const handleGoogleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signInWithGoogle();
            navigate('/'); // Navigate after successful Google login
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
                            <Lottie animationData={lottie} loop={true} />
                        </div>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <h1 className="text-3xl font-bold text-center">Login now!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6 space-y-6">
                                <button type="submit" className="btn btn-primary">Login</button>
                                <button onClick={handleGoogleSignUp} className="btn btn-outline w-full mt-2 flex items-center justify-center">
                                    Continue with <FcGoogle className="ml-2" />
                                </button>
                                <div className="flex justify-between items-center mt-4">
                                    <p>New here? create one!</p>
                                    <Link to="/register" className="font-semibold flex items-center">
                                        Register <FaArrowRight className="ml-2" />
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

export default Login;
