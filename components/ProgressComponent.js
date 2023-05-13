import { StyleSheet, Text, View } from 'react-native';
import ProgressCircle from 'react-native-progress/Circle';

const ProgressComponent = ({ progress }) => {
  return (
    <View style={styles.container}>
      <ProgressCircle
        showsText={true}
        formatText={(progress) => `${Math.round(progress * 100)}%`}
        progress={progress}
        size={100}
        thickness={6}
        color="#4CAF50"
        unfilledColor="#F5F5F5"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProgressComponent;