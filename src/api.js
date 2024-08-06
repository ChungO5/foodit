export const getFoods = async ({ order = "createdAt" }) => {
    const query = `${order}`;
    const respnse = await fetch(`https://learn.codeit.kr/6666/foods?${query}`);
    const body = await respnse.json();
    return body;
};
