import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';


export const searchAPI = createAsyncThunk("get/search", async (keyword) => {

    try {

        let url_first = `https://nominatim.openstreetmap.org/search?q=${keyword}&format=json&polygon_kml=1&addressdetails=1`
        const res = await fetch(url_first)
        const data = await res.json();
        return data

    } catch (err) {
        console.log(err)
    }
})

export const searchSlice = createSlice({
    name: 'coordinates',
    initialState: {
        error: false,
        pending: true,
        data_first: [],


    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(searchAPI.pending, (state) => {
            state.pending = true;
        })
            .addCase(searchAPI.fulfilled, (state, action) => {
                state.pending = false;
                state.data_first = action.payload;
                state.error = false

            })
            .addCase(searchAPI.rejected, (state, action) => {
                state.pending = false;
                state.error = true;
            })
    }
})


export default searchSlice.reducer;