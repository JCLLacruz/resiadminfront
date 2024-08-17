import { ImageData } from './appInterfaces';
import { SessionInterface } from './sessionInterfaces';

export interface ImageDataResident extends ImageData {
	residentId: string;
}
export interface residentValues {
	firstname: string;
	lastname: string;
	email: string;
	phoneNumber: string;
	emergency: {
		nameOfEmergencyContact: string;
		phoneNumber: string;
	};
	birthday: string;
	address: { street: string; yardnumber: string; zipcode: string; city: string; country: string };
	moreinfo: string;
	group: { identificator: string; subdivision: string };
}
export interface ResidentInterface extends residentValues {
	_id: string;
	images: ImageDataResident[];
	sessions: SessionInterface[];
}
export interface initialStateResidentSliceInterface {
	resident: ResidentInterface | null;
	residents: Array<ResidentInterface>;
	images: ImageDataResident[];
	image: ImageDataResident | null;
	imagesIsLoading: boolean;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	error: string | null;
	msg: string | null;
}
export interface attendanceValues {
	residentIds: string[];
	date: string;
}
