import { description } from "../redux/favouritesSlice";
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import '../css/modal.css';

const Modal = ({ id, toggle }) => {
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
    let index = useSelector(state => state.favourites.photos.findIndex(x => x.id == id));
    let des = useSelector(state => state.favourites.photos[index].description);

    return (
        <div className="modal" onClick={() => { toggle('') }}>
            <TextField
                className="description"
                value={des}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === "Escape")
                        toggle('');
                }}
                onChange={
                    (e) => {
                        dispatch(description({ id: id, description: e.target.value }));
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
        </div>
    );
}

export default Modal;