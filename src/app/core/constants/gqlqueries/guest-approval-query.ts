import { gql } from "apollo-angular";
export const CREATE_TASK = gql`
mutation officeTaskCreate($arguments: TaskCreateInput!) {
  officeTaskCreate(arguments: $arguments) {
    createdAt
        createdBy
        description
        doneAt
        finishTime
        id
        key
        no
        priority
        startTime
        status
        title
        updatedAt
        updatedBy
        assigned {
            age
            attachFileUrls
            code
            createdAt
            createdBy
            dateOfBirth
            email
            fullname
            hrCode
            id
            idCardIssuedOn
            idCardIssuedPlace
            identityCard
            imageUrls
            lastLoginAt
            lastWorkingOn
            leaveOn
            major
            no
            note
            officalWorkingOn
            onboardingOn
            personalEmail
            phone
            relativePhone
            resignationDetailReason
            resignationReason
            resignationType
            resigned
            rtcUserId
            seniority
            socialInsuranceCode
            status
            taxCode
            updatedAt
            updatedBy
        }
        comments {
            createdAt
            createdBy
            description
            id
            type
            updatedAt
            updatedBy
        }
    }
  }
`;

export const EDIT_TASK = gql`
mutation officeTaskUpdate($arguments: TaskUpdateInput!) {
  officeTaskUpdate(arguments: $arguments) {
          assignees {
                    fullname
                    id
                    code
                  }
          isLate
          taskKind
            childrenTask {
              title
              id
              key
              status
              taskType
              taskKind
            }
            createdAt
            createdBy
            description
            doneAt
            finishTime
            id
            key
            no
            creator {
              fullname
              id
              code
            }
            priority
            startTime
            status
            title
            updatedAt
            updatedBy
            attachmentUrls
            taskType
            config {
              createdAt
              createdBy
              endAt
              monthDays
              id
              periodType
              relationData
              startAt
              startTimeIn
              timeZone
              updatedAt
              updatedBy
              weekDays
            }
            assigned {
              id
             fullname
             email
             code
            }
            reporter {
            id
             fullname
             email
           }
           watchers {
            id
             fullname
             email
             code
           }
           histories {
           createdAt
           description
           id
           logs {
           note
           actionAt
           field
           newValue
           oldValue
           action
           }
           creator {
           id
           email
            fullname
           }
           }
           attachments {
           id
           name
           location
           size
           mimetype
           createdAt
           }
           comments {
           attachments {
            id
            location
            mimetype
            name
            size
           }
           updatedAt
           id
           description
           createdAt
           createdBy
           creator {
            id
           fullname
           }
      }
  }
}
`;

export const EDIT_STATUS_TASK = gql`
mutation officeTaskStatusUpdate($arguments: TaskStatusUpdateInput!) {
  officeTaskStatusUpdate(arguments: $arguments) {
    assignees {
              fullname
              id
              code
            }
    isLate
    taskKind
            childrenTask {
              title
              id
              key
              status
              taskType
              taskKind
            }
            createdAt
            createdBy
            description
            doneAt
            finishTime
            id
            key
            no
            creator {
              id
              fullname
              code
            }
            priority
            startTime
            status
            title
            updatedAt
            updatedBy
            attachmentUrls
            taskType
            config {
              createdAt
              createdBy
              endAt
              monthDays
              id
              periodType
              relationData
              startAt
              startTimeIn
              timeZone
              updatedAt
              updatedBy
              weekDays
            }
            assigned {
              id
             fullname
             email
             code
            }
            reporter {
            id
             fullname
             email
           }
           watchers {
            id
             fullname
             email
             code
           }
           histories {
           createdAt
           description
           id
           logs {
            note
           actionAt
           field
           newValue
           oldValue
           action
           }
           creator {
           id
           email
            fullname
           }
           }
           attachments {
           id
           name
           location
           size
           mimetype
           createdAt
           }
           comments {
           attachments {
            id
            location
            mimetype
            name
            size
           }
           updatedAt
           id
           description
           createdAt
           createdBy
           creator {
            id
           fullname
           }
      }
  }
}
`;

