import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { HttpHeaders } from '@angular/common/http';

const token = localStorage.getItem('access_token');
const uri = 'http://localhost:2000/graphql'; // <-- add the URL of the GraphQL server here

const auth = setContext((_, { headers }) => {
    if (!token) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    }
});

export function createApollo(httpLink: HttpLink) {
  const defaultsOptions = {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    }
  } ;
  const http = httpLink.create({uri});
  return {
    link: auth.concat((http as unknown) as ApolloLink),
    cache: new InMemoryCache(),
    defaultOptions: defaultsOptions,
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}

