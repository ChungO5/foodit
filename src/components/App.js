import React from "react";
import FoodList from "./FoodList";
import items from "../mock.json";

const App = () => {
  return (
    <div>
      <FoodList items={items} />
    </div>
  );
};

export default App;