export const TASK_LIST = gql`
query officeTaskList($filter: TaskListFilter) {
  officeTaskList(filter: $filter) {
    total
    count
    records {
      title
      id
      key
      status
      taskType
      isLate
      taskKind
      priority
      startTime
      finishTime
      config {
        startAt
        endAt
      }
    }
    statistics {
      count
      status
    }
  }
}
`;

export const TASK_GET = gql`
query officeTaskGet($id: String!) {
  officeTaskGet(id: $id) {
    taskKind
      childrenTask {
        title
        id
        key
        status
        taskType
        taskKind
      }
      assignees {
        fullname
        id
        code
      }
      isLate
      createdAt
      createdBy
      description
      doneAt
      finishTime
      id
      key
      no
      priority
      startTime
      status
      title
      updatedAt
      updatedBy
      attachmentUrls
      taskType
      creator {
        id
        fullname
        code
      }
      config {
        createdAt
        createdBy
        endAt
        monthDays
        id
        periodType
        relationData
        startAt
        startTimeIn
        timeZone
        updatedAt
        updatedBy
        weekDays
      }
      assigned {
        id
        fullname
        email
        code
      }
      reporter {
        id
        fullname
        email
      }
      watchers {
        id
        fullname
        email
        code
      }
      histories {
        createdAt
        description
        id
        logs {
          note
          actionAt
          field
          newValue
          oldValue
          action
        }
        creator {
          id
          email
          fullname
        }
      }
      attachments {
        id
        name
        location
        size
        mimetype
        createdAt
      }
      comments {
        attachments {
          id
          location
          mimetype
          name
          size
        }
        updatedAt
        id
        description
        createdAt
        createdBy
        creator {
          fullname
        }
      }
  }
}
`;

export const WIKI_GET = gql`
query officeWikiGet($id: String!) {
  officeWikiGet(id: $id) {
    id
    important
    name
    code
    categories {
      name
    }
    viewCount
    folder {
      name
    }
    versions {
      tags {
        id
        name
      }
      isLatestVersion
      updatedAt
      userCreator {
        fullname
      }
      status
      versionTitle
      content
      id
      name
      createdAt
      thumbnails {
        location
        name
      }
      attachments {
          location
          name
          id
          size
          mimetype
      }
      comments {
        description
        attachments {
          location
          name
          size
        }
        createdAt
        creator {
          fullname
          imageUrls
        }
      }
    }
    latestVersion {
      content
      id
      name
      createdAt
      thumbnails {
        location
        name
      }
      tags {
        id
        name
      }
      comments {
        description
        attachments {
          location
          name
          size
        }
        creator {
          fullname
          imageUrls
        }
      }
    }
  }
}
`;


export const GUEST_APPROVAL_LIST = gql`
query officeGetApprovalList($filter: ApprovalFilter) {
  officeGetApprovalList(filter: $filter) {
    total
    count
    approvals {
      id
      isRead
      code
      name
      createdAt
      status
      yourAction
      note
      type
      steps {
      id
      currentStep
      action
      actionAt
      approveBy
      approverLevel
      approvalAction
      order
      comment
      imageUrls
      attachmentUrls
      actionUser {
        id
        code
        fullname
        imageUrls
      }
      approvers {
        id
        code
        fullname
        imageUrls
      }
      consentUsers {
        id
        code
        fullname
        imageUrls
      }
      approvedRows {
        id
        status
        data {
          textValue
        }
      }
    }
      comments {
      id
      description
      createdBy
      attachments {
      id
      name
      location
      mimetype
      size
      }
      images {
       id
      name
      location
      mimetype
      size
      }
      updatedAt
      userCreator {
      id
      fullname
      }
      }
      requester {
        id
        fullname
        imageUrls
        departments{
          title{
            id
            name
          }
          department{
            id
            name
          }
        }
      }
      shoppingRequest {
        name
        expectedCost
      }
      carBookingRequest {
        note
        code
        car {
          id
          model
          plateNumber
          color
        }
      }
      roomBookingRequest {
        code
        startAt
        endAt
        note
        meetingContent
        room {
          id
          name
          color
        }
      }
    }
  }
}
`;

