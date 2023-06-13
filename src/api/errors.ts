import { CustomError } from "models";

export class AuthError extends CustomError {
  constructor(message: string) {
    super(message)
  }
}

export class AuthCreateRequestTokenError extends CustomError {
  constructor() {
    super("Request token creating error")
  }
}

export class AuthApproveRequestTokenError extends CustomError {
  constructor() {
    super("Request token approving error")
  }
}

export class AuthCreateSessionError extends CustomError {
  constructor() {
    super("Session creating error")
  }
}

export class AuthValidateUserCredentialsError extends CustomError {
  constructor() {
    super("User credentials validation error")
  }
}