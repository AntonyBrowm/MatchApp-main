import { Types } from 'mongoose';

export interface VerificationCode {
  _id: Types.ObjectId;
  code: string;
  requested_date: Date;
}
