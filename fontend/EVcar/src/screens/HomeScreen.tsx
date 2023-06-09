import { Text, View, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { getCar, putCar } from '../apis/api';
import { ICar } from '../interfaces/ICar';
import MapView, { Marker } from 'react-native-maps';
import { IBatteryAdMapCar } from '../interfaces/IBatteryAdMapCar';
import BatteryGauge from '../components/BatteryGauge';
import ToggleSwitch from '../components/ToggleSwitch';

type Props = {
    isUpdateCarDataProps: boolean;
    setIsUpdateCarDataProps: (value: boolean) => void;
    batteryAndMapCarData: IBatteryAdMapCar| null;
    isLoadingMap: boolean;

}

const HomeScreen = ({ isUpdateCarDataProps, setIsUpdateCarDataProps, batteryAndMapCarData, isLoadingMap }: Props) => {
    const [carData, setCarData] = useState<ICar | null>(null);
    const [isUpdateCarData, setIsUpdateCarData] = useState<boolean>(true);

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const car = await getCar();
                setCarData(car);
            } catch (error) {
                console.error('Error fetching car data:', error);
            }
        };

        fetchCarData();
        setIsUpdateCarData(false);
        setIsUpdateCarDataProps(false);
    }, [isUpdateCarData, isUpdateCarDataProps]);

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
                <Text style={{ alignSelf: 'center', fontFamily: "THSarabunBold", fontSize: 36, color: "#000000", paddingTop: 20 }}>หน้าควบคุมรถ</Text>
                <ScrollView>

                    <View style={{ paddingHorizontal: 60 }}>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 30, paddingBottom: 10 }}>
                            <Text style={{ fontFamily: "THSarabunBold", fontSize: 24, color: "#000000" }}>ไฟ หน้า</Text>
                            <ToggleSwitch
                                isEnabled={carData?.frontLight ? true : false}
                                onToggle={() => handleStatusClick('frontLight')}
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: 10 }}>
                            <Text style={{ fontFamily: "THSarabunBold", fontSize: 24, color: "#000000" }}>ไฟ ท้าย</Text>
                            <ToggleSwitch
                                isEnabled={carData?.backLight ? true : false}
                                onToggle={() => handleStatusClick('backLight')}
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: 10 }}>
                            <Text style={{ fontFamily: "THSarabunBold", fontSize: 24, color: "#000000" }}>ไฟ ซ้าย</Text>
                            <ToggleSwitch
                                isEnabled={carData?.leftLight ? true : false}
                                onToggle={() => handleStatusClick('leftLight')}
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: 10 }}>
                            <Text style={{ fontFamily: "THSarabunBold", fontSize: 24, color: "#000000" }}> ไฟ ขวา</Text>
                            <ToggleSwitch
                                isEnabled={carData?.rightLight ? true : false}
                                onToggle={() => handleStatusClick('rightLight')}
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: 10 }}>
                            <Text style={{ fontFamily: "THSarabunBold", fontSize: 24, color: "#000000" }}>สตาร์ทรถ</Text>
                            <ToggleSwitch
                                isEnabled={carData?.isStart ? true : false}
                                onToggle={() => handleStatusClick('isStart')}
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: 10 }}>
                            <Text style={{ fontFamily: "THSarabunBold", fontSize: 24, color: "#000000", paddingRight: 90 }}>แบตเตอรี่</Text>
                            {isLoadingMap ? (
                                <Text style={{ fontFamily: "THSarabunBold", fontSize: 24, color: "#000000" }}>Loading...</Text>
                            ) : (
                                <BatteryGauge percentage={batteryAndMapCarData?.battery} />
                            )}
                        </View>
                    </View>
                    {isLoadingMap ? (
                        <Text style={{ fontFamily: "THSarabunBold", fontSize: 24, color: "#000000" }}>Loading...</Text>
                    ) : (
                        <View style={{ width: 300, height: 300, alignSelf: 'center', marginVertical: 20 }}>
                            <MapView
                                style={{ flex: 1 }}
                                initialRegion={{
                                    latitude: batteryAndMapCarData?.latitude,
                                    longitude: batteryAndMapCarData?.longitude,
                                    latitudeDelta: 0.0022,
                                    longitudeDelta: 0.0121,
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: batteryAndMapCarData?.latitude,
                                        longitude: batteryAndMapCarData?.longitude,
                                    }}
                                    title="GolfCar"
                                    description="This is a GolfCar"
                                >
                                    <Image
                                        source={require('./../assets/imgs/logo.png')}
                                        style={{ width: 32, height: 32 }}
                                    />
                                </Marker>
                            </MapView>
                        </View>
                    )}
                </ScrollView>
            </View>
        </LinearGradient>
    )
}

export default HomeScreen