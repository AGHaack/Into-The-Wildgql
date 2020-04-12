import React, { Component } from 'react';
import { adventurePostDetailsQuery } from '../../queries/queries';
import { useQuery } from 'react-apollo';

class PostItem extends Component {
    AdventureDetails = () => {
        const qureyId = this.props.match.params.id;
        const { data, error, loading } = useQuery(adventurePostDetailsQuery, {variables: {id: qureyId}});
        if(error) {
            console.log(error);
            return <h3>Error</h3>;
        }
        if(loading) return <h3>Loading...</h3>;
        console.log(data);
        return (
            <div>
                <h3>{data.userAdventure.title}</h3>
                <h3>{data.userAdventure.park}</h3>
            </div>
        );
    }
    render() {
        return (
            <div style={{ marginTop: "200px"}}>
                <h1>test</h1>
                <this.AdventureDetails />
            </div>
        );
    }
}

export default PostItem;