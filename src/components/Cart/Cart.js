import React, { Component } from 'react';
import axios from 'axios';
import { getToken } from '../../services/tokenService';
import { getCart } from '../../services/cartService'; 
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'; 
import Review from '../Review.js';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core';

const styles = theme => ({
    icon: {
        'color': 'blue'
    },
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
          marginTop: theme.spacing.unit * 6,
          marginBottom: theme.spacing.unit * 6,
          padding: theme.spacing.unit * 3,
        },
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit,
    }
});

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cartItems: getCart(),
            totalCartPrice: 0,
            orderConfirmationNum: ''
        }
    }

    async completePurchase() {
        try {
            const orderConfirmation = await axios.post(`/api/fannies/purchase`, 
                {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`
                    }
                }
            );
            this.setState({
                orderConfirmationNum: orderConfirmation.data.orderNum
            });
        } catch(e) {
            console.error(e.message);
        }
    }

    calculateCartCost() {
        let costTotal = this.state.cartItems.map((total) => {
            return total.data.data.price * total.data.data.quantity;
        }).reduce((sum, totalCost) => {
            return sum + totalCost;
        });
        this.setState({
            totalCartPrice: costTotal
        });
    }

    componentDidMount() {
        this.calculateCartCost()
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                    Checkout
                </Typography>
                <Review cartItems={this.state.cartItems} cartCost={this.state.totalCartPrice}/>
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={() => this.completePurchase()}
                    className={classes.button}
                >
                    Place Order
                </Button>
                {this.state.orderConfirmationNum.length > 0 && (
                    <React.Fragment>
                        <Typography variant="h5" gutterBottom align="center">
                            Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                            Your order number is {this.state.orderConfirmationNum}. We have emailed your order confirmation, and
                            will send you an update when your order has shipped.
                        </Typography>
                    </React.Fragment>
                )}
            </Paper>
        )
    }
}

export default withStyles(styles)(Cart);