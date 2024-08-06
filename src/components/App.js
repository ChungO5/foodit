import React, { useState } from "react";
import FoodList from "./FoodList";
import mockItems from "../mock.json";

const App = () => {
  const [items, setItems] = useState(mockItems);
  const [order, setOrder] = useState("createdAt");
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewChange = () => setOrder("createdAt");
  const handleCalorieChange = () => setOrder("calorie");
  const handleDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };
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
