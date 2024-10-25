// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageTitle from "../components/pageTitle";
import './teashop.css';

const Teashop = () => {
    const pathName = useLocation().pathname.slice(7); // gets /:shopName from root router
    const [data, setData] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5000/${pathName}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data.drinks)
            })
    }, [pathName]);

    console.log(data)

    return (
        <div className="teashop-main">
            <PageTitle title={pathName} />
            <div className="teashop-grid">
                { data ? data.map((data, key) => {
                    return (
                        <div key={key}>
                            {data.name}
                        </div>
                    )
                }) : <></>}
            </div>
        </div>
    )
}

export default Teashop;