import React, { useState } from "react";
import FileInput from "./FileInput";

const INITIAL_VALUES = {
    title: "",
    calorie: 0,
    content: "",
    imgFile: null,
};

const FoodForm = ({
    initialValues = INITIAL_VALUES,
    initialPreview,
    onCancel,
    onSubmit,
    handleSubmitSuccess,
}) => {
    const [values, setValues] = useState(initialValues);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(null);

    const handleChange = (name, value) => {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("calorie", values.calorie);
        formData.append("content", values.content);
        formData.append("imgFile", values.imgFile);
        let result;
        try {
            setLoadingError(null);
            setIsLoading(true);
            result = await onSubmit(formData);
        } catch (error) {
            setLoadingError(error);
            return;
        } finally {
            setIsLoading(false);
        }
        let { food } = result;
        handleSubmitSuccess(food);
        setValues(INITIAL_VALUES);
    };

    return (
        <form onSubmit={handleSubmit}>
            <FileInput
                name="imgFile"
                value={values.imgFile}
                initialPreview={initialPreview}
                onChange={handleChange}
            />
            <input
                name="title"
                value={values.title}
                onChange={handleInputChange}
            />
            <input
                name="calorie"
                value={values.calorie}
                onChange={handleInputChange}
                type="number"
            />
            <input
                name="content"
                value={values.content}
                onChange={handleInputChange}
            />
            <button disabled={isLoading} type="submit">
                확인
            </button>
            {onCancel && <button onClick={onCancel}>취소</button>}
            {loadingError?.message && loadingError.message}
        </form>
    );
};

export default FoodForm;
