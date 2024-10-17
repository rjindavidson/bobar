import './card.css'
/* eslint-disable react/prop-types */
const Card = ({locationName, distance, backgroundImage}) => {
    return (
        <div className="location-card" style={{backgroundImage: `url(${backgroundImage})`}}>
            <div className="card-info">
                <p>{locationName}</p>
                <p>{distance} miles</p>
            </div>
        </div>
    );
}

export default Card;