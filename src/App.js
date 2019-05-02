import React, { Component } from 'react';
import Header from './components/Header.js';
import './styles/styles.scss';

class App extends Component {
    
    render() {
        return (
            <main>
                <Header
                    title="Shoparoo"
                    message="Shop for fannypacks"
                />
            </main>
        )
    }
}

export default App;
