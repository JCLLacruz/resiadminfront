import axios from 'axios';

const API_URL: string = 'https://serverresiadmin.onrender.com/residents';

const getAllResidents = async () => {
    const token = localStorage.getItem('token');
    const res: any = await axios.get(API_URL + '/', {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};
const getResidentById = async (id: string) => {
    const token = localStorage.getItem('token');
    const res: any = await axios.get(API_URL + '/id/' + id, {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};

const createResident = async (resident: any) => {
    const token = localStorage.getItem('token');
    const res: any = await axios.post(API_URL + '/', resident, {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};
const updateResident = async (resident: any, id: string) => {
    const token = localStorage.getItem('token');
    const res: any = await axios.put(API_URL + '/id/' + id, resident, {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};
const activityService = {
    getAllResidents,
    getResidentById,
    createResident,
    updateResident
};

export default activityService;