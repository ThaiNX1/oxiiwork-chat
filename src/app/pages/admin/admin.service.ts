import {Injectable} from "@angular/core";
import {Apollo} from "apollo-angular";
import {AccessPermission, Query} from "../../commons/types";
import {map} from "rxjs/operators";
import {lastValueFrom} from "rxjs";
import {GQL_QUERIES} from "../../core/constants/service-gql";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(
    private apollo: Apollo,
  ) {
  }

  /** Get iam permission */
  async getIamAccessPermission(): Promise<AccessPermission | undefined | null> {
    try {
      const response = await lastValueFrom(this.apollo.query<Query>({
        query: GQL_QUERIES.superAdmin.businessRole.iamAccessGetPermission,
        fetchPolicy: "network-only"
      }).pipe(map(res => res.data.iamAccessGetPermission)))
      return response
    } catch (err) {
      return null
    }
  }
}
