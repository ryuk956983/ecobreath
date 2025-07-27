import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fectchAPI = createAsyncThunk("get/aqi", async ({latitude= 28.644, longitude= 77.216}) => {

    try {

        let url_first = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${parseFloat(latitude)}&longitude=${parseFloat(longitude)}&hourly=pm10,pm2_5,carbon_monoxide,carbon_dioxide,nitrogen_dioxide,ozone,sulphur_dioxide,ammonia,methane,alder_pollen,birch_pollen,grass_pollen&current=pm10,pm2_5,carbon_monoxide,ozone,sulphur_dioxide,nitrogen_dioxide,ammonia,alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen,us_aqi,european_aqi&past_days=7`
        let url_second = `https://nominatim.openstreetmap.org/reverse?lat=${parseFloat(latitude)}&lon=${parseFloat(longitude)}&format=json`
        const res = await fetch(url_first)
        const res2 = await fetch(url_second)
        const data = await res.json();
        const data2 = await res2.json();
        return { data, data2 }
    } catch (err) {
        console.log(err)
    }
})

export const coordinatesSlice = createSlice({
    name: 'coordinates',
    initialState: {
        error: false,
        pending: true,
        first_load:true,
        data_first: {},
        data_second: {}

    },
    reducers: {
        change_first_load:(state)=>{
            state.first_load = false;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fectchAPI.pending, (state) => {
            state.pending = true;
        })
            .addCase(fectchAPI.fulfilled, (state, action) => {
                state.pending = false;
                state.data_first = action.payload.data;
                state.data_second = action.payload.data2
                state.error = false

            })
            .addCase(fectchAPI.rejected, (state, action) => {
                state.pending = false;

                state.error = true;
            })
    }
})

export const {change_first_load} = coordinatesSlice.actions

export default coordinatesSlice.reducer;