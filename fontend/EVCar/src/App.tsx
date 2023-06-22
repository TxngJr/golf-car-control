/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import VoiceSvg from './assets/svgs/VoiceSvg';
import CarSvg from './assets/svgs/CarSvg';
import ClockSvg from './assets/svgs/ClockSvg';
import HomeScreen from './screens/HomeScreen';
import RecordingScreen from './screens/RecordingScreen';
import Voice from '@react-native-voice/voice';
import { ICar } from './interfaces/ICar';
import { createRecord, putCar } from './apis/api';

type Props = {}

const App = (props: Props) => {
    const [isListening, setIsListening] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState('home');

    const navigateToScreen = (screen: any) => {
        setActiveTab(screen);
    };

    useEffect(() => {
        Voice.onSpeechResults = (event: any) => {
            checkWord(event.value[0]);
        };

        return () => {
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

    const handleStatusClick = async (field: keyof ICar, status: boolean) => {
        const updatedData = { [field]: status };
        try {
            await putCar(updatedData);
            setIsUpdateCarDataProps(true);
        } catch (error) {
            console.error(`Error updating ${field} status:`, error);
        }
    };

    const checkWord = async (text: any) => {
        const words = text.split(' ');
        if (words.includes('เปิดไฟหน้า')) {
            handleStatusClick('frontLight', true);
        } else if (words.includes('เปิดไฟท้าย')) {
            handleStatusClick('backLight', true);
        } else if (words.includes('เปิดไฟซ้าย')) {
            handleStatusClick('leftLight', true);
        } else if (words.includes('เปิดไฟขวา')) {
            handleStatusClick('rightLight', true);
        } else if (words.includes('สตาร์ทรถ')) {
            handleStatusClick('isStart', true);
            await createRecord();
        }else if (words.includes('ปิดไฟหน้า')) {
            handleStatusClick('frontLight', false);
        } else if (words.includes('ปิดไฟท้าย')) {
            handleStatusClick('backLight', false);
        } else if (words.includes('ปิดไฟซ้าย')) {
            handleStatusClick('leftLight', false);
        } else if (words.includes('ปิดไฟขวา')) {
            handleStatusClick('rightLight', false);
        } else if (words.includes('ดับรถ')) {
            handleStatusClick('isStart', false);
            await createRecord();
        }
        console.log(words);
    };

    const setIsUpdateCarDataProps = (value: boolean) => {
        console.log(`isUpdateCarDataProps updated to: ${value}`);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {activeTab === 'home' && <HomeScreen setIsUpdateCarDataProps={setIsUpdateCarDataProps} />}
                {activeTab === 'recordig' && <RecordingScreen />}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                <View style={{ backgroundColor: "#000000", height: 2, width: 160 }} />
                <View style={{ backgroundColor: "#000000", height: 2, width: 160 }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#FFFFFF', }}>
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

export default App