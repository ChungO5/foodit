import React, { useState } from "react";
import "./FoodList.css";
import FoodForm from "./FoodForm";

const formatDate = (value) => {
    const date = new Date(value);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
};

const FoodListItem = ({ item, onDelete, onEditingId }) => {
    const handleDeleteClick = () => {
        onDelete(item.id);
    };

    const handleOnEditing = () => {
        onEditingId(item.id);
    };

    return (
        <div className="FoodListItem">
            <img src={item.imgUrl} alt={item.title} />
            <div>{item.title}</div>
            <div>{item.calorie}</div>
            <div>{item.content}</div>
            <div>{formatDate(item.createdAt)}</div>
            <button onClick={handleOnEditing}>수정</button>
            <button onClick={handleDeleteClick}>삭제</button>
        </div>
    );
};

const FoodList = ({ items, onDelete, onUpdate, onUpdateSuccess }) => {
    const [editingId, setEditingId] = useState(null);

    const handleCancel = () => {
        setEditingId(null);
    };

    return (
        <ul className="FoodList">
            {items.map((item) => {
                if (editingId === item.id) {
                    const { id, title, calorie, content, imgUrl } = item;
                    const initialValues = { title, calorie, content };

                    const handleSubmit = (formatDate) =>
                        onUpdate(id, formatDate);

                    const handleSubmitSuccess = (food) => {
                        onUpdateSuccess(food);
                        setEditingId();
                    };

                    return (
                        <li key={item.id}>
                            <FoodForm
                                initialValues={initialValues}
                                initialPreview={imgUrl}
                                onCancel={handleCancel}
                                onSubmit={handleSubmit}
                                handleSubmitSuccess={handleSubmitSuccess}
                            />
                        </li>
                    );
                }
                return (
                    <li key={item.id}>
                        <FoodListItem
                            item={item}
                            onDelete={onDelete}
                            onEditingId={setEditingId}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default FoodList;
