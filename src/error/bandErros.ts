import { CustomError } from "./CustomError";


export class MusicNotFound extends CustomError{
  constructor(){
      super(404, "Music Genre is required.")
  }
}

export class ResponsibleNotFound extends CustomError{
  constructor(){
      super(404, "Responsible is required.")
  }
}

export class TokenNotFound extends CustomError{
  constructor(){
      super(406, "Token is required.")
  }
}

export class MissingData extends CustomError{
  constructor(){
      super(406, "Id or Band name is required.")
  }
}


export class Unauthorized extends CustomError{
  constructor(){
      super(404, "User not Authorized")
  }
}