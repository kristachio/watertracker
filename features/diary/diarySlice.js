import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchDiary = createAsyncThunk(
    'diary/fetchDiary',
    async () => {
        const response = await fetch(baseUrl + 'diary');
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        return data;
    }
);

const diarySlice = createSlice({
    name: 'diary',
    initialState: { isLoading: true, errMess: null, diaryArray: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDiary.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDiary.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMess = null;
                state.diaryArray = action.payload;
            })
            .addCase(fetchDiary.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error
                    ? action.error.message
                    : 'Fetch failed';
            });
    }
});

export const diaryReducer = diarySlice.reducer;