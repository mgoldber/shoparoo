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
            author: "Mark"  
        }, {
            id: 2,
            img: "https://hychalknotes.s3.amazonaws.com/fannypack11__fullstackcodealong.jpg",
            title: "OMG Stop too cute",
            author: "Mark Again"
        }, {
            id: 3,
            img: "https://hychalknotes.s3.amazonaws.com/fannypack1__fullstackcodealong.jpg",
            title: "I Love Fanny Packs",
            author: "Mark Also"
        }, {
            id: 4,
            img: "https://hychalknotes.s3.amazonaws.com/fannypack2__fullstackcodealong.jpg",
            title: "Fanny Packs for Lyfe",
            author: "Mark too"
        }]
    }

    async addToShoppingCart(itemId) {
       try {
            // POST request to add item to shopping cart
            console.log(getToken())
            // Need to get the user token as this is a locked down route
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
                        subtitle={<span>by: {tile.author}</span>}
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