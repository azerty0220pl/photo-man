import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    photos: JSON.parse(localStorage.getItem("photos")) == null || JSON.parse(localStorage.getItem("photos")) == '' ? [] : JSON.parse(localStorage.getItem("photos")),
    filter: ""
};

const favouritesSlice = createSlice({
    name: "favourites",
    initialState: defaultState,
    reducers: {
        filterQuery: (state, action) => {
            state.filter = action.payload;
            return state;
        },
        description: (state, action) => {
            state.photos.find(e => e.id === action.payload.id).description = action.payload.description;
            
            localStorage.setItem("photos", JSON.stringify(state.photos));
            return state;
        },
        remove: (state, action) => {
            let index = state.photos.findIndex(e => e.id === action.payload);
            state.photos[index].saved = false;
            state.photos.splice(index, 1);

            localStorage.setItem("photos", JSON.stringify(state.photos));
            return state;
        }
    }
});

export const { filterQuery, description, remove } = favouritesSlice.actions;

export default favouritesSlice.reducer;