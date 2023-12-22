import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;
@Schema({ autoIndex: true, timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  firstName: string;
  @Prop({ type: String, required: true })
  lastName: string;
  @Prop({ type: String, required: true })
  phoneNumber: string;
  @Prop({ type: Boolean, default: false })
  isVerified: boolean;
  @Prop({ type: String, default: null })
  otp: string;
  @Prop({ type: Date, default: null })
  otpExpiresAt: Date;
  @Prop({ type: Boolean, default: false })
  removed: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);
