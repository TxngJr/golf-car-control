import React, { useState, useEffect } from 'react';
import Voice from '@react-native-voice/voice';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const SpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');

  useEffect(() => {
    // Set up voice recognition
    Voice.onSpeechResults = (event:any) => {
      setRecognizedText(event.value[0]);
      checkWord(event.value[0]);
    };

    return () => {
      // Clean up voice recognition
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    try {
      await Voice.start('en-US');
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

  const checkWord = async (word:any) => {
    if (word === 'example') {
      try {
        const response = await axios.get('https://api.example.com');
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View>
      <Text>Speech Recognition Example</Text>
      <Button
        title={isListening ? 'Stop Listening' : 'Start Listening'}
        onPress={isListening ? stopListening : startListening}
      />
      <Text>Recognized Text: {recognizedText}</Text>
    </View>
  );
};

export default SpeechRecognition;
