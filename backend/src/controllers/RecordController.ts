import { Request, Response } from "express";
import RecordModel from "../models/RecordModel";
import { IRecord } from "../interfaces/IRecord";
import formatDateThai from "../utils/formatDateThai";

export async function recordStartEndTime(req: Request, res: Response) {
    try {
        const { arduinoId } = req.params;
        const { id } = req.body;
        if (!arduinoId) {
            throw new Error("Arduino ID is required");
        }
        if (!id) {
            const currentDate = new Date();
            const record: IRecord = new RecordModel({
                arduinoId,
                startTime: formatDateThai(currentDate),
            });
            const savedRecord = await record.save();
            return res.status(201).json({ id: savedRecord._id });
        }
        const currentDate = new Date();
        const updateRecord: IRecord | null = await RecordModel.findByIdAndUpdate(id, { endTime: formatDateThai(currentDate) });
        if (updateRecord) {
            return res.status(201).json({ id: updateRecord._id });
        };
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export async function getRecords(req: Request, res: Response) {
    try {
        const records = await RecordModel.find();
        return res.status(200).json(records);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get records' });
    }
}