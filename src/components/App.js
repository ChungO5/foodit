import React, { useEffect, useState } from "react";
import FoodList from "./FoodList";
import { creatFood, deleteFood, getFoods, updateFood } from "../api";
import FoodForm from "./FoodForm";

const LIMIT = 10;

const App = () => {
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState("createdAt");
    const [cursor, setCursor] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingError, setLoadingError] = useState(null);
    const [search, setSearch] = useState("");

    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    const handleNewChange = () => setOrder("createdAt");

    const handleCalorieChange = () => setOrder("calorie");

    const handleDelete = async (id) => {
        const result = await deleteFood(id);
        if (!result) return;
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const handleLoad = async (options) => {
        let result;
        try {
            setLoadingError(null);
            setIsLoading(true);
            result = await getFoods(options);
        } catch (e) {
            setLoadingError(e);
            return;
        } finally {
            setIsLoading(false);
        }

        const { foods, paging } = result;
        if (!options.cursor) {
            setItems(foods);
        } else {
            setItems((prevItems) => [...prevItems, ...foods]);
        }
        setCursor(paging.nextCursor);
    };

    const handleLoadMore = async () => {
        handleLoad({ order, cursor, limit: LIMIT, search });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearch(e.target["search"].value);
    };

    const handleCreateSuccess = (item) => {
        setItems((prevItems) => [item, ...prevItems]);
    };

    const handleUpdateSuccess = (food) => {
        setItems((prevItems) => {
            const splitIdx = prevItems.findIndex((item) => item.id === food.id);
            return [
                ...prevItems.slice(0, splitIdx),
                food,
                ...prevItems.slice(splitIdx + 1),
            ];
        });
    };

    useEffect(() => {
        handleLoad({ order, limit: LIMIT, search });
    }, [order, search]);

    return (
        <div>
            <FoodForm
                onSubmit={creatFood}
                handleSubmitSuccess={handleCreateSuccess}
            />
            <div>
                <button onClick={handleNewChange}>최신순</button>
                <button onClick={handleCalorieChange}>칼로리순</button>
            </div>
            <form onSubmit={handleSearchSubmit}>
                <input name="search" />
                <button type="submit">검색</button>
            </form>
            <FoodList
                items={sortedItems}
                onDelete={handleDelete}
                onUpdate={updateFood}
                onUpdateSuccess={handleUpdateSuccess}
            />
            {cursor && (
                <button disabled={isLoading} onClick={handleLoadMore}>
                    더보기
                </button>
            )}
            {loadingError?.message && <p>{loadingError.message}</p>}
        </div>
    );
};

export default App;
