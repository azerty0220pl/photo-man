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

    const [visible, setVisible] = useState(false);

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
            if (getScrollPosition() > 450)
                setVisible(true);
            else
                setVisible(false);
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    });

    return (
        visible ?
            <NavLink className="navBottom" to={lnk}><Button theme={theme} variant="outlined" sx={{ boxShadow: 3 }} onClick={ocl()}>{btn}</Button></NavLink>
            :
            <></>
    );
}

export default NavBottom;