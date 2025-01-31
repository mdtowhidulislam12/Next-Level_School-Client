import React, { createContext, useEffect, useState } from "react";
import { app } from '../../firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => { 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //  state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // log in user
    const signInWithEmail = async (email, password) => {
        try {
            const userData = await signInWithEmailAndPassword(auth, email, password);
            setUser(userData.user);
        } catch (error) {
            console.error('Error signing in with email:', error.message); 
        }
    };

    // sign up user
    const signUpWithEmail = async (email, password) => {
        try {
            const newUser = await createUserWithEmailAndPassword(auth, email, password);
            setUser(newUser.user);
        } catch (error) {
            console.error('Error signing up with email:', error.message);
        }
    };

    // sign in with Google
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
        } catch (error) {
            console.error('Error signing in with Google:', error.message); 
        }
    };

    // log out user
    const logOut = async () => {
        try {
            await signOut(auth); 
            setUser(null);
        } catch (error) {
            console.error('Error signing out:', error.message); 
        }
    };


    const userData = async()=>{
        try {
           const mongoDbUser= await axios.get(`http://localhost:5000/users/email/$(user.email)`);
            setUser(mongoDbUser)
        } catch (error) {
            console.error(error);
        }
    };


    //loading
    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }
    // value 
    const value = {
        user,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        logOut,
        
    };

    return (
        <AuthContext.Provider value={value}>
            {children} 
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthProvider;
