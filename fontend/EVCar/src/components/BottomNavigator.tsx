import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import VoiceSvg from '../assets/svgs/voiceSvg';
import CarSvg from '../assets/svgs/CarSvg';
import ClockSvg from '../assets/svgs/clockSvg';
import HomeScreen from '../screens/HomeScreen';
import RecordingScreen from '../screens/RecordingScreen';

type Props = {}

const BottomNavigator = (props: Props) => {
    const [activeTab, setActiveTab] = useState('home');

    const navigateToScreen = (screen: any) => {
        setActiveTab(screen);
    };

    return (
        <View style={styles.container}>
            <View style={styles.screenContainer}>
                {activeTab === 'home' && <HomeScreen />}
                {activeTab === 'recordig' && <RecordingScreen />}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                <View style={{ backgroundColor: "#000000", height: 2, width: 160 }} />
                <View style={{ backgroundColor: "#000000", height: 2, width: 160 }} />
            </View>
            <View style={styles.bottomTabContainer}>
                <TouchableOpacity onPress={() => navigateToScreen('home')} >
                    <CarSvg activeTabButtonText={activeTab === 'home' ? 'active' : 'notActive'}/>
                </TouchableOpacity>
                <TouchableOpacity  >
                    <VoiceSvg />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateToScreen('recordig')} >
                    <ClockSvg activeTabButtonText={activeTab === 'recordig' ? 'active' : 'notActive'}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BottomNavigator

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    screenContainer: {
        flex: 1,
    },
    bottomTabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
});