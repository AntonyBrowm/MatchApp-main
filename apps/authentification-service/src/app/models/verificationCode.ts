import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { VerificationCode } from '@enroute/definitions';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

@Schema()
export class VerificationCodeMongo implements VerificationCode {
  @Prop({
    type: SchemaMongoose.Types.ObjectId,
    default: new Types.ObjectId(),
  })
  _id: Types.ObjectId;
  @Prop({ type: String, required: true })
  code: string;
  @Prop({ type: Date, required: true, default: new Date() })
  requested_date: Date;
  @Prop({
    type: SchemaMongoose.Types.ObjectId,
    required: true,
  })
  user: Types.ObjectId;
}

export type VerificationCodeDocument = VerificationCodeMongo & Document;

export const VerificationCodeSchema = SchemaFactory.createForClass(
  VerificationCodeMongo
);
