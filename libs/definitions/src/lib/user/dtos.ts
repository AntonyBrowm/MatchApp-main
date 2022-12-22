import { Types } from 'mongoose';
import { CreateAboutDTO } from '../about';
import { Gender, Lookingfor } from './types';

export class LoginDTO {
  email: string;
  password: string;
}

export interface CreateUserDTO {
  name: string;
  last_name?: string;
  confirmPassword: string;
  password: string;
  email: string;
  city?: string;
  country?: string;
  phone: string;
  birthday: Date;
  gender: Gender;
  about: CreateAboutDTO;
  lookingfor: Lookingfor;
}

export interface GetUserDTO {
  _id?: Types.ObjectId;
  name?: string;
  last_name?: string;
  email?: string;
}

export interface GetUsersDTO {
  limit?: number;
  offset?: number;
}
