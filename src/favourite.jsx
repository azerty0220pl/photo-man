import Home from "./home";
import { useSelector } from 'react-redux';
import Photo from "./photo";
import './page.css';

const Favourite = () => {
    let filter = useSelector((state) => state.favourites.filter);
    let photos = useSelector((state) => state.favourites.photos);
    return (
        <div>
            <Home current="1" />
            <div className="gallery">
                {
                    photos == null ? <></> :
                        photos.map((x, i) => {
                            if (filter.length > 0 && !x.description.includes(filter))
                                return <></>
                            return <Photo current="1" photo={x} key={i} />
                        })
                }
            </div>
        </div>
    );
}

export default Favourite;