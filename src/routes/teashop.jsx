// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageTitle from "../components/pageTitle";
import './teashop.css';
import DrinkCard from "../components/drinkCard";

const Teashop = () => {
    const pathName = useLocation().pathname.slice(7); // gets /:shopName from root router
    const [data, setData] = useState('');
    const [selected, setSelected] = useState(new Set());

    useEffect(() => {
        fetch(`http://localhost:5000/${pathName}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data.drinks)
            })
    }, [pathName]);

    const getRandomDrink = () => {
        const selectedArr = [...selected]
        const range = Math.floor(Math.random() * selectedArr.length);
        console.log(selectedArr[range]);
    }
    
    return (
        <div className="teashop-main">
            <PageTitle title={pathName} />
            <button className="bobar-button" onClick={getRandomDrink}>Pick my drink!</button>
            <div className="teashop-grid">
                { data ? data.map((data, key) => {
                    return (
                        <div key={key}>
                            <DrinkCard drinkName={data.name} addDrink={() => setSelected(prevState => new Set(prevState).add(data.name))}/>
                        </div>
                    )
                }) : <></>}
            </div>
        </div>
    )
}

export default Teashop;