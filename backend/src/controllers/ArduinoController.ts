import { Request, Response } from "express";
import ArduinoModel from "../models/ArduinoModel";
import { IArduino } from "../interfaces/IArduino";

export async function createArduino(req: Request, res: Response) {
    try {
        const arduino: IArduino = new ArduinoModel();
        const savedArduino = await arduino.save();
        return res.status(201).json({ id: savedArduino._id });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create Arduino device' });
    }
}

export async function getArduino(req: Request, res: Response) {
    try {
        const arduinos = await ArduinoModel.find();
        return res.status(200).json(arduinos);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get Arduino devices' });
    }
}

export async function getArduinoById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const arduino = await ArduinoModel.findById(id);
        if (arduino) {
            return res.status(200).json({
                isBack: arduino.isBack,
                isFont: arduino.isFont,
                isRight: arduino.isRight,
                isLeft: arduino.isLeft,
                isStart: arduino.isStart,
            });
        } else {
            return res.status(404).json({ error: 'Arduino device not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get Arduino device' });
    }
}

export async function updateArduinoById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const update: Partial<IArduino> = req.body;

        const updatedArduino = await ArduinoModel.findByIdAndUpdate(
            id,
            update,
            { new: true }
        );

        if (updatedArduino) {
            return res.status(200).json("Update success");
        } else {
            return res.status(404).json({ error: 'Arduino device not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update Arduino device' });
    }
}

export async function deleteArduinoById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const deletedArduino = await ArduinoModel.findByIdAndRemove(id);
        if (deletedArduino) {
            return res.status(200).json("Delete success");
        } else {
            return res.status(404).json({ error: 'Arduino device not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete Arduino device' });
    }
}