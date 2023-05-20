import { useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDiary } from '../features/diary/diarySlice';


const DiaryScreen = () => {
  const diaryArray = useSelector((state) => state.diary.diaryArray);
  const isLoading = useSelector((state) => state.diary.isLoading);
  const errMess = useSelector((state) => state.diary.errMess);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDiary());
  }, [dispatch]);

  if (isLoading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (errMess) {
    return <Text style={styles.errorText}>Error: {errMess}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {diaryArray.map((entry) => (
        <View key={entry.id} style={styles.entryContainer}>
          <Text style={styles.dateText}>{entry.date}</Text>
          <Text style={styles.intakeText}>{entry.intaketotal}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  entryContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  intakeText: {
    fontSize: 14,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    color: 'red',
  },
});

export default DiaryScreen;