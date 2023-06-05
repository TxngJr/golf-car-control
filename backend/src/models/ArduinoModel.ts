import mongoose, { Schema } from 'mongoose';
import { IArduino } from '../interfaces/IArduino';

const ArduinoSchema: Schema = new Schema({
    isBack: { type: Boolean, default: false },
    isFont: { type: Boolean, default: false },
    isRight: { type: Boolean, default: false },
    isLeft: { type: Boolean, default: false },
    isStart: { type: Boolean, default: false },
});

const ArduinoModel = mongoose.model<IArduino>('Arduino', ArduinoSchema);

export default ArduinoModel;
