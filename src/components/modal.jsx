import { description } from "../redux/favouritesSlice";
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import '../css/modal.css';
import { useState } from "react";
import { Chip } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DownloadIcon from '@mui/icons-material/Download';
import saveAs from "file-saver";
import { save } from "../redux/searchSlice"
import { remove } from "../redux/favouritesSlice";
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ img, toggle, current, trigger }) => {
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

    const dispatch = useDispatch();

    let index;
    let des;

    if (current === '1') {
        index = useSelector(state => state.favourites.photos.findIndex(x => x.id == img.id));
        des = useSelector(state => state.favourites.photos[index].description);
    } else {
        des = img.description;
    }

    let [editing, setEditing] = useState(false);

    const handleSave = () => {
        if (current === '0'){
            toggle('');
            img.saved ? trigger("removed") : trigger("saved");
            dispatch(save(img.id));
        }
        else {
            toggle('');
            trigger('removed')
            dispatch(remove(img.id));
        }
    }

    return (
        <div className="modal">
            <div className="modal-background" onClick={() => { toggle('') }}></div>
            <img className="img" src={img.urls.full} />
            <div className="controls">
                <DownloadIcon className="icon" onClick={() => { saveAs(img.urls.full) }} />
                {
                    img.saved ?
                        <StarIcon className="star" onClick={() => { handleSave() }} /> : <StarBorderIcon className="icon" onClick={() => { handleSave() }} />
                }
                <CloseIcon className="icon" onClick={() => { toggle(''); }} />
            </div>
            <div className="data">
                <div className="row">
                    {
                        editing ?
                            <TextField
                                className="description"
                                value={des}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === "Escape")
                                        setEditing(false);
                                }}
                                onChange={
                                    (e) => {
                                        dispatch(description({ id: img.id, description: e.target.value }));
                                    }
                                }
                                inputRef={input => input && input.focus()}
                                theme={theme}
                                variant="filled"
                                label="Description"
                                sx={{
                                    "& .css-1ff8729-MuiInputBase-root-MuiFilledInput-root:after": {
                                        borderBottomColor: "#000"
                                    },
                                    "& .css-10botns-MuiInputBase-input-MuiFilledInput-input": {
                                        fontFamily: 'Courier New'
                                    },
                                    "& .css-e4w4as-MuiFormLabel-root-MuiInputLabel-root": {
                                        fontFamily: 'Courier New'
                                    },
                                    "& .css-o943dk-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                                        color: '#000'
                                    },
                                    "& .css-o943dk-MuiFormLabel-root-MuiInputLabel-root": {
                                        fontFamily: 'Courier New'
                                    }
                                }}
                            />
                            :
                            <p>{des}</p>
                    }
                    {
                        img.saved ? <ModeEditIcon className="icon" onClick={() => { setEditing(!editing) }} /> : <></>
                    }
                </div>

                <div className="row">
                    <p className="bold">Size:</p>
                    <p className="value">{img.width + 'x' + img.height + 'px'}</p>
                </div>
                <div className="row">
                    <p className="bold">Likes:</p>
                    <p className="value">{img.likes}</p>
                </div>
                {
                    img.saved ?
                        <div className="row">
                            <p className="bold">{img.saved ? "Added:" : "URL:"}</p>
                            <p className="value">{img.date}</p>
                        </div>
                        : <></>
                }
                {
                    img.tags.map((tag, index) => {
                        return <Chip key={index} label={tag} />
                    })
                }
            </div>
        </div>
    );
}

export default Modal;