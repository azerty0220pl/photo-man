import Alert from '@mui/material/Alert';
import "../css/alerts.css";

const Alerts = ({ alert }) => {
    
    return (
        <div>
            {
                alert === "none" ?
                    <></>
                    :
                    <Alert className="alert" severity="success">{alert === "removed" ? "Image removed from favourites succesfully" : "Image saved to favourites succesfully."}</Alert>
            }
        </div>
    );
}

export default Alerts;