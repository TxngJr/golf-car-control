import { Document } from 'mongoose';

export interface IArduino extends Document {
    name: string;
    isBack?: boolean;
    isFont?: boolean;
    isRight?: boolean;
    isLeft?: boolean;
    isStart?: boolean;
}
