import { BandIdNotFound, BreackTime, EndTimeNotFound, EqualTime, ExistingShow, IncorrectDay, InvalidTime, MissingData, MusicNotFound, ResponsibleNotFound, ReverseTime, StartTimeNotFound, TokenNotFound, Unauthorized, WeekDayNotFound } from "../error/bandErros";
import { NameNotFound } from "../error/userErros";
import { band, BandInputDTO, FindBandDTO, InputShowDayDTO, showDay } from "../model/band";
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

  addShowDay = async(input: InputShowDayDTO)=>{
    try {
      const {weekDay, startTime, endTime, bandId, token} = input   
      if(!weekDay){
        throw new WeekDayNotFound()
      }

      if(weekDay !== "sexta" && weekDay !== "sabado" && weekDay !== "domingo" ){
        throw new IncorrectDay();
        
      }

      if(!startTime){
        throw new StartTimeNotFound()
      }

      if(Number(startTime) < 8 || Number(startTime) > 23){
        throw new InvalidTime();  
      }

      if(Number(endTime) < 8 || Number(endTime) > 23){
        throw new InvalidTime();  
      }

      if(Number(startTime) === Number(endTime) ){
        throw new EqualTime();
      }

      if(Number (startTime) % 1 !== 0 || Number(endTime) % 1 !==0 ){
        throw new BreackTime()
      }

      // if(Number(startTime) > Number (endTime) ){
      //   throw new ReverseTime()
      // }

      if(!endTime){
        throw new EndTimeNotFound()
        
      }

      if(!bandId){
        throw new BandIdNotFound()
      }

      if(!token){
        throw new TokenNotFound()
      }

      const data = tokenGenerator.getToken(token)

      if(!data.id){
        throw new Unauthorized()
      }

      if(data.role.toUpperCase() !== UserRole.ADMIN){
        throw new Unauthorized();
      }

      const allShow = await bandBaseDataBase.getAllShows()
      const checkShow = allShow.find(show => show.week_day === input.weekDay)

        
        if(checkShow?.start_time === input.startTime && checkShow?.end_time <= input.endTime ){
          throw new ExistingShow()
        }

      const id: string = idGenerator.generateId()

      const showDay: showDay = {
        id,
        week_day: weekDay,
        start_time: startTime,
        end_time: endTime,
        band_id: bandId
      }

      await bandBaseDataBase.addShowDay(showDay)

    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }




}

