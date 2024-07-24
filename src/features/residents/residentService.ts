import axios from 'axios';

const API_URL: string = 'https://serverresiadmin.onrender.com/residents';

const getAllResidents = async () => {
	const token = localStorage.getItem('token');
	const res: any = await axios.get(API_URL + '/', {
		headers: {
			Authorization: token,
		},
	});
	return res.data;
};
const getResidentById = async (id: string) => {
	const token = localStorage.getItem('token');
	const res: any = await axios.get(API_URL + '/id/' + id, {
		headers: {
			Authorization: token,
		},
	});
	return res.data;
};

const createResident = async (resident: any) => {
	const token = localStorage.getItem('token');
	const res: any = await axios.post(API_URL + '/', resident, {
		headers: {
			Authorization: token,
		},
	});
	return res.data;
};
const updateResident = async (resident: any, id: string) => {
	const token = localStorage.getItem('token');
	const res: any = await axios.put(API_URL + '/id/' + id, resident, {
		headers: {
			Authorization: token,
		},
	});
	return res.data;
};
const deleteResident = async (id: string) => {
	const token = localStorage.getItem('token');
	const res: any = await axios.delete(API_URL + '/id/' + id, {
		headers: {
			Authorization: token,
		},
	});
	return res.data;
};
const uploadImageResident = async (image: any) => {
	const token = localStorage.getItem('token');
	const res = await axios.post('https://serverresiadmin.onrender.com/images/upload/resident', image, {
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: token,
		},
	});
	return res.data;
};
const deleteImageResident = async (imageId: string, id: string) => {
    const token = localStorage.getItem('token');
    const res = await axios.delete('https://serverresiadmin.onrender.com/images/delete/' + imageId,{
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
};

export default activityService;
