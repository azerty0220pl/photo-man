import { save } from "./redux/searchSlice";
import { remove } from "./redux/favouritesSlice";
import { useSelector, useDispatch } from 'react-redux';
import "./photo.css";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


const Photo = ({ photo, current }) => {
    const dispatch = useDispatch();

    return (
        <div className="card">
            <img className="image" src={photo.urls.full} />
            <div className="controls">
                {
                    photo.saved ?
                        <StarIcon className="star" onClick={() => {
                            current === '0' ? dispatch(save(photo.id))
                            : dispatch(remove(photo.id))
                        }} /> : <StarBorderIcon className="icon" onClick={() => { dispatch(save(photo.id)) }} />
                }
                <div className="bottom-controls">
                    {photo.saved ? <ModeEditIcon className="icon" /> : <></>}
                    {photo.saved ? <DownloadIcon className="icon" /> : <></>}
                    <InfoIcon className="icon" />
                </div>
            </div>
            <div className="data">
                <p>{photo.description}</p>
                <div className="row">
                    <p className="bold">Size:</p>
                    <p className="value">{photo.width + 'x' + photo.height + 'px'}</p>
                </div>
                <div className="row">
                    <p className="bold">Likes:</p>
                    <p className="value">{photo.likes}</p>
                </div>
                {
                    photo.saved ?
                        <div className="row">
                            <p className="bold">{photo.saved ? "Added:" : "URL:"}</p>
                            <p className="value">{photo.date}</p>
                        </div>
                        : <></>
                }
            </div>
        </div>
    );
}

export default Photo;