import React from 'react';
import './navigation.css'
import { Item } from './styles';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '../GlobalStyles.js'

const styles = {
	nav: {
		'display': 'flex',
		'justify-content': 'space-between',
		'padding': '20px 0' 
	},
	list: {

	},
	link: {

	}, 
}

const Navigation = ({ toggleLogin, user, logout }) => {
    return (
        <div className="nav">
			<div>Shoparoo</div>
            <ul className="list">
                <Item>
					<NavLink exact to={`/`} activeClassName="active" className="link">
						Home
					</NavLink>
				</Item>
				<Item>
					<NavLink to={`/cart`} activeClassName="active" className="link">
						Cart
					</NavLink>
				</Item>
				{user ? (
					<Button spaced purple small onClick={logout}>
						Logout
					</Button>
				) : (
					<Button spaced purple small onClick={toggleLogin}>
						Login
					</Button>
				)}
            </ul>
        </div>
    )
}

export default withStyles(styles)(Navigation);