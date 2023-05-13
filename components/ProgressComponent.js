import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ProgressCircle from 'react-native-progress-circle';

const ProgressComponent = ({ progress }) => (
  <View style={styles.container}>
    <ProgressCircle
      percent={progress}
      radius={50}
      borderWidth={8}
      color="#3399FF"
      shadowColor="#999"
      bgColor="#fff"
    >
      <Text style={styles.text}>{`${progress}%`}</Text>
    </ProgressCircle>
  </View>
);

ProgressComponent.propTypes = {
  progress: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ProgressComponent;
