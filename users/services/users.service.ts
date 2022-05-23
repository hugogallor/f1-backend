import usersDao from "../daos/users.dao";
import { CRUD } from "../../common/crud.interface";
import { CreateUserDTO } from "../dto/create.user.dto";
import { PatchUserDTO } from "../dto/patch.user.dto";
import { PutUserDTO } from "../dto/put.user.dto";

class UsersService implements CRUD{
    async create(resource: CreateUserDTO){
        return usersDao.addUser(resource);
    }

    async deleteById(id: string){
        return usersDao.removeUserById(id);
    }
    
    async list(limit: number, page: number){
        return usersDao.getUsers();
    }

    async patchById(id: string, resource: PatchUserDTO){
        return usersDao.updateUserById(id, resource);
    }

    async readById(id: string){
        return usersDao.getUserById(id);
    }

    async putById(id: string, resource: PutUserDTO){
        return usersDao.updateUserById(id, resource);
    }

    async getUserByEmail(mail: string){
        return usersDao.getUserByEmail(mail);
    }

    async getUserByEmailWithPassword(email: string){
        return usersDao.getUserByEmailWithPassword(email);
    }

   
}

export default new UsersService();