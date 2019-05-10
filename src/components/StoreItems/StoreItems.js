import React, { Component } from 'react';
import './storeitems.css'
import { Wrapper } from './styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';

import { getToken } from '../../services/tokenService';

class StoreItems extends Component {

    constructor(props) {
        super(props);
        this.stuffs = [{
            id: 1,
            img: "https://hychalknotes.s3.amazonaws.com/fannypack10__fullstackcodealong.jpg",
            title: "Wow Fanny Pack",
            designer: "Mark"  
        }, {
            id: 2,
            img: "https://hychalknotes.s3.amazonaws.com/fannypack11__fullstackcodealong.jpg",
            title: "OMG Stop too cute",
            designer: "Mark Again"
        }, {
            id: 3,
            img: "https://hychalknotes.s3.amazonaws.com/fannypack1__fullstackcodealong.jpg",
            title: "I Love Fanny Packs",
            designer: "Mark Also"
        }, {
            id: 4,
            img: "https://hychalknotes.s3.amazonaws.com/fannypack2__fullstackcodealong.jpg",
            title: "Fanny Packs for Lyfe",
            designer: "Mark too"
        }]
    }

    async addToShoppingCart(itemId) {

        const fetchConfig = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        
        try {
            // POST request to add item to shopping cart
            console.log(getToken())
            // Need to get the user token as this is a locked down route
            const userToken = getToken();
            // Get Fanny Pack Object by ID
            // const fannyPack = await fetch(`/api/fannies/${itemId}`, fetchConfig);
            // Do a post request that adds the fannypack to user shopping cart 
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            console.log(cart);
            if (cart.length === 0) {
                cart.push(this.stuffs[0]);
                localStorage.setItem('cart', JSON.stringify(cart));
            } else { // A shopping cart already exists
                let pack = cart.find(item => {
                    return item.id = itemId
                });
                if (pack) { // This means increasing item quantity
                    console.log("I guess already found that pack");
                } else { // Add item 
                    cart.push(this.stuffs[1]);
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
            }

        } catch (e) {
           console.log(e.message);
       }
    }


    componentDidMount () {
        
    }

    render () {
        return (
            <Wrapper>
                <GridList cellHeight={500} className="gridList">
                    {this.stuffs.map(tile => (
                    <GridListTile key={tile.img}>
                        <img src={tile.img} alt={tile.title} />
                    <GridListTileBar
                        title={tile.title}
                        subtitle={<span>by: {tile.designer}</span>}
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