// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageTitle from "../components/pageTitle";
import './teashop.css';
import DrinkCard from "../components/drinkCard";

const Teashop = () => {
    const pathName = useLocation().pathname.slice(7); // gets /:shopName from root router
    const [data, setData] = useState('');
    const [form, setForm] = useState({
        name: "",
        location: ""
    });
    const [selected, setSelected] = useState(new Set());
    const navigate = useNavigate();
    const dialogRef = useRef(null);

    useEffect(() => {
        async function getBobar() {
          const response = await fetch(`http://localhost:5000/bobar/${pathName}`)
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.error(message);
            return;
          }
          const records = await response.json();
          setData(records);
        }
        getBobar();
        return;
      }, [pathName]);

    const getRandomDrink = () => {
        const selectedArr = [...selected]
        const range = Math.floor(Math.random() * selectedArr.length);
        alert(selectedArr[range]);
    }

    const drinkList = () => {
        try {
            return data.map((drink) => {
                return (
                    <DrinkCard 
                        drinkName={drink.name} 
                        addDrink={() => setSelected(prevState => new Set(prevState).add(drink.name))}
                        key={drink._id}
                    />
                )
            })
        } catch {
            return <></>
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const drink = { ...form };
        try {
            let response;
            response = await fetch("http://localhost:5000/bobar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(drink)
            });
            if (!response.ok) { throw new Error(`HTTP error: ${response.status}`) }
        } catch (error) {
            console.error("Error occurred:", error)
        } finally {
            setForm({
                name: "",
                location: "",
            });
            navigate(0);
        }
    }

    const updateForm = (value) => {
        return setForm((prev) => {
            return { ...prev, ...value }
        });
    };

    const toggleDialog = () => {
        if(!dialogRef.current) {
            return;
        }
        dialogRef.current.hasAttribute("open")
            ? dialogRef.current.close()
            : dialogRef.current.showModal()
    }
    
    return (
        <div className="teashop-main">
            <PageTitle title={pathName} />
            <button className="bobar-button" onClick={getRandomDrink}>Pick my drink!</button>
            <button className="bobar-button" onClick={toggleDialog}>Add new drink!</button>
            <div className="teashop-grid">
                {drinkList()}
            </div>
            <dialog ref={dialogRef}  className="dialog-center" onClick={(e) => {
                if (e.currentTarget === e.target) {
                    toggleDialog()
                }
            }}>
                <form method="dialog" onSubmit={onSubmit}>
                    <div>
                        <label>Drink name:</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            required
                            onChange={(e) => updateForm({ name: e.target.value, location: `${pathName}` })}
                            />
                        <div className="button-pair">
                            <input type="submit" value="Submit"/>
                            <button onClick={toggleDialog}>Close</button>
                        </div>
                    </div>
                </form>
            </dialog>
        </div>
    )
}

export default Teashop;