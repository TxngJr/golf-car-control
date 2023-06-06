import mongoose, { Schema } from 'mongoose';
import { IRecord } from '../interfaces/IRecord';

const RecordSchema: Schema = new Schema({
    arduinoId: { type: Schema.Types.ObjectId, ref: 'Arduino', required: true },
    startTime: { type: String, required: true },
    endTime: { type: String },
});

const RecordModel = mongoose.model<IRecord>('Record', RecordSchema);

export default RecordModel;