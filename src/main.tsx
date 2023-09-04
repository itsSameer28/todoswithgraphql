import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Root } from './Root.tsx';
import './libraries/server'; // This does the magic
import { BrowserRouter } from 'react-router-dom';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: '/graphql'
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Root />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
