export interface SessionInterface {
    _id: string;
    activityId: string,
	observations: string,
	residentIds: string[],
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

export interface SessionValues {
    activityId: string,
    observations: string,
    residentIds: string[],
	group: { identificator: string; subdivision: string };
}
