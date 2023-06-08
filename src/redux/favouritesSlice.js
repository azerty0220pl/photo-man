import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    photos: JSON.parse(localStorage.getItem("photos")) == null ? [] : JSON.parse(localStorage.getItem("photos")).values,
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
            return state;
        },
        remove: (state, action) => {
            state.photos.splice(state.photos.findIndex(e => e.id === action.payload, 1));
            return state;
        }
    }
});

export const { filterQuery, description, remove } = favouritesSlice.actions;

export default favouritesSlice.reducer;