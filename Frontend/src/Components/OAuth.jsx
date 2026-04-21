import React from 'react'
import { Instance } from '../lib/Instance';
import { GoogleLogin } from "@react-oauth/google";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/Auth.store';

const OAuth = () => {
    const navigate = useNavigate();
    const handleGoogleError = () => {
        console.log("Login Failed");
    }

    const { loadAuth } = useAuthStore();


    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const authToken = credentialResponse.credential;
            console.log("Google Auth Token: ", authToken);
            if (authToken) {
                const res = await Instance.post(
                    'auth/google',
                    { token: authToken },
                )
                await loadAuth();
                navigate('/auth-redirect');
                // const user = res.data.user;
                // if (user.role === 'pending' && !user.profileCompleted) {
                //     navigate(`/select-role`);
                //     toast.success(`Welcome ${user.name} 🎉 Please select your role to continue.`);
                //     return;
                // }
                // if (user.role === 'candidate') {
                //     navigate('/dashboard');
                //     toast.success(`Welcome ${user.name} 🎉`);
                // }
                // if(user.role === 'recruiter')



            }

        } catch (error) {
            console.log("Google Sign-In Error: ", error)
        }
    }

    return (
        <div>
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
                text="Get started with "
                shape="pill"
            />
        </div>
    )
}

export default OAuth
