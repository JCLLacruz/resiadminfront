import { ResidentInterface } from "./residentInterfaces";

export interface SessionValues {
    activityId: string,
    observations: string,
    residentIds: string[],
	group: { identificator: string; subdivision: string };
}
export interface SessionInterface {
    _id: string;
    activityId: string,
	observations: string,
	residentIds: ResidentInterface[],
	createdAt: string,
	updatedAt: string;
}

export interface initialStateSessionSliceInterface {
	session: SessionInterface | null;
	sessions: Array<SessionInterface>;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	error: string | null;
	msg: string | null;
}


