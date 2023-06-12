import Home from "../components/home";
import { useSelector, useDispatch } from 'react-redux';
import Photo from "../components/photo";
import '../css/page.css';
import { Pagination } from "@mui/material";
import { searchPhotos } from "../redux/searchSlice";
import { useState } from "react";

const Search = () => {
    let getPhotos = useSelector((state) => state.search.photos);
    let dispatch = useDispatch();
    let [page, setPage] = useState(1);

    return (
        <div>
            <Home current="0" />
            {
                getPhotos.length > 0 ? 
                <Pagination
                count={3}
                page={page}
                onChange={(event, value) => {
                    setPage(value);
                    dispatch(searchPhotos(value))
                }}
                sx={{
                    "& .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root": {
                        fontFamily: "Courier New"
                    }
                }}
                />
                : <></>
            }
            <div className="gallery">
                {
                    getPhotos.map((x, i) => {
                        return <Photo current="0" photo={x} key={i} />
                    })
                }
            </div>
        </div>
    );
}

export default Search;