export const GUEST_APPROVAL_FILTER_LIST = gql`
query officeApprovalFilterList($filter: ApprovalFilterListFilter) {
  officeApprovalFilterList(filter: $filter) {
    total
    count
    records {
      id
      code
      name
      filter
      approvals {
        id
        code
        fullname
      }
      creators {
        id
        code
        fullname
      }
    }
  }
}
`;

export const GUEST_TASK_FILTER_LIST = gql`
query officeTaskFilterList($filter: TaskFilterList) {
  officeTaskFilterList(filter: $filter) {
    total
    count
    records {
      id
      code
      name
      filter
      dataExplains
      approvals {
        id
        code
        fullname
      }
      creators {
        id
        code
        fullname
      }
    }
  }
}
`;

export const GUEST_TASK_REPORT_CONFIG_LIST = gql`
query officeTaskReportConfigList($filter: TaskReportConfigList) {
  officeTaskReportConfigList(filter: $filter) {
    total
    count
    records {
      id
      title
    }
  }
}
`;

export const GUEST_APPROVAL_DETAIL = gql`
query officeGetApproval($id: String!) {
  officeGetApproval(id: $id) {
    id
    code
    name
    source
    formId
    versionWikiApproval {
        code
        categories {
          name
        }
        content
        createdAt
        createdBy
        id
        isLatestVersion
        isPublic
        name
        no
        tags {
          name
        }
        thumbnails {
          name
          location
        }
        attachments {
          id
          name
          location
          mimetype
          size
        }
        status
        updateType
        updatedAt
        updatedBy
        version
        versionTitle
        comments {
            createdAt
            createdBy
            creatorRole
            description
            id
            status
            type
            updatedAt
            updatedBy
            creator {
              fullname
            }
        }
    }
    forward {
      creator {
        id
        fullname
        imageUrls
        optionTitle
        departments{
          department{
            code
            name
          }
          title {
            name
          }
        }
      }
      createdBy
      originApproval {
        id
        status
        name
        createdAt
        requester {
          imageUrls
          fullname
        }
      }
      users {
        user {
          id
          fullname
          imageUrls
          optionTitle
        }
        showItems
      }
    }
    history {
      createdAt
      creator {
        fullname
      }
      logs {
        field
        newValue
        oldValue
        note
        actionAt
        action
      }
    }
    attachments {
      id
      name
      location
      mimetype
      size
    }
    images {
      id
      name
      location
      mimetype
      size
    }
    subcribers {
      fullname
      code
      id
      optionTitle
    }
    subscribersDefault {
      id
    }
    subscriberIds
    createdAt
    status
    yourAction
    note
    type
    attachmentUrls
    comments {
     attachments {
      id
      name
      mimetype
      location
      size
      }
      images {
       id
      name
      location
      mimetype
      size
      }
 id
 description
 createdAt
 creator {
 id
 fullname
 email
 optionTitle
 }
 userCreator {
 id
 fullname
 email
 optionTitle
 }
 }
    imageUrls
    requester {
      id
      fullname
      imageUrls
      departments{
        department{
          code
          name
        }
        title {
          name
        }
      }
    }
    shoppingRequest {
      id
      code
      name
      expectedCost
      note
    }
    carBookingRequest {
      note
      code
      startAt
      endAt
      car {
        id
        model
        plateNumber
        color
      }
      fromAddress
      toAddress
    }
    roomBookingRequest {
      code
      startAt
      endAt
      note
      meetingContent
      equiments
      logistics
      note
      repeatedDays
      repeatedEndAt
      room {
        id
        name
        color
        capacity
        orgChart {
          id
          name
        }
      }
      host {
        id
        fullname
        departments {
          title {
            id
            name
          }
        }
      }
      participants {
        id
        fullname
      }
    }
    fields {
      id
      name
      dataType
      dateValue
      listValues
      textValue
      optionItems
      multiSelect
      order
      required
      tableColumns
      tableRows {
        id
        status
        data {
          textValue
        }
      }
      timeInPast
    }
    steps {
      id
      currentStep
      action
      actionAt
      approveBy
      approverLevel
      approvalAction
      order
      comment
      imageUrls
      attachmentUrls
      actionUser {
        id
        code
        fullname
        imageUrls
        optionTitle
      }
      approvers {
        id
        code
        fullname
        imageUrls
        optionTitle
      }
      consentUsers {
        id
        code
        fullname
        imageUrls
        optionTitle
      }
      approvedRows {
        id
        status
        data {
          textValue
        }
      }
    }
  }
}
`;

