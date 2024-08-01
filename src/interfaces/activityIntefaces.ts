export interface ActivityInterface {
	_id: string;
	title: string;
	description: string;
	sessions: string[];
	image_path: string;
}

export interface initialStateActivitySliceInterface {
	activity: ActivityInterface | null;
	activities: Array<ActivityInterface>;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	error: string | null;
	msg: string | null;
}

export interface ActivityValues {
	title: string;
	description: string;
}

export interface Session {
	activityId: string;
	createdAt: string;
	observations: string;
	residentIds: any[];
	updatedAt: string;
	_id: string;
}

export interface GroupedSessions {
	month: string;
	sessions: Session[];
}
