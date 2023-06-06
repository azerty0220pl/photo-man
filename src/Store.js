import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import favouritesSlice from "./favouritesSlice";

export const store = configureStore({
    reducer: {
        search: searchSlice,
        favourites: favouritesSlice
    }
});