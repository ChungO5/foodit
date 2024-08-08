import React, { useEffect, useState } from "react";
import FoodList from "./FoodList";
import { getFoods } from "../api";
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

    const handleDelete = (id) => {
        const newItems = items.filter((item) => item.id !== id);
        setItems(newItems);
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

    const handleSubmitSuccess = (item) => {
        setItems((prevItems) => [item, ...prevItems]);
    };

    useEffect(() => {
        handleLoad({ order, limit: LIMIT, search });
    }, [order, search]);

    return (
        <div>
            <FoodForm handleSubmitSuccess={handleSubmitSuccess} />
            <div>
                <button onClick={handleNewChange}>최신순</button>
                <button onClick={handleCalorieChange}>칼로리순</button>
            </div>
            <form onSubmit={handleSearchSubmit}>
                <input name="search" />
                <button type="submit">검색</button>
            </form>
            <FoodList items={sortedItems} onDelete={handleDelete} />
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
