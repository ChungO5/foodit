import React from "react";

const FoodItem = ({ item }) => {
  return (
    <div>
      <img src={item.imgUrl} alt={item.title} />
      <div>{item.title}</div>
      <div>{item.calorie}</div>
      <div>{item.content}</div>
    </div>
  );
};

const FoodList = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li>
          <FoodItem item={item} />
        </li>
      ))}
    </ul>
  );
};

export default FoodList;
