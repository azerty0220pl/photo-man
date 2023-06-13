import Home from "../components/home";
import { useSelector } from 'react-redux';
import Photo from "../components/photo";
import Modal from "../components/modal";
import '../css/page.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme } from "@mui/material/styles";
import { useState } from "react";
import { Chip, Pagination } from "@mui/material";

const Favourite = () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#000',
            }
        },
        typography: {
            fontFamily: 'Courier New'
        }
    });

    let [sort, setSort] = useState('none');
    let [edit, setEdit] = useState('');
    let [page, setPage] = useState(1);
    let [tags, setTags] = useState([]);

    let filter = useSelector((state) => state.favourites.filter);
    let photos = useSelector((state) => state.favourites.photos);

    const gallery = () => {
        let aux;
        switch (sort) {
            case 'date':
                aux = photos.toSorted((a, b) => {
                    if (a.date > b.date)
                        return -1;
                    return 1;
                });
                break;
            case 'width':
                aux = photos.toSorted((a, b) => {
                    if (a.width > b.width)
                        return -1;
                    return 1;
                });
                break;
            case 'height':
                aux = photos.toSorted((a, b) => {
                    if (a.height > b.height)
                        return -1;
                    return 1;
                });
                break;
            case 'likes':
                aux = photos.toSorted((a, b) => {
                    if (a.likes > b.likes)
                        return -1;
                    return 1;
                });
                break;
            default:
                aux = photos;
                break;
        }

        let index = page * 10;
        aux = aux.slice(index - 10, index);

        if(tags.length > 0)
            aux.filter(e => {
                return e.tags.filter(t => tags.includes(t)).length > 0;
        });

        return aux.map((x, i) => {
            if (!filter.length > 0 || x.description.includes(filter))
                return <Photo current="1" photo={x} edit={setEdit} key={i} />
        });
    }

    return (
        <div>
            {
                edit != '' ?
                <Modal id={edit} toggle={setEdit} />
                : <></>
            }
            <Home current="1" />
            <div className="tags">
                {
                    photos.reduce((prev, cur) => {
                        return prev.concat(cur.tags.filter(e => !prev.includes(e)));
                    }, []).map(e => {
                        return <Chip label={e} />
                    })
                }
            </div>
            {
                photos.length > 0 ? 
                <Pagination
                count={Math.floor(photos.length / 10) + 1}
                page={page}
                onChange={(event, value) => {
                    setPage(value)
                }}
                sx={{
                    "& .css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root": {
                        fontFamily: "Courier New"
                    }
                }}
                />
                : <></>
            }
            <div className="sortBy">
                <FormControl
                    theme={theme}
                    variant="standard"
                    sx={{
                        m: 1,
                        minWidth: 120,
                        "& .Mui-focused:after": {
                            borderBottomColor: "#000"
                        },
                        "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
                            fontFamily: 'Courier new'
                        },
                        "& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                            color: '#000',
                            fontFamily: 'Courier new'
                        },
                        "& .css-m5hdmq-MuiInputBase-root-MuiInput-root-MuiSelect-root": {
                            fontFamily: 'Courier new'
                        },
                        "& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root": {
                            fontFamily: 'Courier new'
                        }
                    }}>
                    <InputLabel
                        theme={theme}
                        id="sort">Sort by</InputLabel>
                    <Select
                        theme={theme}
                        labelId="sort"
                        label="sortBy"
                        value={sort}
                        onChange={e => { setSort(e.target.value) }}
                    >
                        <MenuItem theme={theme} value="none">None</MenuItem>
                        <MenuItem theme={theme} value='date'>Added</MenuItem>
                        <MenuItem theme={theme} value='width'>Width</MenuItem>
                        <MenuItem theme={theme} value='height'>Height</MenuItem>
                        <MenuItem theme={theme} value="likes">Likes</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className="gallery">
                {
                    photos == null ? <></> :
                        gallery()
                }
            </div>
        </div >
    );
}

export default Favourite;