const Photo = ({ photo }) => {
    return (
        <div className="card">
            <img src={photo.urls.full} />
        </div>
    );
}

export default Photo;