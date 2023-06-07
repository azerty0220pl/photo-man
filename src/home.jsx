import { ButtonGroup, Button, TextField, InputAdornment } from "@mui/material";
//import { SearchIcon } from "@mui/icons-material";
import logo from "./photoman.png";

const Home = () => {
    return (
        <div>
            <img src={logo} />
            <ButtonGroup>
                <Button>Search</Button>
                <Button>My photos</Button>
            </ButtonGroup>
            <TextField
                id="input-with-icon-textfield"
                placeholder="Search..."
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        </InputAdornment>
                    ),
                }}
                variant="standard"
            />
        </div>
    );
}

export default Home;