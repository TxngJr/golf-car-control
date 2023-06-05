import { Document, Types } from 'mongoose';

export interface IRecord extends Document {
  arduinoId: Types.ObjectId;
  startTime: Date;
  endTime?: Date;
}
