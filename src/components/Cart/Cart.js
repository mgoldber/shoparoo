import React, { Component } from 'react';

class Cart extends Component {
   

    componentDidMount() {
        // Access the cart stored in local storage
        console.log(JSON.parse(localStorage.getItem('cart')));
    }

    render() {
        return (
            <div>
                Fun
            </div>
        )
    }
}

export default Cart;