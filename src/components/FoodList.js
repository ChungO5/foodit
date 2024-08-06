import React from "react";
import "./FoodList.css";

const formatDate = (value) => {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
};

const FoodListItem = ({ item, onDelete }) => {
  const handleDeleteClick = () => {
    onDelete(item.id);
  };
  return (
    <div className="FoodListItem">
      <img src={item.imgUrl} alt={item.title} />
      <div>{item.title}</div>
      <div>{item.calorie}</div>
      <div>{item.content}</div>
      <div>{formatDate(item.createdAt)}</div>
      <button onClick={handleDeleteClick}>삭제</button>
    </div>
  );
};

const FoodList = ({ items, onDelete }) => {
  return (
    <ul className="FoodList">
      {items.map((item) => (
        <li>
          <FoodListItem item={item} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
};

export default FoodList;