export const GUEST_APPROVAL_FILTER_GET = gql`
query officeApprovalFilterGet($id: String) {
  officeApprovalFilterGet(id: $id) {
    code
    name
    id
    filter
  }
}
`;

export const GUEST_APPROVAL_REQUEST = gql`
mutation officeRequestApproval($arguments: ApprovalArgs!) {
  officeRequestApproval(arguments: $arguments) {
    id
    no
    name
  }
}
`;

export const GUEST_APPROVAL_REQUEST_UPDATE = gql`
mutation officeApprovalUpdate($arguments: ApprovalUpdateInput!) {
  officeApprovalUpdate(arguments: $arguments) {
    id
    no
    name
  }
}
`;

export const GUEST_APPROVAL_SUBSCRIBER_UPDATE = gql`
mutation officeApprovalSubscriberUpdate($arguments: ApprovalSubscriberUpdateInput!) {
  officeApprovalSubscriberUpdate(arguments: $arguments) {
    id
    no
    name
  }
}
`;

export const GUEST_APPROVAL_FILTER_CREATE = gql`
mutation officeApprovalFilterCreate($args: ApprovalFilterCreateInput!) {
  officeApprovalFilterCreate(args: $args) {
    id
    code
    name
    filter
  }
}
`;

export const GUEST_APPROVAL_STEP_UPDATE = gql`
mutation officeApprovalApproveStepUpdate($arguments: ApprovalApproveStepUpdateInput!) {
  officeApprovalApproveStepUpdate(arguments: $arguments) {
    id
  }
}
`;

export const GUEST_APPROVAL_FILTER_UPDATE = gql`
mutation officeApprovalFilterUpdate($args: ApprovalFilterUpdateInput!) {
  officeApprovalFilterUpdate(args: $args) {
    id
    code
    name
    filter
  }
}
`;

export const GUEST_APPROVAL_REMOVE = gql`
mutation officeApprovalRemove($id: String!) {
  officeApprovalRemove(id: $id) {
    id
    no
    name
  }
}
`;

export const GUEST_TASK_FILTER_CREATE = gql`
mutation officeTaskFilterCreate($args: TaskFilterCreateInput!) {
  officeTaskFilterCreate(args: $args) {
    id
    code
    name
    filter
    dataExplains
  }
}
`;

export const GUEST_TASK_FILTER_UPDATE = gql`
mutation officeTaskFilterUpdate($args: TaskFilterUpdateInput!) {
  officeTaskFilterUpdate(args: $args) {
    id
    code
    name
    filter
    dataExplains
  }
}
`;

export const GUEST_TASK_FILTER_REMOVE = gql`
mutation officeTaskFilterRemove($id: String!) {
  officeTaskFilterRemove(id: $id) {
    id
    name
  }
}
`;

export const GUEST_APPROVAL_FILTER_REMOVE = gql`
mutation officeApprovalFilterRemove($id: String!) {
  officeApprovalFilterRemove(id: $id) {
    id
    code
    name
  }
}
`;

export const GUEST_OFFICE_SHOPPING_APPROVAL_REQUEST = gql`
mutation officeShoppingRequest($arguments: ShoppingRequestArgs!) {
  officeShoppingRequest(arguments: $arguments) {
    id
    no
    name
  }
}
`;

