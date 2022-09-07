import { driver } from "../../f1info/f1info.dto";
import { Document } from "mongoose";

export interface CreateUserDTO {
    id: string,
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    permissionFlags?: number,
    joker?: driver;
}

export interface user extends Document{
    _id: string,
    email: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    permissionFlags?: number,
    jokerDriver?: driver;
    resetHash?: string,    
}



