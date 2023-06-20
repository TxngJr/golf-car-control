import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { getCar, putCar } from '../apis/api';
import { ICar } from '../interfaces/ICar';

type Props = {}

const HomeScreen = (props: Props) => {
    const [carData, setCarData] = useState<ICar | null>(null);
    const [isUpdateCarData, setIsUpdateCarData] = useState<boolean>(true);

    useEffect(() => {
        fetchCarData();
        setIsUpdateCarData(false);
    }, [isUpdateCarData]);

    const fetchCarData = async () => {
        try {
            const car = await getCar();
            setCarData(car);
        } catch (error) {
            console.error('Error fetching car data:', error);
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
            style={styles.container}
        >
            <View style={{ paddingLeft: 10, paddingTop: 50 }}>
                <Image
                    source={require('./../assets/imgs/logo.png')}
                    style={styles.image}
                />
            </View>
            <View style={{ width: 350, height: 600, backgroundColor: "#FFFFFF", alignSelf: 'center', borderRadius: 30 }}>
                <Text style={{ alignSelf: 'center', fontFamily: "THSarabunBold", fontSize: 36, color: "#000000" }}>Status</Text>

                <View style={{ paddingHorizontal: 60 }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 30, paddingBottom: 10 }}>
                        <Text style={{ fontFamily: "THSarabunBold", fontSize: 24, color: "#000000" }}>ไฟ หน้า</Text>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
                            onPress={() => handleStatusClick('frontLight')}
                        >
                            <Text>{carData?.frontLight ? 'ON' : 'OFF'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text style={{ fontFamily: "THSarabunBold", fontSize: 24, color: "#000000" }}>ไฟ ท้าย</Text>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
                            onPress={() => handleStatusClick('backLight')}
                        >
                            <Text>{carData?.backLight ? 'ON' : 'OFF'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text style={{ fontFamily: "THSarabunBold", fontSize: 24, color: "#000000" }}>ไฟ ซ้าย</Text>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
                            onPress={() => handleStatusClick('leftLight')}
                        >
                            <Text>{carData?.leftLight ? 'ON' : 'OFF'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text style={{ fontFamily: "THSarabunBold", fontSize: 24, color: "#000000" }}> ไฟ ขวา</Text>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
                            onPress={() => handleStatusClick('rightLight')}
                        >
                            <Text>{carData?.rightLight ? 'ON' : 'OFF'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text style={{ fontFamily: "THSarabunBold", fontSize: 24, color: "#000000" }}>แบตเตอรี่</Text>
                        <Text>{carData?.battery} %</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text style={{ fontFamily: "THSarabunBold", fontSize: 24, color: "#000000" }}>สตาร์ทรถ</Text>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
                            onPress={() => handleStatusClick('isStart')}
                        >
                            <Text>{carData?.isStart ? 'ON' : 'OFF'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: 152,
        height: 101,
    },
});