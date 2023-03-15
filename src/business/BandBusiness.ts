import { MissingData, MusicNotFound, ResponsibleNotFound, TokenNotFound, Unauthorized } from "../error/bandErros";
import { NameNotFound } from "../error/userErros";
import { band, BandInputDTO, FindBandDTO } from "../model/band";
import { UserRole } from "../model/user";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import {BandBaseDataBase} from '../data/BandBaseDataBase'
import { CustomError } from "../error/CustomError";

const tokenGenerator = new TokenGenerator()
const idGenerator = new IdGenerator()
const bandBaseDataBase = new BandBaseDataBase()


export class BandBusiness{
  registerBand = async(input: BandInputDTO):Promise<void> =>{
    try {
      const {name, musicGenre, responsible, token} = input
      
      if(!name){
        throw new NameNotFound();
      }

      if(!musicGenre){
        throw new MusicNotFound();
      }

      if(!responsible){
        throw new ResponsibleNotFound();
      }

      if(!token){
        throw new TokenNotFound();
      }

      const data = tokenGenerator.getToken(token)

      if (!data.id) {
        throw new Unauthorized();
    }

      if(data.role.toUpperCase() !== UserRole.ADMIN) {
        throw new Unauthorized()
      }

      const id:string = idGenerator.generateId()

      const band: band = {
        id,
        name,
        music_genre: musicGenre,
        responsible,
      }
      
      await bandBaseDataBase.registerBand(band)
    } catch (error:any) {
      throw new CustomError(400, error.message);
    }
  }

  findBand = async (input: FindBandDTO) => {
    try {
        const {search, token} = input

      if(!search){
          throw new MissingData()
      }

      if(!token){
          throw new TokenNotFound()
      }

      const data = tokenGenerator.getToken(token)

      if (!data.id) {
        throw new Unauthorized();
    }

    const result = await bandBaseDataBase.findBand(search)
    return result


    } catch (error:any) {
      
    }
  }




}

