import { Request, Response } from "express";
import ArduinoModel from "../models/ArduinoModel";
import { IArduino } from "../interfaces/IArduino";

export async function createArduino(req: Request, res: Response) {
    try {
        const { name }: { name?: string } = req.params;
        const existingArduino: IArduino | null = await ArduinoModel.findOne({ name });
        if (existingArduino?.name) {
            return res.status(400).json('This name is already taken');
        }
        const arduino: IArduino = new ArduinoModel({ name: name });
        const savedArduino = await arduino.save();
        return res.status(201).json({ _id: savedArduino._id });
    } catch (error) {
        return res.status(500).json(error);
    }
}

export async function getArduinos(req: Request, res: Response) {
    try {
        const arduinos = await ArduinoModel.find({}, 'id name');
        return res.status(200).json(arduinos);
    } catch (error) {
        return res.status(500).json(error);
    }
}

export async function getArduinoById(req: Request, res: Response) {
    try {
        const { id }: { id?: string } = req.params;
        const arduino = await ArduinoModel.findById(id);
        if (!arduino) {
            return res.status(404).json('Arduino device not found');
        }
        return res.status(200).json({
            isBack: arduino.isBack,
            isFont: arduino.isFont,
            isRight: arduino.isRight,
            isLeft: arduino.isLeft,
            isStart: arduino.isStart,
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}

export async function updateArduinoById(req: Request, res: Response) {
    try {
        const { id }: { id?: string } = req.params;
        const update: Partial<IArduino> = req.body;

        const updatedArduino = await ArduinoModel.findByIdAndUpdate(id, update,);
        if (!updatedArduino) {
            return res.status(404).json('Arduino device not found');
        }
        return res.status(200).json('Update success');
    } catch (error) {
        return res.status(500).json(error);
    }
}

export async function deleteArduinoById(req: Request, res: Response) {
    try {
        const { id }: { id?: string } = req.params;
        const deletedArduino = await ArduinoModel.findByIdAndRemove(id);
        if (!deletedArduino) {
            return res.status(404).json('Arduino device not found');
        }
        return res.status(200).json('Delete success');

    } catch (error) {
        return res.status(500).json(error);
    }
}