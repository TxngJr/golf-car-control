import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
    // Configuration options for the notification library
    // Customize the behavior as per your requirements
    onNotification: function(notification:any) {
      // Handle notification actions or events
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
  

type Props = {}

const NotificationManager = (props: Props) => {
  return (
    <View>
      <Text>NotificationManager</Text>
    </View>
  )
}

export default NotificationManager

const styles = StyleSheet.create({})