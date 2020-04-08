import { gql } from 'apollo-boost';

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

export { signupMutation, loginMutation };