import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { lastValueFrom, map, Observable } from 'rxjs';
import { Mutation, Query } from '../../commons/types';

@Injectable({
  providedIn: 'root', // Available app-wide
})
export class ApiService {

  constructor(
    private apollo: Apollo
  ) {
  }
  async executeQuery<T>(
    query: any,
    variables: any = {},
    fetchPolicy:
      | 'no-cache'
      | 'cache-first'
      | 'network-only'
      | 'cache-only' = 'no-cache'
  ): Promise<Query | null> {
    try {
      const result = await lastValueFrom(
        this.apollo
          .query<Query>({
            query: query,
            variables: variables,
            fetchPolicy: fetchPolicy,
          })
          .pipe(map((response) => response?.data))
      );
      return result;
    } catch (error) {
      return null;
    }
  }

  async executeMutation<T>(
    query: any,
    variables: any = null,
    context: any = null
  ): Promise<Mutation | null | undefined> {
    const useMultipart = !!variables?.file && variables.file instanceof File;
    try {
      const result = await lastValueFrom(
        this.apollo
          .mutate<Mutation>({
            mutation: query,
            variables: variables,
            context: {
              headers: {
                'apollo-require-preflight': 'true',
              },
              useMultipart
            },
          })
          .pipe(map((response) => response?.data))
      );
      return result;
    } catch (error) {
      return null;
    }
  }
}
