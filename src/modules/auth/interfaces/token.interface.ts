export interface IToken {
  subject: string;
  payload: ITokenPayload;
  iat: Date;
  exp: Date;
}

export interface ITokenPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
