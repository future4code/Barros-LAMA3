import { BandIdNotFound, BreackTime, DayNotFound, EndTimeNotFound, EqualTime, EventIdNotFound, ExistingBand, ExistingShow, IncorrectDay, InvalidEvent, InvalidNumber, InvalidTime, LinkPhotoNotFound, MissingData, MusicNotFound, NonexistentBand, QtyBigger, QtyNotFound, QtyStockNotFound, ResponsibleNotFound, ReverseTime, StartTimeNotFound, TokenNotFound, Unauthorized, ValueNotFound, WeekDayNotFound } from "../error/bandErros";
import { NameNotFound } from "../error/userErros";
import { band, BandInputDTO, FindBandDTO, InputGalleryDTO, InputphotoDTO, InputpurchaseDTO, InputSearchShowDayDTO, InputShowDayDTO, OutputGalleryDTO, OutputShowDayDTO, Photo, Sale, showDay, Ticket,TicketInputDTO} from "../model/band";
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

      const getAllBands = await bandBaseDataBase.getAllBands()
      const checkName = getAllBands.find(band => band.name === input.name)
         

      if(checkName) {
        throw new ExistingBand()
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

  findBand = async (input: FindBandDTO): Promise<band[]> => {
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
      throw new CustomError(400, error.message);
    }
  }

  addShowDay = async(input: InputShowDayDTO)=>{
    try {
      const {weekDay, startTime, endTime, bandId, token} = input   
      if(!weekDay){
        throw new WeekDayNotFound()
      }

      if(weekDay.toUpperCase() !== "SEXTA" && weekDay.toUpperCase() !== "SÁBADO" && weekDay.toUpperCase() !== "DOMINGO" ){
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

      if(!Number.isInteger(startTime) || !Number.isInteger(endTime)){
        throw new BreackTime()
      }

      if(Number(startTime) > Number (endTime) ){
        throw new ReverseTime()
      }

      if(Number(startTime) < 0 || Number(endTime) < 0){
        throw new InvalidNumber()
      }

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


      if(checkShow?.start_time === input.startTime || checkShow?.end_time === input.endTime ){
          throw new ExistingShow()
      }


       const allBands = await bandBaseDataBase.getAllBands()
       const checkBand = allBands.find(bands => bands.id === input.bandId) 

       if(!checkBand){
        throw new NonexistentBand()
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

  getShowByDay = async(input: InputSearchShowDayDTO) =>{
    try { 
      const {day,token} = input
      
      if(!day){
        throw new DayNotFound()
      }

      if(!token){
        throw new TokenNotFound()
    }
      
      const data = tokenGenerator.getToken(token)

      if(!data.id){
        throw new Unauthorized()
      }

      const result = await bandBaseDataBase.getShowByDay(input.day)
      
      const resultOutput: OutputShowDayDTO[] = result.map((p) => {
        return {
          name: p.name,
          musicGenre: p.music_genre,
          weekDay: p.week_day,
          startTime: p.start_time,
          endTime: p.end_time
        }
    })

    return resultOutput
      
    } catch (error:any) {
      throw new CustomError(400, error.message);
    }
  }

  createTicket = async(input: TicketInputDTO ) =>{
    try {
      const {name, value,eventId,qtyStock,token} = input 
      
      if(!name){
        throw new NameNotFound();
      }

      if(!value){
        throw new ValueNotFound();
      }

      if(!eventId){
        throw new EventIdNotFound();
      }

      if(!qtyStock){
        throw new QtyStockNotFound();
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

      const allEvents = await bandBaseDataBase.getAllShows()
      const checkEvent = allEvents.find(event => event.id === eventId)

      if(!checkEvent){
        throw new InvalidEvent()
        
      } 

      const id: string = idGenerator.generateId()

      const ticket: Ticket = {
        id,
        name,
        value,
        event_id: eventId,
        qty_stock: qtyStock
      }

      await bandBaseDataBase.createTicket(ticket)

      
      
    } catch (error:any) {
      throw new CustomError(400, error.message);
    }
  }


  ticketSale = async(input:InputpurchaseDTO) =>{
    try {
      const {id,qty,token} = input 

      if(!id){
        throw new EventIdNotFound();
      }

      if(!qty){
        throw new QtyNotFound();
      }

      if(qty < 0){
        throw new InvalidNumber()
      }

      if(!Number.isInteger(qty)){
        throw new BreackTime()
      }
      
      if(!token){
        throw new TokenNotFound();
      }
      
      const data = tokenGenerator.getToken(token)

      if (!data.id) {
        throw new Unauthorized();
      }
      
      const stock = await bandBaseDataBase.getStock(id)


      const updateStock = stock.qty_stock - qty 
      const updateSold = stock.sold + qty 

      if(qty> stock.qty_stock){
        throw new QtyBigger()
      }

      const sale:Sale = {
        id,
        updateStock,
        updateSold
      }
      
      
      await bandBaseDataBase.updateTicket(sale) 

    } catch (error:any) {
      throw new CustomError(400, error.message);
    }
  }


  addPhoto = async(input: InputphotoDTO ) =>{
    try {
      const {linkPhoto,eventId,token} = input
      
      if(!eventId){
        throw new EventIdNotFound();
      }

      if(!linkPhoto){
        throw new LinkPhotoNotFound();
      }

      if(!token){
        throw new TokenNotFound();
      }

      const data = tokenGenerator.getToken(token)

      if (!data.id) {
        throw new Unauthorized();
      }
      
      const allEvents = await bandBaseDataBase.getAllShows()
      const checkEvent = allEvents.find(event => event.id === eventId)

      if(!checkEvent){
        throw new InvalidEvent()
        
      } 

      const id: string = idGenerator.generateId()

      const photo: Photo = {
        id,
        link_photo: linkPhoto,
        event_id: eventId        
      }

      await bandBaseDataBase.addPhoto(photo)
      
      
    } catch (error:any) {
      throw new CustomError(400, error.message);
    }
  }

  getGalleryById = async(input: InputGalleryDTO) =>{
    try {
      const {id,token} = input

      if(!id){
        throw new EventIdNotFound();
      }
            
      if(!token){
        throw new TokenNotFound();
      }
      
      const data = tokenGenerator.getToken(token)

      if (!data.id) {
        throw new Unauthorized();
      }    
            
      const result = await bandBaseDataBase.getGalleryById(id)
      const resultOutput: OutputGalleryDTO[] = result.map((p) => {
        return {
          linkPhoto: p.link_photo
        }
    })

    return resultOutput           
      
    } catch (error:any) {
      throw new CustomError(400, error.message);
    }
  }

}



