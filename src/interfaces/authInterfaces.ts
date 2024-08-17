import { ImageData } from './appInterfaces';

export interface ImageDataUser extends ImageData {
	userId: string;
}

export interface LoginValues {
	email: string;
	password: string;
}

export interface RegisterValues extends LoginValues {
	firstname: string;
	lastname: string;
	telephonnumber: number | string;
	confirmPassword: string;
	birthday: any;
	role: string;
	jobPosition: string;
}

export interface UserInterface extends RegisterValues {
	_id: string;
	email: string;
	emailConfirmed: boolean;
	images: ImageDataUser[];
	connections: Array<ConnectionsInterface>;
	CommentIds: string[];
	createdAt: string;
	updatedAt: string;
}
export interface ConnectionsInterface {
	token: string;
	date: string;
}
export interface initialStateAuthSliceInterface {
	currentUser: UserInterface | null;
	user: UserInterface | null;
	users: UserInterface[];
	images: ImageDataUser[];
	image: ImageDataUser | null;
	imagesIsLoading: boolean;
	token: string | null;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	error: string | null;
	msg: string | null;
}

export interface resetPasswordValues {
	password: string;
	confirmPassword: string;
}
export interface recoverPasswordValues {
	email: string;
}
export interface GroupedConnections {
	month: string;
	connections: { token: string; date: string }[];
}
