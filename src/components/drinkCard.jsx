import { useState } from "react";
import "./drinkCard.css";
import defaultCardImg from "../assets/boba-bear.png"

// eslint-disable-next-line react/prop-types
const DrinkCard = ({ drinkName, addDrink }) => {
    const [added, setAdded] = useState(false)

    const cardOnClick = () => {
        setAdded(!added)
        addDrink()
    }

    return (
        <div className={`drink-card ${added ? "drink-card-selected" : ""}`}>
            <p>{drinkName}</p>
            <figure className="card-image-container">
                <img src={defaultCardImg} className="image-sizing"/>
            </figure>
            <div>
                {added ?
                    <button className="bobar-button" onClick={cardOnClick}>
                        &#40;&#8722;&#41; Remove
                    </button> :
                    <button className="bobar-button" onClick={cardOnClick}>
                        &#40;&#43;&#41; Add
                    </button>
                }
                <button className="bobar-button" onClick={cardOnClick}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DrinkCard;
