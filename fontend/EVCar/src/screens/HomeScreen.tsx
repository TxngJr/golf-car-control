import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { createRecord, getBatteryAndMapCar, getCar, putCar } from '../apis/api';
import { ICar } from '../interfaces/ICar';
import CheckBoxSvg from '../assets/svgs/CheckBoxSvg';
import MapView, { Marker } from 'react-native-maps';
import { IBatteryAdMapCar } from '../interfaces/IBatteryAdMapCar';
import BatteryGauge from '../components/BatteryGauge';
type Props = {
    isUpdateCarDataProps: boolean;
    setIsUpdateCarDataProps: (value: boolean) => void;
}

const HomeScreen = ({ isUpdateCarDataProps, setIsUpdateCarDataProps }: Props) => {
    const [carData, setCarData] = useState<ICar | null>(null);
    const [batteryAndMapCarData, setBatteryAndMapCarData] = useState<IBatteryAdMapCar | null>(null);
    const [isUpdateCarData, setIsUpdateCarData] = useState<boolean>(true);
    const [isLoadingMap, setIsLoadingMap] = useState<boolean>(true);

    useEffect(() => {
        fetchCarData();
        setIsUpdateCarData(false);
        setIsUpdateCarDataProps(false);
    }, [isUpdateCarData, isUpdateCarDataProps]);

    useEffect(() => {
        const intervalId = setInterval(fetchBatteryAndMapCarData, 5000);
        fetchBatteryAndMapCarData();
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const fetchCarData = async () => {
        try {
            const car = await getCar();
            setCarData(car);
        } catch (error) {
            console.error('Error fetching car data:', error);
        }
    };

    const fetchBatteryAndMapCarData = async () => {
        try {
            const batteryAndMapCar = await getBatteryAndMapCar();
            setBatteryAndMapCarData(batteryAndMapCar);
            setIsLoadingMap(false);
        } catch (error) {
            console.error('Error fetching battery And Map Car data:', error);
        }
    };

    const handleStatusClick = async (field: keyof ICar) => {
        if (carData) {
            const updatedData = { [field]: !carData[field] };
            try {
                await putCar(updatedData);
                setIsUpdateCarData(true);
            } catch (error) {
                console.error(`Error updating ${field} status:`, error);
            }
        }
    };

    return (
        <LinearGradient
            colors={['#C4E4F4', 'rgba(196, 228, 244, 0)']}
            locations={[0.2279, 0.72]}
            style={{ flex: 1 }}
        >
            <View style={{ paddingLeft: 10, paddingTop: 50 }}>
                <Image
                    source={require('./../assets/imgs/logo.png')}
                    style={{ width: 152, height: 101 }}
                />
            </View>
            <View style={{ width: 350, height: 600, backgroundColor: "#FFFFFF", alignSelf: 'center', borderRadius: 30 }}>
                    <Text style={{ alignSelf: 'center', fontFamily: "THSarabunBold", fontSize: 36, color: "#000000",paddingTop:20 }}>หน้าควบคุมรถ</Text>
                <ScrollView>

                    <View style={{ paddingHorizontal: 60 }}>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 30, paddingBottom: 10 }}>
                            <Text style={{ fontFamily: "THSarabunBold", fontSize: 24, color: "#000000" }}>ไฟ หน้า</Text>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', justifyContent: 'space-around' }}
                                onPress={() => handleStatusClick('frontLight')}
                            >
                                <CheckBoxSvg activeTabButtonText={carData?.frontLight ? true : false} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: 10 }}>
                            <Text style={{ fontFamily: "THSarabunBold", fontSize: 24, color: "#000000" }}>ไฟ ท้าย</Text>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', justifyContent: 'space-around' }}
                                onPress={() => handleStatusClick('backLight')}
                            >
                                <CheckBoxSvg activeTabButtonText={carData?.backLight ? true : false} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: 10 }}>
                            <Text style={{ fontFamily: "THSarabunBold", fontSize: 24, color: "#000000" }}>ไฟ ซ้าย</Text>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', justifyContent: 'space-around' }}
                                onPress={() => handleStatusClick('leftLight')}
                            >
                                <CheckBoxSvg activeTabButtonText={carData?.leftLight ? true : false} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: 10 }}>
                            <Text style={{ fontFamily: "THSarabunBold", fontSize: 24, color: "#000000" }}> ไฟ ขวา</Text>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', justifyContent: 'space-around' }}
                                onPress={() => handleStatusClick('rightLight')}
                            >
                                <CheckBoxSvg activeTabButtonText={carData?.rightLight ? true : false} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: 10 }}>
                            <Text style={{ fontFamily: "THSarabunBold", fontSize: 24, color: "#000000" }}>สตาร์ทรถ</Text>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', justifyContent: 'space-around' }}
                                onPress={async () => { handleStatusClick('isStart'); await createRecord(); }}
                            >
                                <CheckBoxSvg activeTabButtonText={carData?.isStart ? true : false} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: 10 }}>
                            <Text style={{ fontFamily: "THSarabunBold", fontSize: 24, color: "#000000", paddingRight: 100 }}>แบตเตอรี่</Text>
                            {isLoadingMap ? (
                                <Text style={{ fontFamily: "THSarabunBold", fontSize: 24, color: "#000000" }}>Loading...</Text>
                            ) : (
                                <BatteryGauge percentage={batteryAndMapCarData?.battery} />
                            )}
                        </View>
                    </View>
                    {isLoadingMap ? (
                        <Text style={{ fontFamily: "THSarabunBold", fontSize: 24, color: "#000000"}}>Loading...</Text>
                    ) : (
                        <View style={{ width: 300, height: 300, alignSelf: 'center',marginVertical:20 }}>
                            <MapView
                                style={{ flex: 1 }}
                                initialRegion={{
                                    latitude: batteryAndMapCarData?.latitude,
                                    longitude: batteryAndMapCarData?.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                <Marker

                                    coordinate={{
                                        latitude: batteryAndMapCarData?.latitude,
                                        longitude: batteryAndMapCarData?.longitude,
                                    }}
                                    title="GolfCar"
                                    description="This is a GolfCar"
                                />
                            </MapView>
                        </View>
                    )}
                </ScrollView>
            </View>
        </LinearGradient>
    )
}

export default HomeScreen