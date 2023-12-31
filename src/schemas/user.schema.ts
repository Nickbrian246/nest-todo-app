import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  email: string;

  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  password: string;

  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  userName: string;

  @Prop({
    unique: false,
    required: true,
    trim: true,
  })
  client: string;

  @Prop({ required: false })
  commonId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
