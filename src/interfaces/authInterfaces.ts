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
    image_path: string,
    connections: Array <ConnectionsInterface>,
    CommentIds: [string],
}