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


declare type FetchNewAccessToken = (refreshToken: string) => Promise<string | undefined>;
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


export function createApollo(httpLink: HttpLink, authService: AuthService) {
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
  //     if (graphQLErrors[0].message.toLowerCase() === 'unauthorized') {
  //       return authService.refreshToken()
  //       .pipe(
  //         switchMap(() => forward(operation))
  //       );
  //     }
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

    try {
      const fetchResult = await fetch(uri, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation {
              refreshToken(input: {
                refreshToken: "${refreshToken}"
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
                    equipe {
                      id
                      nom
                      pole {
                        id
                        nom
                      }
                    }
                    cv {
                      id
                      cmptLinkedin
                      statutCV
                      activiteAssociatives
                      certificats
                      langues
                      experiences
                      formations
                      projets
                      interets
                      competences {
                        nom
                      }
                    }
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
        !refreshResponse.data.refreshTokens ||
        !refreshResponse.data.refreshTokens.accessToken
      ) {
        return undefined;
      }

      return refreshResponse.data.refreshTokens.accessToken;
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

