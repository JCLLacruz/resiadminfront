import axios from 'axios';
import { ActivityValues } from '../../interfaces/activityIntefaces';

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
const createActivity = async (activity: ActivityValues) => {
    const token = localStorage.getItem('token');
    const res: any = await axios.post(API_URL + '/', activity, {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
}
const deleteActivity = async (id: string) => {
    const token = localStorage.getItem('token');
    const res: any = await axios.delete(API_URL + '/id/' + id, {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
}
const activityService = {
    getAllActivities,
    getActivityById,
    createActivity,
    deleteActivity,
};

export default activityService;