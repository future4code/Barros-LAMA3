import express from "express";
import { BandController } from "../controller/BandController";


export const bandRouter=express.Router()

const bandController = new BandController()

bandRouter.post('/registerband', bandController.registerBand)
bandRouter.get('/:search', bandController.findBand)