export const GUEST_APPROVAL_UPDATE = gql`
mutation officeUpdateApprovalAction($arguments: ApprovalActionArgs!) {
  officeUpdateApprovalAction(arguments: $arguments) {
    id
    currentStep
    action
    actionAt
    order
    comment
    approvalAction
    order
    comment
    imageUrls
    attachmentUrls
    actionUser {
      id
      code
      fullname
      imageUrls
    }
    approvers {
      id
      code
      fullname
      imageUrls
    }
    consentUsers {
      id
      code
      fullname
      imageUrls
    }
  }
}
`;

export const GUEST_CAR_BOOKING_REQUEST = gql`
mutation officeCarBookingRequest($arguments:OfficeBookingCarArgs!){
  officeCarBookingRequest(arguments:$arguments){
    id
    no
    approvalId
  }
}
`;

export const GUEST_CAR_BOOKING_UPDATE = gql`
mutation officeCarBookingScheduleUpdate($arguments:CarBookingScheduleUpdateInput!){
  officeCarBookingScheduleUpdate(arguments:$arguments){
    id
  }
}
`;

export const GUEST_CAR_BOOKING_REMOVE = gql`
mutation officeCarBookingScheduleRemove($arguments:CarBookingScheduleRemoveInput!){
  officeCarBookingScheduleRemove(arguments:$arguments)
}
`;

export const GUEST_CAR_BOOKING_SCHEDULE_LIST = gql`
query officeCarBookingGetScheduleList($filter: CarBookingScheduleFilter) {
  officeCarBookingGetScheduleList(filter: $filter) {
    total
    count
    schedules {
      id
      bookingRequest {
        id
        code
        fromAddress
        toAddress
        status
        startAt
        endAt
        note
        requester {
          fullname
          imageUrls
        }
      }
      car {
        id
        code
        model
        plateNumber
        color
        approvalForm {
          fields {
            name
            dataType
            required
            order
            optionItems
            hintText
            timeInPast
            multiSelect
          }
        }
        driver {
          id
          fullname
        }
      }
      startAt
      createdAt
      endAt
      remindAt
      requestId
      fromAddress
      toAddress
      note
    }
  }
}
`;

export const GUEST_CAR_BOOKING_SCHEDULE_DETAIL = gql`
query officeCarBookingGetSchedule($id: String!) {
  officeCarBookingGetSchedule(id: $id) {
    id
    car {
      id
      code
      plateNumber
    }
    startAt
    endAt
    remindAt
    requestId
  }
}
`;

export const GUEST_MEETING_ROOM_BOOKING_REQUEST = gql`
mutation officeBookMeetingRoom($arguments: BookMeetingRoomArgs!) {
  officeBookMeetingRoom(arguments: $arguments) {
    booking {
      id
      no
      code
    }
  }
}
`;
export const GUEST_MEETING_ROOM_BOOKING_REMOVE = gql`
mutation officeBookingMeetingRoomScheduleRemove($arguments: BookingScheduleRemoveInput!) {
  officeBookingMeetingRoomScheduleRemove(arguments: $arguments)
}
`;
export const GUEST_AVATAR_UPDATE = gql`
mutation officeEmployeeAvatarUpdate($arguments: OfficeEmployeeAvatarUpdateInput!) {
  officeEmployeeAvatarUpdate(arguments: $arguments) {
    location
  }
}
`;

// old
export const UPDATE_MEETING_ROOM_BOOKING_REQUEST = gql`
mutation officeUpdateBookingMeetingRoom($arguments: UpdateBookingMeetingRoomArgs!) {
  officeUpdateBookingMeetingRoom(arguments: $arguments) {
    booking {
      id
      no
      code
    }
  }
}
`;

export const GUEST_MEETING_ROOM_BOOKING_UPDATE = gql`
mutation officeBookingScheduleUpdate($arguments: BookingScheduleUpdateInput!) {
  officeBookingScheduleUpdate(arguments: $arguments) {
    booking {
      id
      no
      code
    }
  }
}
`;

