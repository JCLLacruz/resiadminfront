import axios from 'axios';
import { LoginValues, RegisterValues, resetPasswordValues } from '../../interfaces/authInterfaces';

const API_URL: string = 'http://localhost:3001/users';

const login = async (user: LoginValues) => {
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
const getUserById = async (id: string) => {
	const token = localStorage.getItem('token');
	const res: any = await axios.get(API_URL + '/id/' + id, {
		headers: {
			Authorization: token,
		},
	});
	return res.data;
};
const getAllUsers = async () => {
	const token = localStorage.getItem('token');
	const res: any = await axios.get(API_URL + '/', {
		headers: {
			Authorization: token,
		},
	});
	return res.data;
};
const deleteUser = async (id: string) => {
	const token = localStorage.getItem('token');
	const res: any = await axios.delete(API_URL + '/id/' + id, {
		headers: {
			Authorization: token,
		},
	});
	return res.data;
};
const updateUser = async (user: RegisterValues, id: string) => {
	const token = localStorage.getItem('token');
	const res: any = await axios.put(API_URL + '/id/' + id, user, {
		headers: {
			Authorization: token,
		},
	});
	if (res.data) {
		localStorage.setItem('user', JSON.stringify(res.data.user));
		localStorage.setItem('token', res.data.token);
	}
	return res.data;
};

const logoutUser = async () => {
	const token = localStorage.getItem('token');
	const res = await axios.get(API_URL + '/logout', {
		headers: {
			Authorization: token,
		},
	});
	if (res.data) {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
	}
	return res.data;
};
const uploadImageUser = async (image: any) => {
	const token = localStorage.getItem('token');
	const res = await axios.post('http://localhost:3001/images/upload/user', image, {
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: token,
		},
	});
	return res.data;
};
const deleteImageUser = async (imageId: string, id: string) => {
	const token = localStorage.getItem('token');
	const res = await axios.delete('http://localhost:3001/images/delete/' + imageId, {
		headers: {
			Userid: id,
			Authorization: token,
		},
	});
	return res.data;
};
const recoverPassword = async (email: string) => {
	const res = await axios.get(API_URL + '/recoverpassword/' + email);
	return res.data;
};
const resetPassword = async (password: resetPasswordValues, recoverToken: string) => {
	const res = await axios.put(API_URL + '/resetpassword/' + recoverToken, password);
	return res.data;
};
const authService = {
	login,
	register,
	updateUser,
	getUserById,
	getAllUsers,
	deleteUser,
	logoutUser,
	uploadImageUser,
	deleteImageUser,
	recoverPassword,
	resetPassword,
};

export default authService;
