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

export class WeekDayNotFound extends CustomError{
  constructor(){
      super(404, "Week Day Not Found!")
  }
}

export class StartTimeNotFound extends CustomError{
  constructor(){
      super(404, "Start Time Not Found!")
  }
}

export class EndTimeNotFound extends CustomError{
  constructor(){
      super(404, "Start Time Not Found!")
  }
}

export class BandIdNotFound extends CustomError{
  constructor(){
      super(404, "Start Time Not Found!")
  }
}

export class IncorrectDay extends CustomError{
  constructor(){
      super(404, "Incorrect Day, choose day sexta, sabado or domingo")
  }
}

export class InvalidTime extends CustomError{
  constructor(){
      super(404, "Invalid time - Time only beteween 8 AM and to 23 PM")
  }
}

export class EqualTime extends CustomError{
  constructor(){
      super(404, "Show start and end times cannot be the same")
  }
}

export class BreackTime extends CustomError{
  constructor(){
      super(404, "Choose Only full hours")
  }
}


export class ReverseTime extends CustomError{
  constructor(){
      super(404, "End time cannot be greater than start time")
  }
}

export class ExistingShow extends CustomError{
  constructor(){
      super(404, " Already existing show ")
  }
}

