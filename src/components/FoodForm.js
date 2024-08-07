import React, { useState } from "react";

const FoodForm = () => {
    const [title, setTitle] = useState("");
    const [calorie, setCalorie] = useState(0);
    const [content, setContent] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleCalorieChange = (e) => {
        setCalorie(e.target.value);
    };
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    return (
        <form>
            <input name="title" value={title} onChange={handleTitleChange} />
            <input
                name="calorie"
                value={calorie}
                onChange={handleCalorieChange}
                type="number"
            />
            <input
                name="content"
                value={content}
                onChange={handleContentChange}
            />
        </form>
    );
};

export default FoodForm;
