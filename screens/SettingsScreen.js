import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const settingsButtons = [
    { title: 'Current Daily Water Intake Goal', screen: 'DailyGoalScreen' },
    { title: 'Water Intake Calculator by Weight' },
    { title: 'Units of Measurement' },
  ];

  const supportButtons = [
    { title: 'Rate the App' },
    { title: 'Send Feedback' },
    { title: 'FAQ' },
  ];

  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Settings</Text>
      {settingsButtons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={styles.buttonRow}
          onPress={() => navigateToScreen(button.screen)}
        >
          <Text style={styles.buttonText}>{button.title}</Text>
          <AntDesign name="right" size={20} color="#3E98C7" />
        </TouchableOpacity>
      ))}
      <Text style={styles.sectionTitle}>Support</Text>
      {supportButtons.map((button, index) => (
        <TouchableOpacity key={index} style={styles.buttonRow}>
          <Text style={styles.buttonText}>{button.title}</Text>
          <AntDesign name="right" size={20} color="#3E98C7" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
