import { band, showDay } from "../model/band";
import { BaseDataBase } from "./BaseDatabase";
import { CustomError } from "../error/CustomError";

export class BandBaseDataBase extends BaseDataBase{
    private bandTable = 'TABELA_BANDAS'
    private showTable = 'TABELA_SHOWS'
    
    registerBand = async(band:band):Promise<void> =>{
        try {
            await BandBaseDataBase.connection(this.bandTable)
            .insert(band)
        } catch (error:any) {
            throw new CustomError(400, error.message); 
        }
    }

    findBand = async (search:string): Promise<band[]> => {
        try {
            const result = await BandBaseDataBase.connection(this.bandTable)
            .select()
            .where(function(){
                this.where("id", "=", search)
                .orWhere("name", "like", `%${search}%`)
            })

            return result
        } catch (error:any) {
        throw new CustomError(400, error.message);  
        }
    }

    addShowDay = async(showDay: showDay):Promise<void>=>{
        try {
            await BandBaseDataBase.connection(this.showTable)
            .insert(showDay)
        } catch (error:any) {
            throw new CustomError(400, error.message);
        }
    }

    getAllShows = async():Promise<showDay[]>=>{
        try {
            const result = await BandBaseDataBase.connection(this.showTable)
            return result
            
        } catch (error: any) {
        throw new CustomError(400, error.message);
        }
    }

}