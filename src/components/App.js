import React, { Component } from 'react';
import Navigation from './Navigation';
import Login from './Login';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
// import './styles/styles.scss';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginActive: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    toggleLogin = () => this.setState(prevState => ({ showLogin: !prevState.showLogin }))
    
    render() {
        return (
            <Router>
                <div>
                    <Navigation user={this.state.user} toggleLogin={this.toggleLogin} logout={this.logout} />
					{this.state.showLogin && !this.state.user && <Login hideLogin={this.toggleLogin} setUser={this.setUser} />}
                </div>
            </Router>
        )
    }
}

export default App;
