import React, { Component } from 'react';
import { homeFeedQuery } from '../../queries/queries';
import { useQuery } from 'react-apollo';
import AdventureCard from './AdventureCard';
import { Waypoint } from 'react-waypoint';

class AdventureFeed extends Component {
    HomeFeed = () => {
        const { data, error, loading, fetchMore } = useQuery(homeFeedQuery, {variables: {cursor: null}});
        if(error) return <h3>Error</h3>;
        if(loading || !data) return <h2>Loading...</h2>;
        let more = undefined;
        if(!loading) {
            if(data.allAdventures.pageInfo.hasNextPage){
                more = <h3>Loading...</h3>;
            } else {
                more = <h1>No more data</h1>;
            }
        }
        return (
            <div>
                <div>
                {data.allAdventures.adventureFeed.map(( adventure, index ) => {
                    return (
                        <div className="mt-2" key={adventure.id}>
                            <AdventureCard adventure={adventure} />
                            {
                                index === data.allAdventures.adventureFeed.length-1 && data.allAdventures.pageInfo.hasNextPage && (
                                    <Waypoint onEnter={() => {
                                        const nextCursor = data.allAdventures.pageInfo.nextPageCursor;
                                        fetchMore({
                                            variables: { cursor: nextCursor },
                                            updateQuery: (prev, { fetchMoreResult }) => {
                                                fetchMoreResult.allAdventures.adventureFeed = [
                                                    ...prev.allAdventures.adventureFeed,
                                                    ...fetchMoreResult.allAdventures.adventureFeed
                                                ];
                                                console.log(fetchMoreResult);
                                                return fetchMoreResult;
                                            }
                                        })
                                    }} />
                                )
                            }
                        </div>
                    );
                })}
                </div>
                <div>
                    {more}
                </div>
            </div>
        );
    }
    render() {
        return (
            <div className="container">
                <div>
                    <this.HomeFeed />
                </div>
            </div>
        );
    }
}

export default AdventureFeed;