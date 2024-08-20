import axios from 'axios';
import { SessionValuesInterface } from '../../interfaces/sessionInterfaces';

const API_URL: string = 'http://localhost:3001/sessions';

const getAllSessions = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(API_URL + '/', {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};
const getSessionsByResidentId = async (id: string) => {
    const token = localStorage.getItem('token');
    const res = await axios.get(API_URL + '/residentid/'+ id, {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};
const getSessionsByActivityId = async (id: string) => {    
    const token = localStorage.getItem('token');
    const res = await axios.get(API_URL + '/activityid/'+ id, {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};
const createSession = async ({ group, ...session }: {group: string; session: SessionValuesInterface}) => {
    const token = localStorage.getItem('token');
    const res = await axios.post(API_URL + '/', session, {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};
const deleteSession = async (id: string) => {
    const token = localStorage.getItem('token');
    const res = await axios.delete(API_URL + '/id/' + id, {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
}

const sessionService = {
    getAllSessions,
    createSession,
    getSessionsByResidentId,
    getSessionsByActivityId,
    deleteSession,
};

export default sessionService;