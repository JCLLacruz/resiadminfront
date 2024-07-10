import axios from 'axios';
import { UserInterface } from '../../interfaces/authInterfaces';

const API_URL: string = 'http://localhost:3001/users';

const login = async (user: UserInterface) => {
	const res: any = await axios.post(API_URL + '/login', user);
	if (res.data) {
		localStorage.setItem('user', JSON.stringify(res.data.user));
		localStorage.setItem('token', res.data.token);
	}
	return res.data;
};

const authService = {
    login,
};

export default authService;
