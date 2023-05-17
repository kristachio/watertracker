import { useEffect } from 'react';
import { Text, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDiary } from '../features/diary/diarySlice';
import { baseUrl } from '../shared/baseUrl'; // Import the baseUrl

const DiaryScreen = () => {
  const diary = useSelector((state) => state.diary);
  const { isLoading, errMess, diaryArray } = diary;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDiary(baseUrl)); // Pass the baseUrl to the fetchDiary async thunk
  }, [dispatch]);

  if (isLoading) {
    return <Text>Loading...</Text>; // Show a loading indicator while fetching the data
  }

  if (errMess) {
    return <Text>Error: {errMess}</Text>; // Show an error message if there's an error
  }

  const renderEntry = ({ item }) => (
    <Text>{item.date}: {item.intaketotal}</Text>
  );

  return (
    <FlatList
      data={diaryArray}
      renderItem={renderEntry}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={() => <Text>Water Intake Diary</Text>}
    />
  );
};

export default DiaryScreen;