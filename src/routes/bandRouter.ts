import express from "express";
import { BandController } from "../controller/BandController";


export const bandRouter=express.Router()

const bandController = new BandController()

bandRouter.post('/registerband', bandController.registerBand)
bandRouter.get('/:search', bandController.findBand)
bandRouter.post('/addshowday', bandController.addShowDay)
bandRouter.get('/showsday/:day', bandController.getShowByDay)
bandRouter.post('/createticket', bandController.createTicket)
bandRouter.post('/ticketsale/:id', bandController.ticketSale)
bandRouter.post('/gallery', bandController.addPhoto)
bandRouter.get('/gallery/:id', bandController.getGalleryById)