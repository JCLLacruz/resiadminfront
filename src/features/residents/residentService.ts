import axios from 'axios';
import { AttendanceValuesInterface, ResidentValuesInterface } from '../../interfaces/residentInterfaces';

const API_URL: string = 'http://localhost:3001/residents';

const getAllResidents = async () => {
	const token = localStorage.getItem('token');
	const res = await axios.get(API_URL + '/', {
		headers: {
			Authorization: token,
		},
	});
	return res.data;
};
const getResidentById = async (id: string) => {
	const token = localStorage.getItem('token');
	const res = await axios.get(API_URL + '/id/' + id, {
		headers: {
			Authorization: token,
		},
	});
	return res.data;
};

const createResident = async (resident: ResidentValuesInterface) => {
	const token = localStorage.getItem('token');
	const res = await axios.post(API_URL + '/', resident, {
		headers: {
			Authorization: token,
		},
	});
	return res.data;
};
const updateResident = async (resident: ResidentValuesInterface, id: string) => {
	const token = localStorage.getItem('token');
	const res = await axios.put(API_URL + '/id/' + id, resident, {
		headers: {
			Authorization: token,
		},
	});
	return res.data;
};
const updateAttendance = async (attendance: AttendanceValuesInterface) => {
	const token = localStorage.getItem('token');
	const res = await axios.put(API_URL + '/updateattendance', attendance, {
		headers: {
			Authorization: token,
		},
	});
	return res.data;
};
const deleteResident = async (id: string) => {
	const token = localStorage.getItem('token');
	const res = await axios.delete(API_URL + '/id/' + id, {
		headers: {
			Authorization: token,
		},
	});
	return res.data;
};
const uploadImageResident = async (image: FormData) => {
	const token = localStorage.getItem('token');
	const res = await axios.post('http://localhost:3001/images/upload/resident', image, {
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: token,
		},
	});
	return res.data;
};
const deleteImageResident = async (imageId: string, id: string) => {
    const token = localStorage.getItem('token');
    const res = await axios.delete('http://localhost:3001/images/delete/' + imageId,{
        headers: {
            Residentid: id,
            Authorization: token,
        },
    });
    return res.data;
};
const activityService = {
	getAllResidents,
	getResidentById,
	createResident,
	updateResident,
	deleteResident,
	uploadImageResident,
    deleteImageResident,
	updateAttendance,
};

export default activityService;
