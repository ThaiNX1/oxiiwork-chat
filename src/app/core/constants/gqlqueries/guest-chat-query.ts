import {gql} from "apollo-angular";

export const CONVERSATION_LIST = gql`
query chatConversationList($filters: ChatConversationListFilter!) {
  chatConversationList(filters: $filters) {
    total
    conversations {
      id
      groupType
      lastMessageAt
      lastMessageId
      type
      name
      imgUrl
      members {
        id
      }
      lastMessage {
        id
        actionType
        message
        fileName
        type
        mentionTo {
          id
          fullname
        }
        sender {
          id
          fullname
        }
        targetUsers {
          id
          fullname
        }
      }
      personalConversation {
        lastMessageReadId
        unreadCount
      }
    }
  }
}
`;

export const CONVERSATION_DETAIL = gql`
query chatConversationDetail($conversationId: String, $receiverId: String) {
  chatConversationDetail(
    conversationId: $conversationId
    receiverId: $receiverId
  ) {
    id
    groupType
    lastMessageAt
    lastMessageId
    type
    name
    imgUrl
    createdAt
    creator{
      id
      fullname
    }
    lastMessage {
      id
      message
      mentionTo {
        id
        fullname
      }
    }
    personalConversation {
      lastMessageReadId
      unreadCount
    }
    members {
      admin
      user {
        id
        fullname
        departmentName
        titleName
        imageUrls
        code
        phone
        email
      }
    }
  }
}
`;

export const CONVERSATION_CHECK_DETAIL = gql`
query chatConversationDetail($conversationId: String, $receiverId: String) {
  chatConversationDetail(
    conversationId: $conversationId
    receiverId: $receiverId
  ) {
    id
  }
}
`;

export const CONVERSATION_GET_MEMBER_DETAIL = gql`
query chatConversationDetail($conversationId: String, $receiverId: String) {
  chatConversationDetail(
    conversationId: $conversationId
    receiverId: $receiverId
  ) {
    id
    members {
      admin
      user {
        id
        fullname
        departmentName
        titleName
        imageUrls
        code
        phone
        email
      }
    }
  }
}
`;

export const CONVERSATION_GET_MESSAGE = gql`
query chatMessageList($filters: ChatMessageGetListFilter!) {
  chatMessageList(filters: $filters) {
    lastKey {
      conversationId
      createdAt
    }
    messages {
      id
      type
      conversationId
      senderId
      replyMessageId
      forwardedFromMessageId
      createdAt
      editAt
      fileName
      message
      urls
      actionType
      newValue
      oldValue
      targetUsers {
        fullname
      }
      replyMessage{
        id
        type
        message
        urls
        mentionTo {
          fullname
        }
        sender {
          id
          fullname
        }
      }
      sender {
        id
        fullname
        imageUrls
      }
      reactions {
        code
        reactorIds
        reactors{
          fullname
          imageUrls
        }
      }
      mentionTo{
        id
        fullname
      }
    }
  }
}
`;

export const CONVERSATION_SEND_MESSAGE = gql`
mutation chatMessageAdd($arguments: ChatAddMessageInput!) {
  chatMessageAdd(arguments: $arguments) {
    id
    type
    conversationId
    senderId
    replyMessageId
    forwardedFromMessageId
    createdAt
    editAt
    fileName
    message
    urls
    mentionTo {
      id
      fullname
      imageUrls
    }
    replyMessage {
      id
      type
      message
      urls
      mentionTo {
        id
        fullname
        imageUrls
      }
      sender {
        id
        fullname
      }
    }
    sender {
      id
      fullname
      imageUrls
    }
    reactions {
      code
      reactorIds
      reactors{
        fullname
      }
    }
  }
}
`;

export const CONVERSATION_REACTION_MESSAGE = gql`
mutation chatMessageUpdateReaction($arguments: ChatMessageUpdateReactionArgs!) {
  chatMessageUpdateReaction(arguments: $arguments) {
    reactions {
      code
      reactors {
        fullname
      }
    }
  }
}
`;

export const CONVERSATION_GET_USER = gql`
query officeListEmployeeOfOrgChart($filter: UserOrgChartFilter!) {
  officeListEmployeeOfOrgChart(filter: $filter) {
    officeUsers {
      id
      departmentName
      titleName
      fullname
      imageUrls
    }
  }
}
`;

export const CONVERSATION_GET_USER_FULL_ORG_CHART = gql`
query officeEmployeeFullOrgChartList($filter: UserOrgChartFilter!) {
  officeEmployeeFullOrgChartList(filter: $filter) {
    officeUsers {
      id
      departmentName
      titleName
      fullname
      imageUrls
    }
  }
}
`;

export const CONVERSATION_GET_USER_DETAIL = gql`
query managementGetEmployee($id: String!) {
  managementGetEmployee(id: $id) {
    id
    departmentName
    titleName
    fullname
    imageUrls
  }
}
`;

export const CONVERSATION_GROUP_CREATE = gql`
mutation chatGroupAdd($arguments: ChatGroupAddInput!) {
  chatGroupAdd(arguments: $arguments) {
    id
    groupType
    lastMessageAt
    lastMessageId
    type
    name
    lastMessage {
      id
      message
    }
    personalConversation {
      id
      unreadCount
    }
    members {
      id
      unreadCount
    }
  }
}
`;

export const CONVERSATION_GROUP_EDIT = gql`
mutation chatGroupEdit($arguments: ChatGroupEditInput!) {
  chatGroupEdit(arguments: $arguments) {
    id
    groupType
    lastMessageAt
    lastMessageId
    type
    name
    imgUrl
    members {
      admin
      user {
        id
        fullname
        imageUrls
        departmentName
      }
    }
  }
}
`;

export const CONVERSATION_DELETE = gql`
mutation chatConversationDelete($arguments: ChatGroupLeaveArgs!) {
  chatConversationDelete(arguments: $arguments) {
    id
  }
}
`;

export const CONVERSATION_READ_MESSAGE = gql`
mutation chatMessageUpdateRead($arguments: ChatMessageUpdateReadArgs!) {
  chatMessageUpdateRead(arguments: $arguments) {
    conversationId
  }
}
`;

export const CONVERSATION_LEAVE = gql`
mutation chatConversationLeave($arguments: ChatGroupLeaveArgs!) {
  chatConversationLeave(arguments: $arguments) {
    id
  }
}
`;

export const CONVERSATION_SEARCH_MESSAGE = gql`
query chatSearch($filters: ChatSearchArgs!) {
  chatSearch(filters: $filters) {
    id
    type
    senderId
    createdAt
    editAt
    fileName
    message
    urls
    sender {
      id
      fullname
      imageUrls
    }
  }
}
`;

export const CONVERSATION_EDIT_MESSAGE = gql`
mutation chatMessageEdit ($arguments: ChatMessageUpdateArgs!) {
  chatMessageEdit (arguments: $arguments) {
    id
    type
    senderId
    createdAt
    editAt
    fileName
    message
    urls
    sender {
      id
      fullname
      imageUrls
    }
  }
}
`;

export const GUEST_IAM_NOTIFICATION = gql`
mutation iamNotificationSubscribe($deviceToken: String!) {
  iamNotificationSubscribe(deviceToken: $deviceToken) {
    userId
    deviceToken
    updatedAt
  }
}
`;
