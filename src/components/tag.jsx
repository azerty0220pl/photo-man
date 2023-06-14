import { Chip } from "@mui/material";
import { useState } from "react";

const Tag = ({ name,  }) => {
    let [state, setState] = useState("outlined");

    return <Chip label={name} variant={state} onClick={() => {
        
        console.log(state)

        if (state === 'outlined') {
            setState("filled");
        } else {
            setState('outlined');
        }
    }} />
}

export default Tag;