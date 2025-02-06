// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import PageTitle from "../components/pageTitle";
import './teashop.css';
import DrinkCard from "../components/drinkCard";

const Teashop = () => {
    const pathName = useLocation().pathname.slice(7); // gets /:shopName from root router
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        name: "",
        location: ""
    });
    const [selected, setSelected] = useState(new Set());
    const dialogRef = useRef(null);

    useEffect(() => {
        setIsLoading(true)
        getBobar()
            .then(() => setIsLoading(false))
        return;
    }, []);

    const getBobar = async () => {
        const response = await fetch(`http://localhost:5000/bobar/${pathName}`)
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.error(message);
            return;
        }
        const records = await response.json();
        setData(records);
    }

    const deleteDrink = async (drinkId) => {
        await fetch(`http://localhost:5000/bobar/${drinkId}`, {
            method: "DELETE",
        });
        const newData = data.filter((item) => item._id !== drinkId);
        setData(newData);
    }

    const getRandomDrink = () => {
        console.log(data)
        const selectedArr = [...selected]
        const range = Math.floor(Math.random() * selectedArr.length);
        selectedArr.length > 0 ? alert(selectedArr[range]) : alert("No drinks selected!")
    }

    const addRemoveDrink = (drinkName) => {
        selected.has(drinkName) ? selected.delete(drinkName) : selected.add(drinkName);
        setSelected(new Set(selected))
    }

    const drinkList = () => {
        try {
            return data.map((drink) => {
                return (
                    <DrinkCard
                        drinkName={drink.name}
                        addDrink={() => addRemoveDrink(drink.name)}
                        deleteDrink={() => deleteDrink(drink._id)}
                        key={drink._id}
                    />
                )
            })
        } catch {
            return <></>
        }
    }

    // TODO: Update DB to not look over every existing drink here
    const checkDuplicateDrink = (newDrink) => {
        for (const key in data) {
            if (newDrink.name === data[key].name && newDrink.location === data[key].location) {
                return true;
            }
        }
        return false;
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const drink = { ...form };
        try {
            if (checkDuplicateDrink(drink)) {
                alert("Drink already exists!")
                throw new Error("Drink already exists!")
            }
            let response = await fetch("http://localhost:5000/bobar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(drink)
            });
            if (!response.ok) { throw new Error(`HTTP error: ${response.status}`) }
        } catch (error) {
            console.error(error.message)
        }
        finally {
            setForm({
                name: "",
                location: "",
            });
            getBobar()
        }
    }

    const updateForm = (value) => {
        return setForm((prev) => {
            return { ...prev, ...value }
        });
    };

    const toggleDialog = () => {
        if (!dialogRef.current) {
            return;
        }
        dialogRef.current.hasAttribute("open")
            ? dialogRef.current.close()
            : dialogRef.current.showModal()
    }

    return (
        <>
        {isLoading ?  <h1 className="loading-content">Loading...</h1>:
        <div className="teashop-main">
            <PageTitle title={pathName} />
            <button className="bobar-button" onClick={getRandomDrink}>Pick my drink!</button>
            <button className="bobar-button" onClick={toggleDialog}>Add new drink!</button>
            {data.length ?
                <div className="teashop-grid">
                    {drinkList()}
                </div>
                :
                <div className="header-content">
                    No drinks added!
                </div>
            }
            <dialog ref={dialogRef} className="dialog-center" onClick={(e) => {
                if (e.currentTarget === e.target) {
                    toggleDialog()
                }
            }}>
                <form method="dialog" onSubmit={onSubmit} className="dialog-popup">
                    <div>
                        <label>Drink name:</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            id="name"
                            autoComplete="off"
                            onChange={(e) => updateForm({ name: e.target.value, location: `${pathName}` })}
                        />
                        <div className="button-pair">
                            <input type="submit" value="Submit" className="bobar-button" />
                            <button onClick={toggleDialog} className="bobar-button">Close</button>
                        </div>
                    </div>
                </form>
            </dialog>
        </div>
        }
        </>
    )
}

export default Teashop;