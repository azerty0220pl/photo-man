import { createSlice, applyMiddleware } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';

const defaultState = {
    photos: [],
    searched: ""
};

const searchSlice = createSlice({
    name: "search",
    initialState: defaultState,
    reducers: {
        searchQuery: (state, action) => {
            state.searched = action.payload;
            return state;
        },
        loadPhotos: (state, action) => {
            state.photos = action.payload;
            return state;
        },
        save: (state, action) => {
            let photo = state.photos.find(e => e.id === action.payload);
            photo.saved = !photo.saved;

            let local = JSON.parse(localStorage.getItem("photos")) == null ? [] : JSON.parse(localStorage.getItem("photos")).values;

            if (photo.saved)
                local.push(photo);
            else
                local.slice(local.findIndex(e => e.id === action.payload), 1);

            localStorage.setItem("photos", JSON.stringify(local));

            return state;
        }
    }
}, applyMiddleware(thunk));

export const { searchQuery, loadPhotos, save } = searchSlice.actions;

export const searchPhotos = () => {
    return async (dispatch, getState) => {
        let state = getState();

        let data;

        if (state.search.searched === "")
            await fetch("https://api.unsplash.com/photos/random?count=10", { method: 'GET', headers: { 'Authorization': "Client-ID " + import.meta.env.VITE_UNSPLASH_KEY } })
                .then(async d => {
                    await d.json().then(x => {
                        data = x;
                    });
                });
        else
            await fetch("https://api.unsplash.com/search/photos?query=" + state.search.searched, { method: 'GET', headers: { 'Authorization': "Client-ID " + import.meta.env.VITE_UNSPLASH_KEY } })
                .then(async d => {
                    await d.json().then(x => {
                        data = x.results;
                    });
                });

        let local = JSON.parse(localStorage.getItem("photos")) == null ? [] : JSON.parse(localStorage.getItem("photos")).values;

        let photos = data.map( x => {
            let res = {
                id: x.id,
                description: x.description,
                width: x.width,
                height: x.height,
                likes: x.likes,
                urls: {
                    full: x.urls.full,
                    thumb: x.urls.thumb
                },
                saved: local.filter(e => e.id === x.id).length > 0
            }

            return res;
        });

        dispatch(searchSlice.actions.loadPhotos(photos));
    }
}

export default searchSlice.reducer;