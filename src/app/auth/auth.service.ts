import {ApolloClient, InMemoryCache} from "@apollo/client/core";
import {Apollo} from "apollo-angular";
import {inject, Injectable} from "@angular/core";
import {CommonService} from "../core/services/common.service";
import {Router} from "@angular/router";
import {Mutation, OtpResponse, Query, User, UserResponse} from "../commons/types";
import {GQL_QUERIES} from "../core/constants/service-gql";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {lastValueFrom} from "rxjs";
import {storageKey} from "../core/constants/storage-key";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apollo = inject(Apollo)
  commonService = inject(CommonService)
  router = inject(Router)

  /** CMS */
  async login(email: string, password: string): Promise<UserResponse | null | undefined> {
    const credential = {
      email: email?.trim(),
      password: password?.trim()
    }
    try {
      const result = lastValueFrom(this.apollo.mutate<Mutation>({
        mutation: GQL_QUERIES.authentication.identitySysLogin,
        variables: {credential}
      })
        .pipe(map(response => response?.data?.identitySysLogin)))

      return result
    } catch (err) {
      return null
    }
  }

  logout() {
    this.apollo.mutate<Mutation>({
      mutation: GQL_QUERIES.authentication.identityLogout,
    }).pipe(map(response => response?.data?.identityLogout))
      .subscribe((res) => {
        localStorage.clear()
        this.router.navigateByUrl('/login').then()
      })
  }

  refreshToken() {
    this.commonService.cancelRequests$.next(true)
    const client = new ApolloClient({
      uri: environment.apiGraphQL,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(storageKey.token)
      },
      cache: new InMemoryCache()
    })
    client.mutate<any>({
      mutation: GQL_QUERIES.authentication.refreshToken,
      variables: {refreshToken: localStorage.getItem(storageKey.refresh_token)}
    }).then((res) => {
      this.commonService.cancelRequests$.next(false)
      localStorage.setItem(storageKey.token, res.data.crmUserRefreshToken.accessToken);
      localStorage.setItem(storageKey.refresh_token, res.data.crmUserRefreshToken.refreshToken);
      window.location.reload()
    }).catch(err => {
      localStorage.clear()
      this.router.navigate(['login']);
      this.commonService.cancelRequests$.next(false)
    })
  }

  async identityChangePassword(args: any): Promise<UserResponse | null | undefined> {
    try {
      const result = lastValueFrom(this.apollo.mutate<Mutation>({
        mutation: GQL_QUERIES.authentication.identityChangePassword,
        variables: {arguments: args}
      })
        .pipe(map(response => response?.data?.identityChangePassword)))
      return result
    } catch (err) {
      return null
    }
  }

  /** User web */
  async loginWithPhoneNumber(phone: string, password: string): Promise<UserResponse | null | undefined> {
    const credential = {
      phone: phone?.trim(),
      password: password?.trim()
    }
    try {
      const result = lastValueFrom(this.apollo.mutate<Mutation>({
        mutation: GQL_QUERIES.authentication.identityOfficeLogin,
        variables: {credential}
      })
        .pipe(map(response => response?.data?.identityOfficeLogin)))
      return result
    } catch (err) {
      return null
    }
  }

  async getOfficerUserByToken(): Promise<User | null | undefined> {
    try {
      const result = lastValueFrom(this.apollo.query<Query>({
        query: GQL_QUERIES.authentication.identityProfileGuest,
      })
        .pipe(map(response => response.data.identityProfile)))
      return result
    } catch (err) {
      return null
    }
  }

  async identityGuestGetOtp(phone: string): Promise<OtpResponse | null | undefined> {
    try {
      const result = lastValueFrom(this.apollo.mutate<Mutation>({
        mutation: GQL_QUERIES.authentication.identityGuestGetOtp,
        variables: {phone}
      })
        .pipe(map(response => response?.data?.identityOfficePhoneChallenge)))
      return result
    } catch (err) {
      return null
    }
  }

  async identityGuestVerifyOtp(otp: number, session: string): Promise<UserResponse | null | undefined> {
    try {
      const result = lastValueFrom(this.apollo.mutate<Mutation>({
        mutation: GQL_QUERIES.authentication.identityGuestVerifyOtp,
        variables: {otp, session}
      })
        .pipe(map(response => response?.data?.identityVerifyForgotPassword)))
      return result
    } catch (err) {
      return null
    }
  }

  async identityGuestSetPassword(password: string, token: string): Promise<UserResponse | null | undefined> {
    const clientUpdatePassword = new ApolloClient({
      uri: environment.apiGraphQL,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      cache: new InMemoryCache()
    }) as ApolloClient<any>;
    try {
      this.commonService.setShowGlobalLoading(true)
      return clientUpdatePassword.mutate<Mutation>({
        mutation: GQL_QUERIES.authentication.identityGuestSetPassword,
        variables: {password}
      }).then((response) => {
        this.commonService.setShowGlobalLoading(false)
        return response?.data?.identitySetPassword
      })
        .catch(() => {
          this.commonService.setShowGlobalLoading(false)
          return null
        })
    } catch (err) {
      return null
    }
  }
}
