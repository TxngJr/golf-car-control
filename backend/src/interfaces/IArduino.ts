import { Document } from 'mongoose';

export interface IArduino extends Document {
    isBack?: boolean;
    isFont?: boolean;
    isRight?: boolean;
    isLeft?: boolean;
    isStart?: boolean;
}
