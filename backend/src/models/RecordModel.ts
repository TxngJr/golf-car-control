import mongoose, { Schema } from 'mongoose';
import { IRecord } from '../interfaces/IRecord';

const RecordSchema: Schema = new Schema({
    arduinoId: { type: Schema.Types.ObjectId, ref: 'Arduino', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
});

const RecordModel = mongoose.model<IRecord>('Record', RecordSchema);

export default RecordModel;