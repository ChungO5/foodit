export const getFoods = async ({ order = "", cursor = "", limit = 10 }) => {
    const query = `order=${order}&cursor=${cursor}&limit=${limit}`;
    const respnse = await fetch(`https://learn.codeit.kr/6666/foods?${query}`);
    const body = await respnse.json();
    return body;
};
