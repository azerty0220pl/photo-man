import Home from "../components/home";
import { useSelector, useDispatch } from 'react-redux';
import Photo from "../components/photo";
import '../css/page.css';
import { Pagination } from "@mui/material";
import { searchPhotos } from "../redux/searchSlice";
import { useState } from "react";
import Modal from "../components/modal";
import Alerts from "../components/alerts";

const Search = () => {
    let getPhotos = useSelector((state) => state.search.photos);
    let dispatch = useDispatch();

    let [page, setPage] = useState(1);
    let [big, setBig] = useState('');
    let [show, setShow] = useState('none');

    let timeId = setTimeout(() => {});

    const trigger = (x) => {
        setShow(x);

        clearTimeout(timeId);

        timeId = setTimeout(() => {
            setShow('none');
        }, 3000);
    };


    return (
        <div>
            {
                big !== '' ?
                <Modal img={big} toggle={setBig} current='0' trigger={trigger} />
                : <></>
            }
            
            <Alerts alert={show} />

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
                        return <Photo current="0" photo={x} key={i} toggle={setBig} />
                    })
                }
            </div>
        </div>
    );
}

export default Search;