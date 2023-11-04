import axios from 'axios';
import {useState} from 'react'




const useServices = () => {
    const [service, setService] = useState([])

    
    axios.get('https://car-doctor-server-xi-seven.vercel.app/services')
    .then (res => setService(res.data))


    return service;
};

export default useServices;