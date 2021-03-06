import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { welcomeHeadQuery } from '../../queries/queries'

class Header extends Component {
    render() {
        let welcomeMsg = "Loading..."
        if(!this.props.header.loading) {
            welcomeMsg = `Welcome to The Wild ${this.props.header.user.firstName}!`
        }
        return (
            <div className="pt-5 d-flex flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom" style={{display: 'flex'}}>
                <div>
                <h1 style={{ textAlign: 'center' }}>{welcomeMsg}</h1>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={this.props.handleOpen}>Share a recent Adventure</button>
                </div>
            </div>
        );
    }
}

export default graphql(welcomeHeadQuery, { name: "header" })(Header);