import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography'; 

const styles = theme => ({
    listItem: {
        padding: `${theme.spacing.unit}px 0`,
    },
    total: {
        fontWeight: '700',
    },
    title: {
        marginTop: theme.spacing.unit * 2
    }
});

function Review(props) {
    const { classes } = props;
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order Summary
            </Typography>
            <List disablePadding>
                {props.cartItems.map(product => (
                    <ListItem className={classes.listItem} key={product.data.data.name}>
                        <ListItemText primary={product.data.data.name} secondary={`x ${product.data.data.quantity}`} />
                        <Typography variant="body2">{`$${product.data.data.price}`}</Typography>
                    </ListItem>
                ))}
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                        {`$${props.cartCost}`}
                    </Typography>
                </ListItem>
            </List>
        </React.Fragment>
    )
}

export default withStyles(styles)(Review)