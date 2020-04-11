import { gql } from 'apollo-boost';

const welcomeHeadQuery = gql`
    query{
        user{
            firstName
        }
    }
`;

const homeFeedQuery = gql`
    query homeFeedQuery($cursor: String, $limit: Int){
        allAdventures(cursor: $cursor, limit: $limit){
            adventureFeed{
                id
                title
                park
                activity
                rating
                author{
                    firstName
                    lastName
                }
            }
            pageInfo {
                nextPageCursor
                hasNextPage
            }
        }
    }
`;

const signupMutation = gql`
    mutation($firstName: String!, $lastName: String!, $email: String!, $password: String!){
        signup(input: { firstName: $firstName, lastName: $lastName, email: $email, password: $password}){
            firstName
        }
    }
`;

const loginMutation = gql`
    mutation($email: String!, $password: String!){
        login(input: { email: $email, password: $password}){
            token
        }
    }
`;

export { signupMutation, loginMutation, welcomeHeadQuery, homeFeedQuery };