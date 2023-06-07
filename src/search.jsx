import { Component } from "react";
import { search, save } from "./redux/searchSlice";
import { useSelector, useDispatch } from 'react-redux'
import Home from "./home"

const Search = () => {
    return (
        <div>
            <Home />
        </div>
    );
}

export default Search;