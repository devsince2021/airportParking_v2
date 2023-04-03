import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PhoneVerificationDocument = HydratedDocument<PhoneVerification>;

@Schema({ timestamps: true })
export class PhoneVerification {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  code: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PhoneVerificationSchema =
  SchemaFactory.createForClass(PhoneVerification);
