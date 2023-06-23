import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Svg, { Circle } from 'react-native-svg';

type Props = {
    percentage: number;
};

const BatteryGauge = ({ percentage }: Props) => {
    const gaugeWidth = Math.max(percentage, 1); // Ensure the gauge is at least 1% wide

    return (
        <View style={{ width: 100, height: 35,flex:1 }}>
            <View style={{ width: 100, height: 35, borderColor: '#000000', borderWidth: 2, borderRadius: 30,overflow: 'hidden', }}>
                <View
                    style={[{ width: `${gaugeWidth}%`, borderRadius: 15, height: 30, backgroundColor: '#90EE90', },
                        percentage <= 50 && { backgroundColor: '#FFFF00' },
                        percentage <= 30 && { backgroundColor: '#FFA500' },
                        percentage <= 10 && { backgroundColor: '#FF0000' },
                    ]}>
                </View>
                    <Text style={{ fontFamily: 'THSarabunBold', fontSize: 24, color: '#000000', position:'absolute',left:30 }}>{percentage} %</Text>
            </View>
        </View>
    );
};

export default BatteryGauge;
