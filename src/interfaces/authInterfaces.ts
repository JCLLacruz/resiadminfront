import { ImageDataInterface } from './appInterfaces';

export interface ImageDataUserInterface extends ImageDataInterface {
	userId: string;
}

export interface LoginValuesInterface {
	email: string;
	password: string;
}

export interface RegisterValuesInterface extends LoginValuesInterface {
	firstname: string;
	lastname: string;
	telephonnumber: number | string;
	confirmPassword: string;
	birthday: any;
	role: string;
	jobPosition: string;
}

export interface UserInterface extends RegisterValuesInterface {
	_id: string;
	email: string;
	emailConfirmed: boolean;
	images: ImageDataUserInterface[];
	connections: Array<ConnectionsInterface>;
	CommentIds: string[];
	createdAt: string;
	updatedAt: string;
}
export interface ConnectionsInterface {
	token: string;
	date: string;
}
export interface InitialStateAuthSliceInterface {
	currentUser: UserInterface | null;
	user: UserInterface | null;
	users: UserInterface[];
	images: ImageDataUserInterface[];
	image: ImageDataUserInterface | null;
	imagesIsLoading: boolean;
	token: string | null;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	error: string | null;
	msg: string | null;
}

export interface ResetPasswordValuesInterface {
	password: string;
	confirmPassword: string;
}
export interface RecoverPasswordValuesInterface {
	email: string;
}
export interface GroupedConnectionsInterface {
	month: string;
	connections: { token: string; date: string }[];
}
