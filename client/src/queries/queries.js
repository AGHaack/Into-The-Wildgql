import { gql } from 'apollo-boost';

const newAdventureMutation = gql`
    mutation newAdventure($title: String!, $park: String!, $parkLocation: String!, $activity: String!, $adventureDate: String!, $post: String!, $rating: Int!, $imgPublicId: String) {
        createAdventure(input: { 
            title: $title,
            park: $park,
            activity: $activity,
            parkLocation: $parkLocation,
            adventureDate: $adventureDate,
            post: $post,
            rating: $rating,
            imgPublicId: $imgPublicId
        }){
            id
        }
    }
`;

const adventurePostDetailsQuery = gql`
    query userAdventure($id: ID!){
        userAdventure(id: $id){
            id
            title
            park
            parkLocation
            activity
            adventureDate
            post
            rating
            imgPublicId
            author {
                id
                firstName
                lastName
            }
            createdAt
        }
    }
`;

const welcomeHeadQuery = gql`
    query{
        user{
            id
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

export { signupMutation, loginMutation, welcomeHeadQuery, homeFeedQuery, adventurePostDetailsQuery, newAdventureMutation };