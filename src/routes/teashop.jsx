// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";

const Teashop = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/')
            .then((res) => res.text())
            .then((data) => {
                setData(data);
            })
    }, []);

    return (
        <>
            <h1>Boba bears</h1>
            <p>{data}</p>
        </>
    )
}

export default Teashop;