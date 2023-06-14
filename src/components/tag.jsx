import { Chip } from "@mui/material";
import { useState } from "react";

const Tag = ({ name, add, remove }) => {
    let [state, setState] = useState("outlined");

    return <Chip label={name} variant={state} onClick={() => {
        if (state === 'outlined') {
            setState("filled");
            add(name);
        } else {
            setState('outlined');
            remove(name);
        }
    }} />
}

export default Tag;