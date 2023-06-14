import { save } from "../redux/searchSlice";
import { remove } from "../redux/favouritesSlice";
import { useDispatch } from 'react-redux';
import "../css/photo.css";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';
import saveAs from "file-saver";


const Photo = ({ photo, current, toggle }) => {
    const dispatch = useDispatch();

    return (
        <div className="card " onClick={() => { toggle(photo) }}>
            <img className="image" src={photo.urls.thumb} />
            <div className="controls">
                {
                    photo.saved ?
                        <StarIcon className="star" onClick={() => {
                            current === '0' ? dispatch(save(photo.id))
                                : dispatch(remove(photo.id))
                        }} /> : <StarBorderIcon className="icon" onClick={() => { dispatch(save(photo.id)) }} />
                }
                <div className="bottom-controls">
                    <DownloadIcon className="icon" onClick={() => { saveAs(photo.urls.full) }} />
                    <InfoIcon className="icon" />
                </div>
            </div>
        </div>
    );
}

export default Photo;