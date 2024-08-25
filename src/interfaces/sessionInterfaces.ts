import { ActivityInterface } from "./activityIntefaces";
import { ResidentInterface } from "./residentInterfaces";

export interface SessionValuesInterface {
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
	updatedAt: string;
}

export interface InitialStateSessionSliceInterface {
	session: SessionInterface | null;
	sessions: Array<SessionInterface>;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	error: string | null;
	msg: string | null;
}

export interface GroupedSessionsInterface {
	month: string;
	sessions: SessionInterface[];
}


