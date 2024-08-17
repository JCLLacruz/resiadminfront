import axios from 'axios';
import { MonthResumeValuesInterface } from '../../interfaces/activityIntefaces';

const API_URL: string = 'http://localhost:3001/documents';

const monthResume = async (values: MonthResumeValuesInterface) => {    
    const token = localStorage.getItem('token');
    const res = await axios.post(API_URL + '/monthresume', values,{
		headers: {
			Authorization: token,
		},
        responseType: 'blob',
	});
    return res.data;
}

const serverService = {
    monthResume,
};

export default serverService;