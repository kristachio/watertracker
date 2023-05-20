import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';

const NotificationsScreen = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [startTime, setStartTime] = useState(new Date().setHours(8, 0, 0)); // Default start time: 8:00 AM
  const [endTime, setEndTime] = useState(new Date().setHours(20, 0, 0)); // Default end time: 8:00 PM
  const [reminderInterval, setReminderInterval] = useState(1); // Default reminder interval: 1 minutes
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  useEffect(() => {
    checkNotificationPermissions();
  }, []);

  const checkNotificationPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus === 'granted') {
        setIsNotificationsEnabled(true);
      } else {
        Alert.alert(
          'Notification Permissions Required',
          'Please enable notifications for this app in your device settings.',
          [{ text: 'OK' }]
        );
      }
    } else {
      setIsNotificationsEnabled(true);
    }
  };

  const handleSetStartTime = (event, selectedTime) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setStartTime(selectedTime.getTime());
    }
  };

  const handleSetEndTime = (event, selectedTime) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      setEndTime(selectedTime.getTime());
    }
  };

  /*const handleAdjustReminderInterval = (value) => {
    setReminderInterval(value);
  };*/

  const handleToggleNotifications = async () => {
    setIsNotificationsEnabled(!isNotificationsEnabled);
  
    if (!isNotificationsEnabled) {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } else {
      const startDateTime = new Date(startTime);
      const endDateTime = new Date(endTime);
      const interval = 1 * 60000; // Hardcoded interval: 1 minute
  
      let currentDateTime = new Date(startDateTime);
      while (currentDateTime <= endDateTime) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: 'Water Reminder',
            body: "It's time for water!",
          },
          trigger: {
            date: currentDateTime.getTime(), // Use getTime() to get the time in milliseconds
            repeats: 'minute', // Trigger the notification every minute
          },
        });
        currentDateTime = new Date(currentDateTime.getTime() + interval);
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Enable Notifications</Text>
        <Switch value={isNotificationsEnabled} onValueChange={handleToggleNotifications} />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Start Time</Text>
        <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
          <Text style={styles.settingValue}>{new Date(startTime).toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showStartTimePicker && (
          <DateTimePicker
            value={new Date(startTime)}
            mode="time"
            is24Hour={false}
            display="spinner"
            onChange={handleSetStartTime}
          />
        )}
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>End Time</Text>
        <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
          <Text style={styles.settingValue}>{new Date(endTime).toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showEndTimePicker && (
          <DateTimePicker
            value={new Date(endTime)}
            mode="time"
            is24Hour={false}
            display="spinner"
            onChange={handleSetEndTime}
          />
        )}
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Reminder Interval</Text>
        <TouchableOpacity onPress={() => setShowReminderIntervalModal(true)}>
          <Text style={styles.settingValue}>{reminderInterval}</Text>
        </TouchableOpacity>
        {/* Include code for interval selection modal */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingValue: {
    fontSize: 16,
  },
});

export default NotificationsScreen;
