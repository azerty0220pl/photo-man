import { Button, TextField, InputAdornment } from "@mui/material";
import { searchQuery, searchPhotos, resetSearch } from "../redux/searchSlice";
import { filterQuery, resetFavourite } from "../redux/favouritesSlice";
import { useSelector, useDispatch } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import logo from "../photoman.svg";
import { createTheme } from "@mui/material/styles";
import "../css/home.css";
import { NavLink } from 'react-router-dom';

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
    let ocl;
    let btn;
    let ocg;
    let cur;
    let act;
    let plh;

    if (current === '0') {
        lnk = 'favourites';
        ocl = () => { dispatch(resetFavourite()); }
        btn = 'Go to favourites';
        ocg = (e) => { dispatch(searchQuery(e.target.value)) };
        cur = useSelector((state) => state.search.searched);
        act = (page) => { dispatch(searchPhotos(page)) };
        plh = "Search new photos...";
    } else {
        lnk = '/';
        ocl = () => { dispatch(resetSearch()); }
        btn = 'Search for new photos';
        ocg = (e) => { dispatch(filterQuery(e.target.value)) };
        cur = useSelector((state) => state.favourites.filter);
        act = () => { };
        plh = "Search in favourites...";
    }


    return (
        <div className="home">
            <img className="logo" src={logo} />
            <NavLink to={lnk}><Button theme={theme} variant="outlined" sx={{ boxShadow: 3 }} onClick={ocl()}>{btn}</Button></NavLink>
            <TextField
                className="input"
                onChange={e => { ocg(e) }}
                value={cur}
                onKeyDown={(e) => { if (e.key === "Enter") act(1) }}
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