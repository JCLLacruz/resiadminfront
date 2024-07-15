import axios from 'axios';

const API_URL: string = 'https://serverresiadmin.onrender.com/activities';

const getAllActivities = async () => {
    const token = localStorage.getItem('token');
    const res: any = await axios.get(API_URL + '/', {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};
const getActivityById = async (id: string) => {
    const res: any = await axios.get(API_URL + '/id/' + id);
    return res.data;
};
const activityService = {
    getAllActivities,
    getActivityById,
};

export default activityService;