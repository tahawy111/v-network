import { IUser } from "../models/User";

export interface IToken extends IUser {
  id?: string;
  newUser?: IUser;
  iat: number;
  exp: number;
}