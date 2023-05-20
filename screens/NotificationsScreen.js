import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Linking } from 'react-native';
import * as Notifications from 'expo-notifications';

const NotificationsScreen = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  useEffect(() => {
    checkNotificationPermissions();
  }, []);

  const checkNotificationPermissions = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    if (existingStatus === 'granted') {
      setIsNotificationsEnabled(true);
    }
  };

  const enableNotifications = () => {
    Alert.alert(
      'Enable Notifications',
      'Do you want to enable notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Enable', onPress: handleEnableNotifications },
      ],
      { cancelable: true }
    );
  };

  const handleEnableNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      setIsNotificationsEnabled(true);
      scheduleNotifications();
    } else if (status === 'undetermined') {
      Alert.alert(
        'Enable Notifications',
        'Please enable notifications for this app in your device settings.',
        [{ text: 'OK', onPress: openAppSettings }]
      );
    }
  };

  const openAppSettings = () => {
    Linking.openSettings();
  };

  const scheduleNotifications = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Water Reminder',
        body: "It's time for water!",
      },
      trigger: {
        repeats: true,
        seconds: 60, // 1 minute interval
      },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={enableNotifications} disabled={isNotificationsEnabled}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            {isNotificationsEnabled ? 'Notifications Enabled' : 'Enable Notifications'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NotificationsScreen;