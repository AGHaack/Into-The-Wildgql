import React from 'react';
import Layout from './layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: 'http://localhost:4001/graphql'
})


function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div id="main">
          <Layout />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
