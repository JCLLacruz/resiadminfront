import axios from 'axios';

const API_URL: string = 'http://localhost:3001/residents';

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
const activityService = {
    getAllResidents,
    getResidentById,
};

export default activityService;