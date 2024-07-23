export interface ImageData {
    contentType: string;
    residentId: string;
    _id: string;
    data: { data: ArrayBuffer };
    src: string;
 }
export interface ConnectionsInterface {
    token: string,
    date: string,
}

export interface UserInterface  {
    _id: string,
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
    createdAt: string,
    updatedAt: string,
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
    role: string;
}
export interface initialStateAuthSliceInterface {
    currentUser: UserInterface | null,
    user: UserInterface | null,
    users: Array<UserInterface>,
	images: Array<ImageData>,
	image: ImageData | null,
	imagesIsLoading: boolean,
    token: string | null,
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean,
    error: string | null,
    msg: string | null,
}