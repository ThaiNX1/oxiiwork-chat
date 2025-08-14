import {inject, Injectable} from "@angular/core";
import {CommonService} from "../core/services/common.service";
import {Router} from "@angular/router";
import {ApolloClient, InMemoryCache} from "@apollo/client/core";
import {environment} from "../../environments/environment";
import {storageKey} from "../core/constants/storage-key";
import {GQL_QUERIES} from "../core/constants/service-gql";

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {
  commonService = inject(CommonService)
  router = inject(Router)

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
      // this.commonService.cancelRequests$.next(false)
      localStorage.setItem(storageKey.token, res.data.crmUserRefreshToken.accessToken);
      localStorage.setItem(storageKey.refresh_token, res.data.crmUserRefreshToken.refreshToken);
      window.location.reload()
    }).catch(err => {
      localStorage.clear()
      this.router.navigate(['login']);
      this.commonService.cancelRequests$.next(false)
    })
  }
}
