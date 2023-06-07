const Photo = ({ photo }) => {
    return (
        <div>
            <img src={photo.urls.full} />
        </div>
    );
}

export default Photo;