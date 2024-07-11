export interface ResidentInterface {
	firstname: string;
	lastname: string;
	email: string;
	phoneNumber: number;
	emergency: {
		nameOfEmergencyContact: string;
		phoneNumber: number;
	};
	birthday: string;
	adress: { street: string; yardnumber: string; cipcode: number; city: string; country: string };
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
