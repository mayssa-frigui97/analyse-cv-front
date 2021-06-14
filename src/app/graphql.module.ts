import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { HttpHeaders } from '@angular/common/http';

const token = localStorage.getItem('access_token');
const uri = 'http://localhost:3000/graphql'; // <-- add the URL of the GraphQL server here

// export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
//   const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//   const client ={
//     link: httpLink.create({uri}),
//     cache: new InMemoryCache(),
//     headers: {Authorization: `Bearer ${token}`}
//   };
//   // console.log("client:",client)
//   // console.log("headers:",header)
//   return client;
// }
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
  console.log("http:",http)
  console.log("auth:",auth)
  console.log("Tokenauth:",token)
  return {
    link: auth.concat((http as unknown) as ApolloLink),
    cache: new InMemoryCache(),
    defaultOptions: defaultsOptions,
  };
}

// const middleware = new ApolloLink((operation, forward) => {
//   if (token) {
//     operation.setContext({
//       headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
//     });
//   }
//   return forward(operation);
// });
// const http = new HttpLink({uri});
// apollo.create({
//   link: http.concat((middleware as unknown) as ApolloLink),
//   cache: new InMemoryCache()
// });


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

// import {NgModule} from '@angular/core';//
// import {Apollo, APOLLO_OPTIONS} from 'apollo-angular';//
// import {InMemoryCache} from '@apollo/client/core';//
// import {HttpLink} from 'apollo-angular/http';//
// // import { setContext } from 'apollo-link-context';
// // import { HttpHeaders } from '@angular/common/http';
// // import { ApolloLink } from 'apollo-link';
// // import { onError } from "@apollo/client/link/error";

// const uri = 'http://localhost:3000/graphql'; // <-- add the URL of the GraphQL server here

// // export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
// //   return {
// //     link: httpLink.create({uri}),
// //     cache: new InMemoryCache(),
// //   };
// // }
// export function createApollo(httpLink: HttpLink) {

  // const auth = setContext((_, { headers }) => {
  //   // get the authentication token from local storage if it exists
  //     const token = localStorage.getItem('access_token');
  //     if (!token) {
  //       return {};
  //     } else {
  //       return {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       };
  //     }
  //   });
//   //   // const http = new HttpLink({uri});
//   //   const http = httpLink.create({ uri })
//   //   // const http = createHttpLink({ uri })
//   // return {
//   //   link: auth.concat((http as unknown) as ApolloLink),
//   //   cache: new InMemoryCache()
//   // };

//   // const basic = setContext((operation, context) => ({
//   //   headers: {
//   //     Accept: 'charset=utf-8'
//   //   }
//   // }));

//   // const error = onError(({ graphQLErrors, networkError, response, operation }) => {
//   //   if (graphQLErrors[0].extensions.exception.status == 401) {
//   //     // authService.refreshToken().subscribe(res => {
//   //       // console.log(res)
//   //     // })
//   //     console.log("erreur graphql")
//   //   }
//   // })

//   // const auth = setContext((operation, context) => {
//   //   const token = localStorage.getItem('access_token');

//   //   if (token === null) {
//   //     return {};
//   //   } else {
//   //     return {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`
//   //       }
//   //     };
//   //   }
//   // });
//   const http = httpLink.create({ uri });
//   // const link = ApolloLink.from([(http as unknown) as ApolloLink ]);
//   const cache = new InMemoryCache();

//   return {
//     http,
//     cache
//   }
// }
// @NgModule({
//   providers: [
//     {
//       provide: APOLLO_OPTIONS,
//       useFactory: createApollo,
//       deps: [HttpLink,Apollo],
//     },
//   ],
// })
// export class GraphQLModule {
// }
