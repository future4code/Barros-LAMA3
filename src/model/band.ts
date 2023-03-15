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





