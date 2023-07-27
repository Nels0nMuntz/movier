export class CustomError extends Error {
  constructor(message = "Something went wrong") {
    super(message);
    this.name = this.constructor.name;
  }
}

export class AuthError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class AccountError extends CustomError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class AuthCreateRequestTokenError extends AuthError {
  constructor() {
    super("Request token creating error")
  }
}

export class AuthApproveRequestTokenError extends AuthError {
  constructor() {
    super("Request token approving error")
  }
}

export class AuthCreateSessionError extends AuthError {
  constructor() {
    super("Session creating error")
  }
}

export class AuthValidateUserCredentialsError extends AuthError {
  constructor() {
    super("User credentials validation error")
  }
}

export class GetAccountDetailsError extends AccountError {
  constructor() {
    super("Account details receving error")
  }
}