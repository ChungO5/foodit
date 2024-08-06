import React, { useEffect, useState } from "react";
import FoodList from "./FoodList";
import { getFoods } from "../api";

const App = () => {
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState("createdAt");
    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    const handleNewChange = () => setOrder("createdAt");
    const handleCalorieChange = () => setOrder("calorie");
    const handleDelete = (id) => {
        const newItems = items.filter((item) => item.id !== id);
        setItems(newItems);
    };

    const handleLoadClick = async (order) => {
        const { foods } = await getFoods(order);
        setItems(foods);
    };

    useEffect(() => {
        handleLoadClick(order);
    }, [order]);

    return (
        <div>
            <div>
                <button onClick={handleNewChange}>최신순</button>
                <button onClick={handleCalorieChange}>칼로리순</button>
            </div>
            <FoodList items={sortedItems} onDelete={handleDelete} />
        </div>
    );
};

export default App;
