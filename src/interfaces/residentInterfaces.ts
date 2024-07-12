export interface ResidentInterface {
	firstname: string;
	lastname: string;
	email: string;
	phoneNumber: string;
	emergency: {
		nameOfEmergencyContact: string;
		phoneNumber: string;
	};
	birthday: string;
	address: { street: string; yardnumber: string; zipcode: number; city: string; country: string };
	image_path: string;
	moreinfo: string;
	sessions: [{ sessionId: string; activityId: string; sessionDate: any }];
	group: { identificator: string; subdivision: string };
}

export interface initialStateResidentSliceInterface {
    resident: ResidentInterface | null,
    residents: Array<ResidentInterface>,
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean,
    error: string | null,
    msg: string | null,
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