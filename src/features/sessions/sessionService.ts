import axios from 'axios';

const API_URL: string = 'http://localhost:3001/sessions';

const getAllSessions = async () => {
    const token = localStorage.getItem('token');
    const res: any = await axios.get(API_URL + '/', {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};

const sessionService = {
    getAllSessions,
};

export default sessionService;