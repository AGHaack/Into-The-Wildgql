import React, { Component } from 'react';
import Header from './components/Header';
import AdventureFeed from './components/AdventureFeed';

class Home extends Component {
    render() {
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div>
                    <h1>Recent Adventures</h1>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AdventureFeed />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;