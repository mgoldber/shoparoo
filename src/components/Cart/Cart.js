import React, { Component } from 'react';

import { Wrapper } from './styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';


import axios from 'axios';
import { getToken } from '../../services/tokenService';

import { getCart } from '../../services/cartService'; 

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cartItems: getCart()
        }
    }

    async completePurchase() {
        try {
            const purchase = await axios.post(`/api/fannies/purchase`, 
                {
                    data: {
                        packs: this.state.cartItems
                    },
                    headers: {
                        'Authorization': `Bearer ${getToken()}`
                    }
                }
            );
            console.log(purchase);
        } catch(e) {
            console.error(e.message);
        }
    }

    componentDidMount() {
        // Access the cart stored in local storage
        console.log(this.state.cartItems);
    }

    render() {
        return (
            <Wrapper>
                <GridList cellHeight={500} className="gridList">
                    {this.state.cartItems.map(item => (
                        <GridListTile key={item.data.data.photoUrl}>
                            <img src={item.data.data.photoUrl} />
                            <GridListTileBar
                                title={item.data.data.name}
                                subtitle={<span>by: {item.data.data.name}</span>}
                            />
                        </GridListTile>
                    ))}
                    <IconButton onClick={() => {this.completePurchase()}} className="icon">
                        <AddShoppingCart className="icon" />
                    </IconButton>
                    
                </GridList>
            </Wrapper>
        )
    }
}

export default Cart;