import React from 'react';
import './navigation.css'

import { NavLink } from 'react-router-dom';
import { Button } from '../GlobalStyles.js'
import styled from 'styled-components';

const Item = styled.li`
    align-self: center;
`

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
					<NavLink to={`/create`} activeClassName="active" className="link">
						Create
					</NavLink>
				</Item>
				<Item>
					<NavLink to={`/mypage`} activeClassName="active" className="link">
						MyPage
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

export default Navigation;