export const UPDATE_NOTIFY_BOOKING_REQUEST = gql`
mutation managementUpdateNotifyBookingMeetingRoom($arguments: NotificationBookingMeetingRoomArgs!) {
  managementUpdateNotifyBookingMeetingRoom(arguments: $arguments) {
  id
  }
}
`;

export const GUEST_MEETING_ROOM_BOOKING_SCHEDULE_LIST = gql`
query officeGetMeetingSchedule($arguments: QueryBookingMeetingRoomArgs!) {
  officeGetMeetingSchedule(arguments: $arguments) {
    total
    meetings {
      id
      startAt
      endAt
      createdAt
      equiments
      logistics
      note
      quantity
      meetingContent
      participants {
        id
        code
        fullname
        optionTitle
      }
      host {
        id
        code
        fullname
        optionTitle
      }
      notify {
        content
        id
        endAt
        monthDays
        startAt
        startTimeInMinutes
        title
        type
      }
      booking {
        id
        code
        meetingContent
        startAt
        endAt
        status
        repeatedDays
        repeatedEndAt
        note
        logistics
        equiments
        orgChart {
        name
        id
        }
        notify {
        content
        id
        endAt
        monthDays
        startAt
        startTimeInMinutes
        title
        type
        }
        host {
          id
          fullname
          optionTitle
          departments{
            title{
              code
              name
            }
          }
        }
        bookedBy {
          id
          fullname
        }
        participants {
          id
          fullname
        }
        bookedBy{
          fullname
          imageUrls
        }
      }
      meetingRoom {
        id
        approvalFormId
        name
        code
        status
        color
        capacity
        orgChart {
          id
          code
          name
        }
      }
    }
  }
}
`;

export const GUEST_MEETING_ROOM_BOOKING_TODAY_LIST = gql`
query officeGetMeetingSchedule($arguments: QueryBookingMeetingRoomArgs!) {
  officeGetMeetingSchedule(arguments: $arguments) {
    total
    meetings {
      id
      startAt
      endAt
      booking {
        id
        meetingContent
        status
      }
      meetingRoom {
        name
        color
      }
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

export const GUEST_NOTIFICATION_GET_LIST = gql`
query notificationGetList($filter: AppNotificationFilterArgs) {
  notificationGetList(filter: $filter) {
    total
    count
    notifications {
      id
      createdAt
      type
      title
      isRead
      content
    }
  }
}
`;

export const GUEST_NOTIFICATION_DETAIL = gql`
mutation appNotificationGetDetail($id: String!) {
  appNotificationGetDetail(id: $id) {
    id
    createdAt
    type
    title
    isRead
    content
    image
    type
    images {
      name
      location
    }
    attachFiles {
      id
      name
      mimetype
      size
      createdAt
    }
    sender {
      avatar {
        location
      }
      fullname
    }
      metadata
  }
}
`;

export const GUEST_NOTIFICATION_UPDATE = gql`
mutation appNotificationUpdate($arguments: AppNotificationUpdateArgs!) {
  appNotificationUpdate(arguments: $arguments) {
    id
    createdAt
    type
    title
    isRead
  }
}
`;

export const GUEST_NOTIFICATION_UPDATE_ALL = gql`
mutation appNotificationUpdateAll($arguments: AppNotificationUpdateAllArgs!) {
  appNotificationUpdateAll(arguments: $arguments) {
    total
    count
  }
}
`;

export const GUEST_NOTIFICATION_REMOVE = gql`
mutation appNotificationRemove($id: String!) {
  appNotificationRemove(id: $id) {
    id
    createdAt
    type
    title
    isRead
  }
}
`;

export const GUEST_NOTIFICATION_UNREAD_COUNT = gql`
query identityProfile {
  identityProfile {
    id
    unreadNotificationCount
  }
}
`;

export const GUEST_PAYSLIP = gql`
query officeUserPaycheckList($filters: UserPaycheckListFilter!) {
  officeUserPaycheckList(filters: $filters) {
    total
    count
    userPaychecks {
      id
      name
      month
      code
      wage
      currency
      comments {
      id
      type
      description
      updatedAt
      createdBy
       attachments {
      id
      name
      location
      mimetype
      size
      }
      images {
       id
      name
      location
      mimetype
      size
      }
      creator {
      id
      fullname
      }
      }
      infoBlocks {
        id
        code
        name
        officeUserExtraData
        fields{
          id
          code
          dataType
          name
          value
        }
      }
    }
  }
}
`;
export const CREATE_COMMENT = gql`
mutation officeTaskCommentCreate($arguments: TaskCommentCreate!) {
  officeTaskCommentCreate(arguments: $arguments) {
    id
    task {
    id
    comments {
    attachments {
            id
            location
            mimetype
            name
            size
           }
      id
      description
      createdAt
      updatedAt
      createdBy
      creator {
            fullname
            }
      }
    }
  }
  }
