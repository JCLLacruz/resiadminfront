import { SessionInterface } from "./sessionInterfaces";

export interface ActivityValuesInterface {
	title: string;
	description: string;
}
export interface ActivityInterface extends ActivityValuesInterface{
	_id: string;
	sessions: SessionInterface[];
	image_path: string;
}

export interface InitialStateActivitySliceInterface {
	activity: ActivityInterface | null;
	activities: Array<ActivityInterface>;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	error: string | null;
	msg: string | null;
}
export interface MonthResumeValuesInterface {
	month: string;
	year: string;
	identificator: string;
	subdivision: string;
}