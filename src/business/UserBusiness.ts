import { UserBaseDataBase } from "../data/UserBaseDataBase";
import { CustomError } from "../error/CustomError";
import { EmailNotFound, InvalidEmail, InvalidPassWord, InvalidRole, NameNotFound, PassWordNotFound, RoleNotFound } from "../error/userErros";
import { user, UserInputDTO, UserRole } from "../model/user";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

const idGenerator = new IdGenerator()
const hashManager = new HashManager()
const userDataBase = new UserBaseDataBase()
const tokenGenerator = new TokenGenerator()

export class UserBusiness {
  signup = async (input: UserInputDTO) :Promise<string> => {
    try {
      const {name, email, password, role} = input
        if(!name){
          throw new NameNotFound();
        }

        if(!email){
          throw new EmailNotFound();
        }

        if(!email.includes("@")){
          throw new InvalidEmail();
        }

        if(!password){
          throw new PassWordNotFound();
        }

        if(password.length < 6){
          throw new InvalidPassWord(); 
        }

        if(!role){
          throw new RoleNotFound();
        }

        if(role.toUpperCase() !==UserRole.ADMIN && role.toUpperCase() !== UserRole.NORMAL){
          throw new InvalidRole();
          
        } 

        const id: string =  idGenerator.generateId()
        const hashPassword: string = await hashManager.hash(password);

        const user: user = {
          id,
          name,
          email,
          password: hashPassword,
          role
        }

       await userDataBase.signup(user);
       const token = tokenGenerator.generationToken({id,role})
       return token

    } catch (error: any) {
      throw new CustomError(400, error.message); 
    }
  }
}