`;
export const UPDATE_COMMENT = gql`
mutation officeTaskCommentUpdate($arguments: TaskCommentUpdate!) {
  officeTaskCommentUpdate(arguments: $arguments) {
    id
    task {
    id
    comments {
    id
    description
    createdAt
    updatedAt
    createdBy
     creator {
           fullname
           }
    }
    }
  }
  }
`;

export const CREATE_COMMENT_APPROVE = gql`
mutation officeApprovalCommentCreate($arguments: ApprovalCommentCreate!) {
  officeApprovalCommentCreate(arguments: $arguments) {
    id
 comments {
  attachments {
      id
      name
      location
      mimetype
      size
      }
      images {
       id
      name
      location
      mimetype
      size
      }
 id
 description
 createdAt
 creator {
 id
 fullname
 email
 }
 userCreator {
 id
 fullname
 email
 }
 }
  }
  }
`;

export const OFFICE_VERSION_WIKI_COMMENT = gql`
mutation officeVersionWikiComment($arguments: VersionWikiCommentCreateInput!) {
  officeVersionWikiComment(arguments: $arguments) {
    id
    name
    comments {
      description
    }
  }
}
`;

export const NOTIFY_BOOKING_REQUEST = gql`
mutation managementUpdateNotifyBookingMeetingRoom($arguments: NotificationBookingMeetingRoomArgs!) {
  managementUpdateNotifyBookingMeetingRoom(arguments: $arguments)
}
`;
export const APPROVAL_FORM_GET_LIST = gql`
query officeApprovalFormGetList($filter: ApprovalFormFilter ) {
  officeApprovalFormGetList(filter: $filter) {
    total
    count
    approvalForms {
            id
            name
           }
    }
  }
`;

export const OFFICE_WIKI_LIST = gql`
query officeWikiList($filter: OfficeWikiFilter ) {
  officeWikiList(filter: $filter) {
      total
      count
      records {
        id
        name
        folder {
          name
        }
        categories {
          name
        }
        latestVersion {
          content
          id
          name
          createdAt
          updatedAt
          thumbnails {
            location
            name
          }
        }
      }
    }
  }
`;
export const OFFICE_DOCUMENT_TAG_LIST = gql`
query officeDocumentTagList($filter: DocumentTagFilterInput ) {
  officeDocumentTagList(filter: $filter) {
      total
      count
      records {
        id
        name
      }
    }
  }
`;
export const OFFICE_WIKI_LASTEST_LIST = gql`
query officeWikiLatestList {
  officeWikiLatestList {
      total
      count
      records {
        id
        name
        folder {
          name
        }
        categories {
          name
        }
        latestVersion {
          content
          id
          name
          createdAt
          thumbnails {
            location
            name
          }
        }
      }
    }
  }
`;
export const CREATE_COMMENT_PAY_SLIP = gql`
mutation userPaycheckCommentCreate($arguments: UserPaycheckCommentCreate!) {
  userPaycheckCommentCreate(arguments: $arguments) {
    id
   comments {
    id
    description
    createdAt
    updatedAt
    createdBy
    attachments {
      id
      name
      location
      mimetype
      size
      }
      images {
       id
      name
      location
      mimetype
      size
      }
     creator {
           fullname
           id
           updatedAt
           }
    }
    updatedAt
  }
  }
`;
