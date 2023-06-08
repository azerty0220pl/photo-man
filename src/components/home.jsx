import { Button, TextField, InputAdornment } from "@mui/material";
import { searchQuery, searchPhotos } from "../redux/searchSlice";
import { filterQuery } from "../redux/favouritesSlice";
import { useSelector, useDispatch } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import logo from "../photoman.svg";
import { createTheme } from "@mui/material/styles";
import "../css/home.css"

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

const Home = ({ current }) => {
    const dispatch = useDispatch();

    let lnk;
    let btn;
    let ocg;
    let cur;
    let act;
    let plh;

    if (current === '0') {
        lnk = '/favourites/';
        btn = 'Go to favourites';
        ocg = (e) => { dispatch(searchQuery(e.target.value)) };
        cur = useSelector((state) => state.search.searched);
        act = () => { dispatch(searchPhotos()) };
        plh = "Search new photos...";
    } else {
        lnk = '/';
        btn = 'Search for new photos';
        ocg = (e) => { dispatch(filterQuery(e.target.value)) };
        cur = useSelector((state) => state.favourites.filter);
        act = () => {};
        plh = "Search in favourites...";
    }


    return (
        <div className="home">
            <img className="logo" src={logo} />
            <Button theme={theme} variant="outlined" sx={{ boxShadow: 3 }} href={lnk}>{btn}</Button>
            <TextField
                className="input"
                onChange={e => { ocg(e) }}
                value={cur}
                onKeyDown={(e) => { if (e.key === "Enter") act() }}
                theme={theme}
                id="input-with-icon-textfield"
                placeholder={plh}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon theme={theme} />
                        </InputAdornment>
                    ),
                }}
                variant="standard"
                sx={{
                    "& .MuiInput-underline:after": {
                        borderBottomColor: "#000"
                    },
                    "& .MuiInput-input": {
                        fontFamily: 'Courier New'
                    }
                }}
            />
        </div>
    );
}

export default Home;