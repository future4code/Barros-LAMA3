import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandBaseDataBase } from "../data/BandBaseDataBase";
import { BandInputDTO, FindBandDTO, InputGalleryDTO, InputphotoDTO, InputpurchaseDTO, InputSearchShowDayDTO, InputShowDayDTO, TicketInputDTO } from "../model/band";

const bandBusiness = new BandBusiness()
const bandBaseDataBase = new BandBaseDataBase()

export class BandController {
    registerBand = async(req: Request, res: Response):Promise<void> => {
        try {
            const input: BandInputDTO = {
                name:req.body.name,
                musicGenre: req.body.musicGenre,
                responsible: req.body.responsible,
                token: req.headers.authorization as string 
            }

            await bandBusiness.registerBand(input)

            res.status(201).send({message: "Successfully registered band.!"})

        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    findBand = async(req: Request, res: Response):Promise<void> => {
        try {
            const input: FindBandDTO = {
                search:req.params.search as string,                
                token: req.headers.authorization as string 
            }

            console.log(input);
            
            const result = await bandBusiness.findBand(input)

            res.status(201).send(result)

        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    addShowDay = async(req: Request, res: Response): Promise<void>=>{
        try {
            const input: InputShowDayDTO = {
                weekDay:req.body.weekDay,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                bandId: req.body.bandId,
                token: req.headers.authorization as string 
            }
                        
            await bandBusiness.addShowDay(input)
            res.status(200).send({ message: "Show Added Successfully" })

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    getShowByDay = async(req: Request, res: Response): Promise<void>=>{
        try {
                const input:InputSearchShowDayDTO = {
                    day: req.params.day,
                    token: req.headers.authorization as string 
                } 
            
                        

            const result = await bandBusiness.getShowByDay(input)
            res.status(201).send(result)

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    createTicket = async(req: Request, res: Response):Promise<void> => {
        try {
            const input: TicketInputDTO = {
                name:req.body.name,
                value:req.body.value,
                eventId:req.body.eventId,
                qtyStock:req.body.qtyStock,
                token: req.headers.authorization as string 
            }

            await bandBusiness.createTicket(input)

            res.status(201).send({message: "Ticket created!"})

        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    ticketSale = async(req: Request, res: Response):Promise<void> => {
        try {
            const input: InputpurchaseDTO = {
                id:req.params.id as string,
                qty:req.body.qty,
                token: req.headers.authorization as string 
            }
                       

            await bandBusiness.ticketSale(input)

            const getAllTicket = await bandBaseDataBase.getAllTicket()                    
            const findName= getAllTicket.find(ticket => ticket.event_id === input.id) 
            res.status(201).send({message: `Congratulations, you bought ${input.qty} tickets to ${findName?.name}`})

        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    addPhoto = async(req: Request, res: Response):Promise<void> => {
        try {
            const input: InputphotoDTO= {
                linkPhoto:req.body.linkPhoto,
                eventId:req.body.eventId,                
                token: req.headers.authorization as string 
            }

            await bandBusiness.addPhoto(input)

            res.status(201).send({message: "Photo added to gallery."})

        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    getGalleryById = async(req: Request, res: Response): Promise<void>=>{
        try {
            const input: InputGalleryDTO= {
                id: req.params.id as string,                
                token: req.headers.authorization as string 
            }
            const result = await bandBusiness.getGalleryById(input)
            res.status(201).send(result)
        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


}