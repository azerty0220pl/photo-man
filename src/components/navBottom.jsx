import { NavLink } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import { Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { resetSearch } from "../redux/searchSlice";
import { resetFavourite } from "../redux/favouritesSlice";
import '../css/navBottom.css';

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

const getScrollPosition = () => {
    const position = window.scrollY

    return position /*Math.round(position / (document.documentElement.scrollHeight - window.innerHeight) * 100)*/;
}

const NavBottom = ({ current }) => {
    const dispatch = useDispatch();

    const [button, setButton] = useState("down");

    let lnk;
    let ocl;
    let btn;

    if (current === '0') {
        lnk = 'favourites';
        ocl = () => { dispatch(resetFavourite()); };
        btn = 'Go to favourites';
    } else {
        lnk = '/';
        ocl = () => { dispatch(resetSearch()); };
        btn = 'Search for new photos';
    }

    useLayoutEffect(() => {
        const handleScroll = () => {
            if (getScrollPosition() > 450 && button == "down")
                setButton("climbing");
            else if (getScrollPosition() <= 450 && button == "up")
                setButton("dropping");
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    });

    return (
        <NavLink
            className={"navBottom " + button}
            onAnimationEnd={() => {
                switch (button) {
                    case "dropping":
                        setButton("down");
                        break;
                    case "climbing":
                        setButton("up");
                        break;
                }
            }} to={lnk}><Button theme={theme} variant="outlined" sx={{ boxShadow: 3 }} onClick={ocl()}>{btn}</Button></NavLink>
    );
}

export default NavBottom;