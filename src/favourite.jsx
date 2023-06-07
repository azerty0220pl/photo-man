import Home from "./home";
import { useSelector } from 'react-redux';
import Photo from "./photo";

const Favourite = () => {
    filter = useSelector((state) => { state.favourites.filter });

    return (
        <div>
            <Home current="1" />
            <div className="gallery">
                {
                    getPhotos.map((x, i) => {
                        if (filter.length > 0 && !x.description.includes(filter))
                            return <></>
                        return <Photo photo={x} key={i} />
                    })
                }
            </div>
        </div>
    );
}

export default Favourite;