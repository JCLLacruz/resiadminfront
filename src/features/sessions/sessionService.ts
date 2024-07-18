import axios from 'axios';

const API_URL: string = 'https://serverresiadmin.onrender.com/sessions';

const getAllSessions = async () => {
    const token = localStorage.getItem('token');
    const res: any = await axios.get(API_URL + '/', {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};
const createSession = async ({ group, ...session }: any) => {
    const token = localStorage.getItem('token');
    const res: any = await axios.post(API_URL + '/', session, {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};

const sessionService = {
    getAllSessions,
    createSession,
};

export default sessionService;