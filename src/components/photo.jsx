
import { useDispatch } from 'react-redux';
import "../css/photo.css";


const Photo = ({ photo, current, toggle }) => {
    const dispatch = useDispatch();

    return (
        <div className="card " onClick={() => { toggle(photo) }}>
            <img className="image" src={photo.urls.thumb} />
        </div>
    );
}

export default Photo;