import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PhoneVerificationDocument = HydratedDocument<PhoneVerification>;

@Schema({ timestamps: true })
export class PhoneVerification {
  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  code: string;
}

export const PhoneVerificationSchema =
  SchemaFactory.createForClass(PhoneVerification);
