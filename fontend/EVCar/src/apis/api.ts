import axios from 'axios';
import { ICar } from '../interfaces/ICar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://swapsjobs.3bbddns.com:36889/";
const CAR_ID = "648fe088444fd58e8d3cac8b";

export const getCar = async () => {
    try {
        const response = await axios.get(`${API_URL}car/getcar/${CAR_ID}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getBatteryAndMapCar = async () => {
    try {
        const response = await axios.get(`${API_URL}car/getbatteryandmapcar/${CAR_ID}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const putCar = async (updatedData: ICar) => {
    try {
        const response = await axios.put(`${API_URL}car/update/${CAR_ID}`, updatedData);
        return response.data;
    } catch (error) {
        return error;
    }
};


export const createRecord = async () => {
    try {
        const recordId = await AsyncStorage.getItem("recordId");
        if (recordId === null) {
            const response = await axios.get(`${API_URL}record/create?carId=${CAR_ID}`);
            await AsyncStorage.setItem("recordId", response.data.id);
            return response.data;
        }
        const response = await axios.get(`${API_URL}record/create?carId=${CAR_ID}&id=${recordId}`);
        await AsyncStorage.removeItem("recordId");
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getRecords = async () => {
    try {
        const response = await axios.get(`${API_URL}record/getrecords/${CAR_ID}`);
        return response.data;
    } catch (error) {
        return error;
    }
};
