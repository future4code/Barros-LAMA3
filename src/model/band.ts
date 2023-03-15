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