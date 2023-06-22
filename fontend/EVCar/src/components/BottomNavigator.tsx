import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import VoiceSvg from '../assets/svgs/voiceSvg';
import CarSvg from '../assets/svgs/CarSvg';
import ClockSvg from '../assets/svgs/clockSvg';
import HomeScreen from '../screens/HomeScreen';
import RecordingScreen from '../screens/RecordingScreen';
import Voice from '@react-native-voice/voice';

type Props = {}

const BottomNavigator = (props: Props) => {
    const [isListening, setIsListening] = useState<boolean>(false);
    const [recognizedText, setRecognizedText] = useState<string | null>('');

    useEffect(() => {
        // Set up voice recognition
        Voice.onSpeechResults = (event: any) => {
            checkWord(event.value[0]);
        };

        return () => {
            // Clean up voice recognition
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const startListening = async () => {
        try {
            await Voice.start('th-TH');
            setIsListening(true);
        } catch (e) {
            console.error(e);
        }
    };

    const stopListening = async () => {
        try {
            await Voice.stop();
            setIsListening(false);
        } catch (e) {
            console.error(e);
        }
    };

    const checkWord = async (text: any) => {
        const words = text.split(' ');
        if (words.includes('เปิดไฟหน้า')) {
            // onRecognizedText('frontLight');
        } else if (words.includes('เปิดไฟท้าย')) {
            // onRecognizedText('backLight');
        } else if (words.includes('เปิดไฟซ้าย')) {
            // onRecognizedText('leftLight');
        } else if (words.includes('เปิดไฟขวา')) {
            // onRecognizedText('rightLight');
        } else if (words.includes('สตาร์ทรถ')) {
            // onRecognizedText('isStart');
        }
    };
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
                    <CarSvg activeTabButtonText={activeTab === 'home' ? 'active' : 'notActive'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={isListening ? stopListening : startListening} >
                    <VoiceSvg activeTabButtonText={isListening} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateToScreen('recordig')} >
                    <ClockSvg activeTabButtonText={activeTab === 'recordig' ? 'active' : 'notActive'} />
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