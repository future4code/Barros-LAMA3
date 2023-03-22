import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { LoginDTO, UserInputDTO } from "../model/user";

const userBusiness = new UserBusiness()

export class UserController {
  signup = async(req: Request, res: Response): Promise<void>=>{
    try {
      const input: UserInputDTO={
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      } 

      const token = await userBusiness.signup(input)
      res.status(200).send({message: "User Created!", acess_token:token})

    } catch (error:any) {
      res.status(error.statusCode|| 400).send(error.message || error.sqlMessage)
      
    }
  }

  login = async(req: Request, res: Response): Promise<void> => {
    try {
      const input: LoginDTO = {
        email: req.body.email,
        password: req.body.password
      }

      const token = await userBusiness.login(input)
      res.status(200).send({message: "Logged in user!", acess_token:token})
    } catch (error:any) {
      res.status(error.statusCode|| 400).send(error.message || error.sqlMessage)
    }
  }


}