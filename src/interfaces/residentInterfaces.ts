import { ImageDataInterface } from './appInterfaces';
import { SessionInterface } from './sessionInterfaces';

export interface ImageDataResidentInterface extends ImageDataInterface {
	residentId: string;
}
export interface ResidentValuesInterface {
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
export interface ResidentInterface extends ResidentValuesInterface {
	_id: string;
	images: ImageDataResidentInterface[];
	sessions: SessionInterface[];
}
export interface initialStateResidentSliceInterface {
	resident: ResidentInterface | null;
	residents: Array<ResidentInterface>;
	images: ImageDataResidentInterface[];
	image: ImageDataResidentInterface | null;
	imagesIsLoading: boolean;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	error: string | null;
	msg: string | null;
}
export interface AttendanceValuesInterface {
	residentIds: string[];
	date: string;
}
