export interface PutUserDTO{
    id: string,
    resetHash?:string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    permissionFlags: number,
    
}