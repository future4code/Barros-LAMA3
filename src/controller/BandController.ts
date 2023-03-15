import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { UserBusiness } from "../business/UserBusiness";
import { BandInputDTO, FindBandDTO, InputShowDayDTO } from "../model/band";

const bandBusiness = new BandBusiness()

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

            res.status(201).send({message: "Registered band!"})

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

            const result = await bandBusiness.findBand(input)

            res.status(201).send(result)

        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    addShowDay = async(req: Request, res: Response)=>{
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

}