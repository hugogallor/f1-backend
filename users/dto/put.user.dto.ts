import { driver } from "../../f1info/f1info.dto";
export interface PutUserDTO{
    _id: string,
    email?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    permissionFlags?: number,
    jokerDriver?: driver;
    resetHash?: string,    
    
}