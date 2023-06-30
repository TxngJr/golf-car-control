import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Svg, { Circle } from 'react-native-svg';

type Props = {
    percentage: number;
};

const BatteryGauge = ({ percentage }: Props) => {


    return (
        <View style={{ width: 100, height: 35, flex: 1 }}>
            {
                percentage > 75 ?
                    <Image
                        source={require('./../assets/imgs/batt/4.png')}
                        style={styles.image}
                    />
                    : percentage > 50 ?
                        <Image
                            source={require('./../assets/imgs/batt/3.png')}
                            style={styles.image}
                        />
                        : percentage > 25 ?
                            <Image
                                source={require('./../assets/imgs/batt/2.png')}
                                style={styles.image}
                            />
                            : percentage > 0 ?
                                <Image
                                    source={require('./../assets/imgs/batt/1.png')}
                                    style={styles.image}
                                />
                                :
                                <Image
                                    source={require('./../assets/imgs/batt/0.png')}
                                    style={styles.image}
                                />
            }
        </View>
    );
};

export default BatteryGauge;

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 30,
    },
});