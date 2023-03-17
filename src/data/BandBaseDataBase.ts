import { band, purchase, showDay, ticket } from "../model/band";
import { BaseDataBase } from "./BaseDatabase";
import { CustomError } from "../error/CustomError";

export class BandBaseDataBase extends BaseDataBase{
    private bandTable = 'TABELA_BANDAS'
    private showTable = 'TABELA_SHOWS'
    private ticketTabe = 'TABELA_INGRESSOS'
    
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

    getAllBands = async():Promise<band[]>=>{
        try {
            const result = await BandBaseDataBase.connection(this.bandTable)
            return result            
        } catch (error: any) {
        throw new CustomError(400, error.message);
        }
    }

    getShowByDay = async(day:string) => {
        try {
            const result = await BandBaseDataBase.connection(this.showTable)
            .select('TABELA_BANDAS.name','TABELA_BANDAS.music_genre','TABELA_SHOWS.week_day','TABELA_SHOWS.start_time','TABELA_SHOWS.end_time',)
            .from(this.showTable)
            .join('TABELA_BANDAS','TABELA_SHOWS.band_id',"=",'TABELA_BANDAS.id')
            .where('TABELA_SHOWS.week_day', "=", day)
            .orderBy('TABELA_SHOWS.start_time', "asc")
            console.log(day);
            
            return result
        } catch (error:any) {
            throw new CustomError(400, error.message);  
        }
    }

    createTicket = async(ticket:ticket) => {
        try {
            await BandBaseDataBase.connection(this.ticketTabe)
            .insert(ticket)
        } catch (error:any) {
            throw new CustomError(400, error.message);  
        }
    }

    getTicketById = async(id:string) => {
        try {
            const result = await BandBaseDataBase.connection(this.ticketTabe)
            .select('name','qty_stock')
            .where('event_id', '=',id)
            return result            
        } catch (error: any) {
        throw new CustomError(400, error.message);
        }
    }

    getStock = async(id:string) => {
        try{
        const result = await BandBaseDataBase.connection(this.ticketTabe)
            .select('qty_stock')
            .where('event_id', '=',id)
            return result[0]            
        } catch (error: any) {
        throw new CustomError(400, error.message);
        }
    }

    updateTicket = async(id:string, updateStock:number) => {
        try {
            await BandBaseDataBase.connection(this.ticketTabe)
            .where('event_id', '=', id)
            .update({qty_stock: updateStock})
        } catch (error: any) {
        throw new CustomError(400, error.message);
        }
    }



}