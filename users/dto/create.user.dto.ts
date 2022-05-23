import { driver } from "../../f1info/f1info.dto";

export interface CreateUserDTO {
    id: string,
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    permissionFlags?: number,
    joker?: driver;
}

export interface user{
    _id: string,
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    permissionFlags?: number,
    joker?: driver;
}