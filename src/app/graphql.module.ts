import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { setContext } from 'apollo-link-context';
import { ApolloLink, fromPromise } from 'apollo-link';
import { HttpHeaders } from '@angular/common/http';
import { onError } from 'apollo-link-error';
import { AuthService } from 'src/app/Services/auth.service';
import { switchMap } from 'rxjs/operators';
import { getRefreshTokenLink} from 'apollo-link-refresh-token';
import jwt_decode from "jwt-decode";


// const refreshtoken = localStorage.getItem('refresh_token');
declare type FetchNewAccessToken = (refreshToken: string) => Promise<string | undefined>;
const token = localStorage.getItem('access_token');
const uri = 'http://localhost:2000/graphql'; // <-- add the URL of the GraphQL server here
const auth = setContext((_, { headers }) => {
    if (!token) {
      console.log("***********pas token")
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
  // const errorLink = onError(({ forward, graphQLErrors, networkError, operation }) => {
  //   if (graphQLErrors) {
  //     graphQLErrors.map(({ message, locations, path }) =>
  //       {
  //        if (message.toLowerCase() === 'unauthorized') {
  //         authService.refreshToken().then((token) => {
  //           console.log("token:",token)
  //           return forward(operation).subscribe(result => {
  //             console.log(result);
  //           });
  //         });
  //           // console.log("token after:",authService.getToken())
  //         }
  //       });
  //   }
  // });

  const isTokenValid = (token: string): boolean => {
    const decodedToken = jwt_decode<{ [key: string]: number }>(token);

    if (!decodedToken) {
      return false;
    }

    const now = new Date();
    return now.getTime() < decodedToken.exp * 1000;
  };

  const fetchNewAccessToken: FetchNewAccessToken = async refreshToken => {
    if (!uri) {
      throw new Error(
        'URL must be set to use refresh token link'
      );
    }
    console.log("access token before:",localStorage.getItem('access_token'));
    try {
      const refreshtoken = localStorage.getItem('refresh_token');
      const fetchResult = await fetch(uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation {
              refreshToken(input: {
                refreshToken: "${refreshtoken}"
              }) {
                user
                  {
                    id
                    nom
                    cin
                    dateNaiss
                    adresse
                    tel
                    email
                    avatar
                    nomUtilisateur
                    telPro
                    emailPro
                    role
                    poste
                    dateEmb
                    salaire
                    evaluation
                  },
                accessToken
              }
            }
          `,
        }),
      });
      console.log("fetchResult",fetchResult)

      const refreshResponse = await fetchResult.json();

      console.log("refreshResponse",refreshResponse)
      if (
        !refreshResponse ||
        !refreshResponse.data ||
        !refreshResponse.data.refreshToken ||
        !refreshResponse.data.refreshToken.accessToken
      ) {
        return undefined;
      }
      console.log("token after:",refreshResponse.data.refreshToken.accessToken)
      localStorage.setItem('access_token',refreshResponse.data.refreshToken.accessToken)
      console.log("token now:",localStorage.getItem('access_token'));
      return refreshResponse.data.refreshToken.accessToken;
    } catch (e) {
      throw new Error('Failed to fetch fresh access token');
    }
  };
  const refreshTokenLink = getRefreshTokenLink({
    authorizationHeaderKey: 'Authorization',
    fetchNewAccessToken,
    getAccessToken: () => localStorage.getItem('access_token'),
    getRefreshToken: () => localStorage.getItem('refresh_token'),
    isAccessTokenValid: accessToken => isTokenValid(accessToken),
    isUnauthenticatedError: graphQLError => {
      const { extensions } = graphQLError;
      console.log("token:",localStorage.getItem('access_token'))
      console.log("refresh:",localStorage.getItem('refresh_token'))
      console.log("erreur:",extensions)
      if (
        extensions &&
        extensions.code &&
        extensions.exception.message === 'Unauthorized'
      ) {
        console.log("Unauthorized")
        return true;
      }
      return false;
    },
  });
  console.log("refreshTokenLink:",refreshTokenLink);
  return {
    link: refreshTokenLink.concat(auth.concat((http as unknown) as ApolloLink)),
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

