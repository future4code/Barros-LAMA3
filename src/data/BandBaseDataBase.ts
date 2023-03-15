import { band } from "../model/band";
import { BaseDataBase } from "./BaseDatabase";
import { CustomError } from "../error/CustomError";

export class BandBaseDataBase extends BaseDataBase{
    private bandTable = 'TABELA_BANDAS'

    registerBand = async(band:band):Promise<void> =>{
        try {
            await BandBaseDataBase.connection(this.bandTable)
            .insert(band)
        } catch (error:any) {
            throw new CustomError(400, error.message); 
        }
    }

    findBand = async (search:string) => {
        try {
            const result = await BandBaseDataBase.connection(this.bandTable)
            .select()
            .where(function(){
                this.where("id", "=", search)
                .orWhere("name", "like", `%${search}%`)
            })

            return result
        } catch (error:any) {
            
        }
    }



}