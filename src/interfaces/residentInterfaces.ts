export interface ImageData {
   contentType: string;
   residentId: string;
   _id: string;
   data: { data: ArrayBuffer };
   src: string;
}
export interface ResidentInterface {
	_id:string;
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
	images: {
		contentType: string;
		residentId: string;
		_id:string;
		data:{
			residentId: string;
			data:ArrayBuffer;
		}
	}[],
	moreinfo: string;
	sessions: {
		sessionId: string;
		activityId: string;
		sessionDate: string;
	}[];
	group: { identificator: string; subdivision: string };
}

export interface initialStateResidentSliceInterface {
    resident: ResidentInterface | null,
    residents: Array<ResidentInterface>,
	images: Array<ImageData>,
	image: ImageData | null,
	imagesIsLoading: boolean,
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

