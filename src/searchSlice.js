import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    photos: [],
    searched: ""
};

const searchSlice = createSlice({
    defaultState,
    reducers: {
        search: async (state, action) => {
            let data = await fetch("https://api.unsplash.com/photos/random?count=10");
            let local = JSON.parse(localStorage.getItem("photos")).values;

            data = await data.map(async x => {
                let aux = await x.json();
                let res = {
                    id: aux.id,
                    description: aux.description,
                    width: aux.width,
                    height: aux.height,
                    likes: aux.likes,
                    urls: {
                        full: aux.urls.full,
                        thumb: aux.urls.thumb
                    },
                    saved: local.filter(e => e.id === aux.id).length > 0
                }

                return res;
            });

            state.search = action.payload;
            state.photos = data;
            return state;
        },
        save: (state, action) => {
            let photo = state.photos.find(e => e.id === action.payload);
            photo.saved = !photo.saved;
            return state;
        }
    }
});

export const { search, save } = searchSlice.actions;

export default searchSlice.reducer;