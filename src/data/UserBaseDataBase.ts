import { CustomError } from "../error/CustomError";
import { user } from "../model/user";
import { BaseDataBase } from "./BaseDatabase";


export class UserBaseDataBase extends BaseDataBase{
  private userTable = "TABELA_USUARIOS"

  signup = async(user: user): Promise<void> =>{
    try {
        await UserBaseDataBase.connection(this.userTable)
        .insert(user)

    } catch (error: any) {
        throw new CustomError(400, error.message);    
    }
  }

  getAllUsers = async (): Promise<user[]> => {
    try {
      const result = await UserBaseDataBase.connection(this.userTable)
      return result
    } catch (error:any) {
      throw new CustomError(400, error.message); 
    }
  } 
  
  getUserByEmail = async (email:string):Promise<user> => {
    try {
      const result = await UserBaseDataBase.connection(this.userTable)
      .select()
      .where({email})
      return result[0]
    } catch (error:any) {
      throw new CustomError(400, error.message); 
    }
  }

}