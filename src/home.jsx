import { ButtonGroup, Button, TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import logo from "./photoman.svg";
import { createTheme } from "@mui/material/styles";
import "./home.css"

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
    return (
        <div className="home">
            <img className="logo" src={logo} />
            <Button theme={theme} variant="outlined" sx={{ boxShadow: 3 }} href={current === '0' ? '/favourites/' : '/'}>{current === '0' ? 'Go to favourites' : 'Search new photos'}</Button>
            <TextField
                className="input"
                theme={theme}
                id="input-with-icon-textfield"
                placeholder="Search..."
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