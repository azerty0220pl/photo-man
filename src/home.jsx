import { ButtonGroup, Button, TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import logo from "./photoman.png";
import { createTheme } from "@mui/material/styles";

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

const Home = () => {
    return (
        <div>
            <img src={logo} />
            <ButtonGroup>
                <Button theme={theme}>Search</Button>
                <Button theme={theme}>My photos</Button>
            </ButtonGroup>
            <TextField
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
            />
        </div>
    );
}

export default Home;