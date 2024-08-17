import axios from 'axios';

const API_URL: string = 'https://serverresiadmin.onrender.com/servers';

const serverStatus = async () => {
    const res = await axios.get(API_URL + '/status');
    return res.data;
}

const serverService = {
    serverStatus,
};

export default serverService;