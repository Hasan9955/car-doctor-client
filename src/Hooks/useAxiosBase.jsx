import axios from "axios";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import useAuth from "./useAuth";

const axiosBase = axios.create({
    baseURL: 'https://car-doctor-server-xi-seven.vercel.app',
    withCredentials: true
});

const useAxiosBase = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosBase.interceptors.response.use(
            res => {
                return res;
            },
            error => {
                if (error.response.status === 401 || error.response.data.tokenExpired || error.response.status === 403) {
                    // Only log out the user if the error indicates token expiration
                    console.log('Logging out...');
                    logOut()
                        .then(() => {
                            navigate('/login');
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
                return Promise.reject(error); // Reject the error to handle other cases
            }
        );
    }, [logOut, navigate]);

    return axiosBase;
};

export default useAxiosBase;
