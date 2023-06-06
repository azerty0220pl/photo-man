import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    photos: [],
    searched: ""
};

const searchSlice = createSlice({
    defaultState,
    reducers: {
        search: async (state, action) => {
            let data;

            if (action.payload === "")
                data = await fetch("https://api.unsplash.com/photos/random?count=10");
            else
                data = await fetch("https://api.unsplash.com/search/photos?query=" + action.payload);

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

            let local = JSON.parse(localStorage.getItem("photos")).values;

            if(photo.saved)
                local.push(photo);
            else
                local.slice(local.findIndex(e => e.id === action.payload), 1);

            localStorage.setItem("photos", JSON.stringify(local));

            return state;
        }
    }
});

export const { search, save } = searchSlice.actions;

export default searchSlice.reducer;