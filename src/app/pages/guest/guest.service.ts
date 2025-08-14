import {inject, Injectable} from "@angular/core";
import {Apollo} from "apollo-angular";
import {
  ChatConversationListResponse,
  ChatMessageListResponse,
  ChatMessageUpdateReadResponse,
  Mutation,
  OfficeChatConversation,
  OfficeChatConversationMember,
  OfficeChatMessage,
  OfficeUser,
  OfficeUserResponse,
  Query
} from "../../commons/types";
import {GQL_QUERIES} from "../../core/constants/service-gql";
import {lastValueFrom} from "rxjs";
import {map} from "rxjs/operators";
import {CommonService} from "../../core/services/common.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  httpClient!: HttpClient
  commonService = inject(CommonService)

  constructor(
    private apollo: Apollo,
    private http: HttpClient,
  ) {
    this.httpClient = http
  }

  getHttp(url: string, hasHeader: boolean = false) {
    this.commonService.setIncludeHttpHeader(hasHeader)
    return this.httpClient.get(url)
  }

  /** Chat */
  async chatConversationList(filters: any): Promise<ChatConversationListResponse | null | undefined> {
    try {
      const response = lastValueFrom(this.apollo.query<Query>({
        query: GQL_QUERIES.guestChat.chatConversationList,
        variables: {filters},
        fetchPolicy: "no-cache"
      })
        .pipe(map(res => res.data?.chatConversationList)))
      return response
    } catch (err) {
      return null
    }
  }

  async chatConversationDetail(conversationId: string, receiverId: string = ''): Promise<OfficeChatConversation | null | undefined> {
    try {
      const response = lastValueFrom(this.apollo.query<Query>({
        query: GQL_QUERIES.guestChat.chatConversationDetail,
        variables: {conversationId, receiverId},
        fetchPolicy: "no-cache"
      })
        .pipe(map(res => res.data?.chatConversationDetail)))
      return response
    } catch (err) {
      return null
    }
  }

  async chatConversationCheckDetail(conversationId: string, receiverId: string = ''): Promise<OfficeChatConversation | null | undefined> {
    try {
      const response = lastValueFrom(this.apollo.query<Query>({
        query: GQL_QUERIES.guestChat.chatConversationCheckDetail,
        variables: {conversationId, receiverId},
        fetchPolicy: "no-cache"
      })
        .pipe(map(res => res.data?.chatConversationDetail)))
      return response
    } catch (err) {
      return null
    }
  }

  async chatMessageList(filters: any): Promise<ChatMessageListResponse | null | undefined> {
    try {
      const response = lastValueFrom(this.apollo.query<Query>({
        query: GQL_QUERIES.guestChat.chatMessageList,
        variables: {filters},
        fetchPolicy: "no-cache"
      })
        .pipe(map(res => res.data?.chatMessageList)))
      return response
    } catch (err) {
      return null
    }
  }

  async chatMessageAdd(args: any, localMessageId: string = ''): Promise<any> {
    try {
      const response = lastValueFrom(this.apollo.mutate<Mutation>({
        mutation: GQL_QUERIES.guestChat.chatMessageAdd,
        variables: {arguments: args},
        fetchPolicy: "no-cache"
      })
        .pipe(map(res => {
          return {
            ...res.data?.chatMessageAdd,
            localMessageId
          }
        })))
      return response
    } catch (err) {
      return null
    }
  }

  async chatMessageReaction(args: any, localMessageId: string = ''): Promise<OfficeChatMessage | null | undefined> {
    try {
      const response = lastValueFrom(this.apollo.mutate<Mutation>({
        mutation: GQL_QUERIES.guestChat.chatMessageUpdateReaction,
        variables: {arguments: args},
        fetchPolicy: "no-cache"
      })
        .pipe(map(res => res.data?.chatMessageUpdateReaction)))
      return response
    } catch (err) {
      return null
    }
  }

  async chatMessageUpdateRead(args: any): Promise<ChatMessageUpdateReadResponse | null | undefined> {
    try {
      const response = lastValueFrom(this.apollo.mutate<Mutation>({
        mutation: GQL_QUERIES.guestChat.chatMessageUpdateRead,
        variables: {arguments: args},
        fetchPolicy: "no-cache"
      })
        .pipe(map(res => res.data?.chatMessageUpdateRead)))
      return response
    } catch (err) {
      return null
    }
  }

  async conversationGetUserList(filter: any): Promise<OfficeUserResponse | null | undefined> {
    try {
      const response = lastValueFrom(this.apollo.query<Query>({
        query: GQL_QUERIES.guestChat.officeListEmployeeOfOrgChart,
        variables: {filter},
        fetchPolicy: "no-cache"
      })
        .pipe(map(res => res.data?.officeListEmployeeOfOrgChart)))
      return response
    } catch (err) {
      return null
    }
  }

  async conversationGetUserFullOrgChartList(filter: any): Promise<OfficeUserResponse | null | undefined> {
    try {
      const response = lastValueFrom(this.apollo.query<Query>({
        query: GQL_QUERIES.guestChat.officeEmployeeFullOrgChartList,
        variables: {filter},
        fetchPolicy: "no-cache"
      })
        .pipe(map(res => res.data?.officeEmployeeFullOrgChartList)))
      return response
    } catch (err) {
      return null
    }
  }

  async conversationGetUserDetail(id: string): Promise<OfficeUser | null | undefined> {
    try {
      const response = lastValueFrom(this.apollo.query<Query>({
        query: GQL_QUERIES.guestChat.officeListEmployeeOfOrgChartDetail,
        variables: {id},
        fetchPolicy: "no-cache"
      })
        .pipe(map(res => res.data?.managementGetEmployee)))
      return response
    } catch (err) {
      return null
    }
  }

  async conversationGroupAdd(args: any): Promise<OfficeChatConversation | null | undefined> {
    try {
      const response = lastValueFrom(this.apollo.mutate<Mutation>({
        mutation: GQL_QUERIES.guestChat.chatGroupAdd,
        variables: {arguments: args},
        fetchPolicy: "no-cache"
      })
        .pipe(map(res => res.data?.chatGroupAdd)))
      return response
    } catch (err) {
      return null
    }
  }

  async conversationGroupEdit(args: any): Promise<OfficeChatConversation | null | undefined> {
    try {
      const response = lastValueFrom(this.apollo.mutate<Mutation>({
        mutation: GQL_QUERIES.guestChat.chatGroupEdit,
        variables: {arguments: args},
        fetchPolicy: "no-cache"
      })
        .pipe(map(res => res.data?.chatGroupEdit)))
      return response
    } catch (err) {
      return null
    }
  }

  async conversationDelete(args: any): Promise<OfficeChatConversationMember | null | undefined> {
    try {
      const response = lastValueFrom(this.apollo.mutate<Mutation>({
        mutation: GQL_QUERIES.guestChat.chatConversationDelete,
        variables: {arguments: args},
        fetchPolicy: "no-cache"
      })
        .pipe(map(res => res.data?.chatConversationDelete)))
      return response
    } catch (err) {
      return null
    }
  }

  async conversationLeave(args: any): Promise<OfficeChatConversation | null | undefined> {
    try {
      const response = lastValueFrom(this.apollo.mutate<Mutation>({
        mutation: GQL_QUERIES.guestChat.chatConversationLeave,
        variables: {arguments: args},
        fetchPolicy: "no-cache"
      })
        .pipe(map(res => res.data?.chatConversationLeave)))
      return response
    } catch (err) {
      return null
    }
  }

  async chatMessageSearch(filters: any): Promise<OfficeChatMessage[] | null | undefined> {
    try {
      const response = lastValueFrom(this.apollo.query<Query>({
        query: GQL_QUERIES.guestChat.chatSearch,
        variables: {filters},
        fetchPolicy: "no-cache"
      })
        .pipe(map(res => res.data?.chatSearch)))
      return response
    } catch (err) {
      return null
    }
  }

  async chatMessageEdit(args: any): Promise<OfficeChatMessage | null | undefined> {
    try {
      const response = lastValueFrom(this.apollo.mutate<Mutation>({
        mutation: GQL_QUERIES.guestChat.chatMessageEdit,
        variables: {arguments: args},
        fetchPolicy: "no-cache"
      })
        .pipe(map(res => res.data?.chatMessageEdit)))
      return response
    } catch (err) {
      return null
    }
  }
}
