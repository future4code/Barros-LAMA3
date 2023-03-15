import { CustomError } from "./CustomError";

export class NameNotFound extends CustomError{
  constructor(){
      super(406, "Name is required.")
  }
}

export class EmailNotFound extends CustomError{
  constructor(){
      super(406, "E-mail is required.")
  }
}

export class PassWordNotFound extends CustomError{
  constructor(){
      super(406, "Password is required.")
  }
}

export class RoleNotFound extends CustomError{
  constructor(){
      super(406, "Role is required. ADMIN OR NORMAL.")
  }
}

export class InvalidPassWord extends CustomError{
  constructor(){
      super(406, "Password too short, it needs to be at least 6 characters long.")
  }
}

export class InvalidEmail extends CustomError{
  constructor(){
      super(400, "Wrong email format.")
  }
}

export class InvalidRole extends CustomError{
  constructor(){
      super(406, "Role is required. ADMIN OR NORMAL.")
  }
}

export class RepeatedEmail extends CustomError{
  constructor(){
      super(400, "This email account already exists")
  }
}

export class UserNotFound extends CustomError{
  constructor(){
      super(404, "User does not exist.")
  }
}

export class InvalidPassword extends CustomError{
  constructor(){
      super(400, "Invalid password.")
  }
}