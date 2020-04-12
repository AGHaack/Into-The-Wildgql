import React, { Component } from 'react';
import Header from './components/Header';
import AdventureFeed from './components/AdventureFeed';
import NewPostModal from './components/new-post/NewPostModal';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingPostModal: false
        }
    }

    showNewPostModal = () => {
        this.setState({
            showingPostModal: true
        })
    }
    hideNewPostModal = () => {
        this.setState({
            showingPostModal: false
        })
    }
    render() {
        return (
            <div>
                <div>
                    <Header handleOpen={this.showNewPostModal} />
                </div>
                <div>
                    <h1>Recent Adventures</h1>
                    <div>
                        <NewPostModal showing={this.state.showingPostModal} handleClose={this.hideNewPostModal} />
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AdventureFeed />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;