import { ConnectionsInterface, GroupedConnectionsInterface } from '../interfaces/authInterfaces';
import { ResidentInterface } from '../interfaces/residentInterfaces';
import { GroupedSessionsInterface, SessionInterface } from '../interfaces/sessionInterfaces';

export const getImageSrc = (data: ArrayBuffer, contentType: string) => {
	const base64String = btoa(new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
	return `data:${contentType};base64,${base64String}`;
};

export const formatToISODate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toISOString();
};

export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	return `${day}-${month}-${year}`;
};

export const groupConnectionsByMonth = (connections: ConnectionsInterface[]): GroupedConnectionsInterface[] => {
	const grouped: { [key: string]: { token: string; date: string }[] } = connections.reduce((acc, connection) => {
		const date = new Date(connection.date);
		const monthYear = date.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

		if (!acc[monthYear]) {
			acc[monthYear] = [];
		}

		const formattedDate = formatDate(connection.date);
		acc[monthYear].push({ token: connection.token, date: formattedDate });

		return acc;
	}, {} as { [key: string]: { token: string; date: string }[] });

	return Object.keys(grouped).map((month) => ({
		month,
		connections: grouped[month],
	}));
};

export const groupSessionsByMonth = (sessions: SessionInterface[]): GroupedSessionsInterface[] => {
	const grouped: { [key: string]: { activityId: string; createdAt: string; updatedAt:string; _id: string; observations: string; residentIds: ResidentInterface[] }[] } =
		sessions.reduce((acc, session) => {
			const date = new Date(session.createdAt);
			const monthYear = date.toLocaleString('es-ES', { month: 'long', year: 'numeric' });			
			if (!acc[monthYear]) {
				acc[monthYear] = [];
			}

			const formattedDate = formatDate(session.createdAt);
			acc[monthYear].push({
				activityId: session.activityId,
				createdAt: formattedDate,
				updatedAt: session.updatedAt,
				_id: session._id,
				observations: session.observations,
				residentIds: session.residentIds,
			});

			return acc;
		}, {} as { [key: string]: { activityId: string; createdAt: string; updatedAt:string; _id: string; observations: string; residentIds: ResidentInterface[] }[] });

	return Object.keys(grouped).map((month) => ({
		month,
		sessions: grouped[month],
	}));
};
