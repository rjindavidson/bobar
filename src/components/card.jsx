import { Link } from 'react-router-dom';
import './card.css'
/* eslint-disable react/prop-types */
const Card = ({locationName, backgroundImage = '/src/assets/TPTEA.jpg'}) => {
    return (
        <Link to={`shops/${locationName}`} className="location-card" style={{backgroundImage: `url(${backgroundImage})`}}>
            <div className="card-info">
                <p>{locationName}</p>
            </div>
        </Link>
    );
}

export default Card;