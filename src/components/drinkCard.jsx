import "./drinkCard.css";

// eslint-disable-next-line react/prop-types
const DrinkCard = ({ drinkName, addDrink }) => {


    return (
        <div className="drink-card" onClick={addDrink}>
            <p>{drinkName}</p>
        </div>
    )
}

export default DrinkCard;

//https://github.com/mongodb-developer/mern-stack-example