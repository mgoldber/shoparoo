import React, { Component } from 'react'
import { Container, SubHeader, Cancel, SelectionGroup, Selection, Form, Wrapper } from './styles'
import { Button, Input, FlexContainer } from '../GlobalStyles'
import { setToken } from '../../services/tokenService';

class Login extends Component {
	state = {
		type: 'login',
		message: null
	}

	handleChange = e => this.setState({ [e.target.name]: e.target.value })

	handleSubmit = async e => {
		e.preventDefault()

		const { email, password, type } = this.state

		const route = type === 'login' ? 'login' : 'signup'

		const fetchConfig = {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: { 'Content-Type': 'application/json' }
		};

		try {
			const res = await fetch(`/api/users/${route}`, fetchConfig);
			const token = await res.json()
			console.log(token)
			// const { token, doc } = res.data.payload
			setToken(token.data[0].token);

			// this.props.setUser(doc)
			this.props.hideLogin();
		} catch (e) {
			this.setState({ message: e })
			console.log(e)
		}
	}

	changeForm = type => {
		this.setState({ type: type })
	}

	render() {
		const { type, success } = this.state

		return (
			<Wrapper>
				<Container>
					<SelectionGroup>
						<Selection active={type === 'login'} onClick={() => this.changeForm('login')}>
							Login
						</Selection>

						<Selection active={type === 'signup'} onClick={() => this.changeForm('signup')}>
							Sign up
						</Selection>
					</SelectionGroup>

					<Form autoComplete="off" onSubmit={this.handleSubmit}>
						<SubHeader>You'll need to login to continue</SubHeader>
						<Input spaced name="email" type="email" placeholder="email" onChange={this.handleChange} />

						<Input spaced name="password" type="password" placeholder="password" onChange={this.handleChange} />
						<FlexContainer>
							<Button type="submit">{type}</Button>

							<Cancel small onClick={this.props.hideLogin}>
								cancel
							</Cancel>
						</FlexContainer>
					</Form>
				</Container>
			</Wrapper>
		)
	}
}

export default Login
