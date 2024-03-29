import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ProgressComponent from '../components/ProgressComponent';



const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <ProgressComponent />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Diary')}>
          <FontAwesome name='calendar' size={50} color='#3E98C7' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <FontAwesome name='bell' size={50} color='#3E98C7' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <FontAwesome name='gear' size={50} color='#3E98C7' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 2,
    borderTopWidth: 2,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    height: 150,
  },
  progressContainer: {
    marginTop: 30,
  },
});

export default DashboardScreen;
