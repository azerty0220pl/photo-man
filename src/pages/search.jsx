import Home from "../components/home";
import { useSelector } from 'react-redux';
import Photo from "../components/photo";
import '../css/page.css';

const Search = () => {
    let getPhotos = useSelector((state) => state.search.photos)
    return (
        <div>
            <Home current="0" />
            <div className="gallery">
                {
                    getPhotos.map((x, i) => {
                        return <Photo current="0" photo={x} key={i} />
                    })
                }
            </div>
        </div>
    );
}

export default Search;