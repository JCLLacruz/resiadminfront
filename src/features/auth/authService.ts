import axios from 'axios';
import { LoginValues, RegisterValues } from '../../interfaces/authInterfaces';

const API_URL: string = 'http://localhost:3001/users';

const login = async (user: LoginValues ) => {
	const res: any = await axios.post(API_URL + '/login', user);
	if (res.data) {
		localStorage.setItem('user', JSON.stringify(res.data.user));
		localStorage.setItem('token', res.data.token);
	}
	return res.data;
};

const register = async (user: RegisterValues) => {
    const token = localStorage.getItem('token');
    const res: any = await axios.post(API_URL + '/', user, {
        headers: {
            Authorization: token,
        },
    });
    return res.data;
};

const authService = {
    login,
    register,
};

export default authService;
