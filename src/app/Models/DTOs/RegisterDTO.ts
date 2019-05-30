export interface RegisterDTO {
    id:number;
    email: string;
    password: string;
    isBlocked: boolean;
    role: string;
    name: string
}