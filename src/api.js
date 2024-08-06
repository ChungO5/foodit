export const getFood = async () => {
    const respnse = await fetch(`https://learn.codeit.kr/6666/foods`);
    const body = await respnse.json();
    return body;
};
