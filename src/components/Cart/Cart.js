import React, { Component } from 'react';
import axios from 'axios';
import { getToken } from '../../services/tokenService';
import { getCart } from '../../services/cartService'; 

import { Wrapper } from './styles';
import { GridList, GridListTile, GridListTileBar, IconButton, withStyles } from '@material-ui/core';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';

const styles = {
    icon: {
        'color': 'blue'
    }
}

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cartItems: getCart(),
            totalCartPrice: 0
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
            this.setState({
                totalCartPrice: purchase
            });
        } catch(e) {
            console.error(e.message);
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Wrapper>
                <GridList cellHeight={500} className="gridList">
                    {this.state.cartItems.map(item => (
                        <GridListTile key={item.data.data.photoUrl}>
                            <img src={item.data.data.photoUrl} />
                            <GridListTileBar
                                title={item.data.data.name}
                                subtitle={"Quantity: " + item.data.data.quantity}
                            />
                        </GridListTile>
                    ))}
                    <IconButton onClick={() => {this.completePurchase()}} classes={{icon: classes.icon}}>
                        <AddShoppingCart classes={{icon: classes.icon}} />
                    </IconButton>
                    
                </GridList>
            </Wrapper>
        )
    }
}

export default withStyles(styles)(Cart);