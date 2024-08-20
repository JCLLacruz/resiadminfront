import { SessionInterface } from "./sessionInterfaces";

export interface ActivityValues {
	title: string;
	description: string;
}
export interface ActivityInterface extends ActivityValues{
	_id: string;
	sessions: SessionInterface[];
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

export interface GroupedSessions {
	month: string;
	sessions: SessionInterface[];
}

export interface MonthResumeValuesInterface {
	month: string;
	year: string;
	identificator: string;
	subdivision: string;
}