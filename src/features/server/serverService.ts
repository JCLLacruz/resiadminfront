import axios from 'axios';

const API_URL: string = 'http://localhost:3001/servers';

const serverStatus = async () => {
    const res = await axios.get(API_URL + '/status');
    return res.data;
}

const serverService = {
    serverStatus,
};

export default serverService;