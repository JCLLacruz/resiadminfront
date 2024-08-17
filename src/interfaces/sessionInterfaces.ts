import { ActivityInterface } from "./activityIntefaces";
import { ResidentInterface } from "./residentInterfaces";

export interface SessionValues {
    activityId: string,
    observations: string,
    residentIds: string[],
	group: { identificator: string; subdivision: string };
}
export interface SessionInterface {
    _id: string;
    activityId: ActivityInterface,
	observations: string,
	residentIds: ResidentInterface[],
	createdAt: string,
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


