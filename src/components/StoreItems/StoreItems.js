import React, { Component } from 'react';
import './storeitems.css'
import { Wrapper } from './styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';

import axios from 'axios';

import { getCart, addItem } from '../../services/cartService'; 

class StoreItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            packs: []
        };
    }

    async addToShoppingCart(itemId) {

        try {
            // POST request to add item to shopping cart
            // Need to get the user token as this is a locked down route
            // Get Fanny Pack Object by ID
            const fannyPack = await axios.get(`/api/fannies/${itemId}`);
            // Do a post request that adds the fannypack to user shopping cart 
            let cart = getCart() || [];
            if (cart.length === 0) {
                fannyPack.data.data.quantity = 1;
                cart.push(fannyPack);
                addItem(cart);
            } else { // A shopping cart already exists
                let pack = cart.find(item => {
                    return item.data.data._id === itemId
                });
                if (pack) { // This means increasing item quantity
                    pack.data.data.quantity += 1;
                    addItem(cart);                    
                } else { // Add item 
                    fannyPack.data.data.quantity = 1;
                    cart.push(fannyPack);
                    addItem(cart);
                }
            }
        } catch (e) {
           console.log(e.message);
       }
    }

    async fetchFannyPacks () {
        try {
            const res = await axios.get(`/api/fannies/`);
            this.setState({
                packs: res.data.data
            });
        } catch (e) {
            console.error(e);
        }
    }

    componentDidMount () {
        this.fetchFannyPacks();
    }

    render () {
        return (
            <Wrapper>
                <GridList cellHeight={500} className="gridList">
                    {this.state.packs.map(tile => (
                    <GridListTile key={tile.photoUrl} >
                        <img src={tile.photoUrl} alt={tile.name} />
                    <GridListTileBar
                        title={tile.name}
                        subtitle={<span>by: {tile.name}</span>}
                        actionIcon={
                            <IconButton onClick={() => {this.addToShoppingCart(tile._id)}} className="icon">
                                <AddShoppingCart className="icon"/>
                            </IconButton>
                        }
                    />
                </GridListTile>
                 ))}
                </GridList>
            </Wrapper>
        )
    }
}

export default StoreItems;