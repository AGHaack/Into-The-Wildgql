import React, { Component } from 'react';
import { homeFeedQuery } from '../../queries/queries';
import { graphql } from 'react-apollo';

class AdventureFeed extends Component {
    render() {
        console.log(this.props.feedQuery);
        let cards = <h1>Loading...</h1>
        if(!this.props.feedQuery.loading) {
            cards = this.props.feedQuery.allAdventures.adventureFeed.map(( adventure, index ) => {
                return (
                    <div key={index} className="card ml-2 mr-2 mt-2 mb-1" style={{width: '18rem', display: 'flex' }} >
                        <div className="card-header">
                            {adventure.title}
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{adventure.park}</li>
                            <li className="list-group-item">{adventure.activity}</li>
                            <li className="list-group-item">{adventure.rating}</li>
                        </ul>
                    </div>
                );
            })
        }
        return (
            <div>
                {cards}
            </div>
        );
    }
}

export default graphql(homeFeedQuery, { name: 'feedQuery'})(AdventureFeed);