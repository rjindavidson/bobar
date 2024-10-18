import { Link } from 'react-router-dom';
import './card.css'
/* eslint-disable react/prop-types */
const Card = ({locationName, distance, backgroundImage}) => {
    return (
        <Link to={`${locationName}`} className="location-card" style={{backgroundImage: `url(${backgroundImage})`}}>
            <div className="card-info">
                <p>{locationName}</p>
                <p>{distance} miles</p>
            </div>
        </Link>
    );
}

export default Card;