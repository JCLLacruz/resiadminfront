export interface ConnectionsInterface {
    token: string,
    date: string,
}

export interface UserInterface  {
    firstname: string,
    lastname: string,
    email: string,
    emailConfirmed: boolean,
    telephonnumber: number,
    birthday: string,
    role: string,
	images: Array<string>;
    connections: Array <ConnectionsInterface>,
    CommentIds: string[],
}

export interface LoginValues {
	email: string;
	password: string;
}
export interface RegisterValues {
	firstname: string;
	lastname: string;
	email: string;
	telephonnumber: number | string;
	password: string;
	confirmPassword: string;
	birthday: any;
    images: Array<string>;
}
export interface initialStateAuthSliceInterface {
    user: UserInterface | null,
    users: Array<UserInterface>,
    token: string | null,
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean,
    error: string | null,
    msg: string | null,
}