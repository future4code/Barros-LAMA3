export type band = {
  id:string,
  name:string,
  music_genre: string,
  responsible: string 
}

export interface BandInputDTO {
  name:string,
  musicGenre: string,
  responsible: string,
  token: string 
}

export interface FindBandDTO {
    search: string,
    token:string
}

export type showDay = {
  id: string,
  week_day: string,
  start_time: number,
  end_time: number,
  band_id: string
}

export interface InputShowDayDTO {
  weekDay: string,
  startTime: number,
  endTime: number,
  bandId: string,
  token: string
}

export interface OutputShowDayDTO {
  name: string,
  musicGenre: string,
  weekDay: string,
  startTime: number,
  endTime: number  
}

export interface OutputGalleryDTO {
  linkPhoto: string  
}



export interface Ticket {
  id: string,
  name: string,
  value: number,
  event_id: string,
  qty_stock:number
}

export interface TicketInputDTO {
  name: string,
  value: number,
  eventId: string,
  qtyStock:number,
  token: string
}

export interface Purchase {
  eventId: string,
  updateStock:number
}

export interface Sale {
  id:string,
  updateStock:number,
  updateSold:number
}


export interface InputpurchaseDTO {
  id: string,
  qty:number,
  token:string
}

  
  export interface Photo {
    id: string,
    link_photo: string,
    event_id:string,
  }
  
  export interface InputphotoDTO {
    linkPhoto: string,
    eventId:string,
    token: string
  }

  export interface InputGalleryDTO {
    id:string,
    token: string
  }

  export interface InputSearchShowDayDTO {
    day:string,
    token: string
  }