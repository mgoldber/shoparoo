import React, { Component } from 'react';
import './storeitems.css'
import { Wrapper } from './styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';

import axios from 'axios';

import { getToken } from '../../services/tokenService';

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
            console.log(getToken())
            // Need to get the user token as this is a locked down route
            const userToken = getToken();
            // Get Fanny Pack Object by ID
            const fannyPack = await axios.get(`/api/fannies/${itemId}`);
            // Do a post request that adds the fannypack to user shopping cart 
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            console.log(cart);
            if (cart.length === 0) {
                cart.push(fannyPack);
                localStorage.setItem('cart', JSON.stringify(cart));
            } else { // A shopping cart already exists
                let pack = cart.find(item => {
                    return item.id = itemId
                });
                if (pack) { // This means increasing item quantity
                    console.log("I guess already found that pack");
                } else { // Add item 
                    cart.push(fannyPack);
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
            }

        } catch (e) {
           console.log(e.message);
       }
    }

    async fetchFannyPacks () {
        try {
            const res = await axios.get(`/api/fannies/`);
            console.log(res);
            this.setState({
                packs: res.data.data
            });
        } catch (e) {
            console.error(e);
        }
    }

    renderFannyPacks() {
        
    }


    componentDidMount () {
        this.fetchFannyPacks();
    }

    render () {
        return (
            <Wrapper>
                <GridList cellHeight={500} className="gridList">
                    {this.state.packs.map(tile => (
                    <GridListTile key={tile.photoUrl}>
                        <img src={tile.photoUrl} alt={tile.name} />
                    <GridListTileBar
                        title={tile.name}
                        subtitle={<span>by: {tile.name}</span>}
                        actionIcon={
                            <IconButton onClick={() => {this.addToShoppingCart(tile.id)}} className="icon">
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