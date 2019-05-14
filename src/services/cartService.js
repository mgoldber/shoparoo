export const getCart = () => {
    return JSON.parse(localStorage.getItem('cart'));
}

export const addItem = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}