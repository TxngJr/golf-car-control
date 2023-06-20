import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Voice from '@react-native-voice/voice';

const SpeechToFunction = () => {
    const [result, setResult] = useState<string | null>('');
    const [error, setError] = useState<string | null>('');
    const [isRecording, setIsRecording] = useState<boolean>(false);

    Voice.onSpeechStart = () => setIsRecording(true);
    Voice.onSpeechEnd = () => setIsRecording(false);
    Voice.onSpeechError = (err: any) => setError(err.error);
    Voice.onSpeechResults = (result: any) => setResult(result.value[0]);

    const startRecording = async () => {
        try {
            await Voice.start('th-TH');
        } catch (error: any) {
            setError(error);
        }
    };

    const stopRecording = async () => {
        try {
            await Voice.stop();
        } catch (error: any) {
            setError(error);
        }
    }

    return (
        <View>
            <Text>SpeechToFunction</Text>
            <Text>{result}</Text>
            <Text>{error}</Text>
            <TouchableOpacity style={{ width: 70, height: 30, backgroundColor: 'red' }} onPress={isRecording ? stopRecording : startRecording}>
                <Text>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SpeechToFunction

const styles = StyleSheet.create({})