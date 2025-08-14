import {gql} from "apollo-angular";

export const UPDATE_PAYROLL = gql`
mutation managementUserPaycheckUpdate($arguments: UserPaycheckUpdateInput!) {
  managementUserPaycheckUpdate(arguments: $arguments) {
    id
    code 
    wage
    year
    month
    updatedAt
  }
}
`;

export const CREATE_PAYROLL = gql`
mutation managementUserPaycheckCreate($arguments: UserPaycheckCreateInput!) {
  managementUserPaycheckCreate(arguments: $arguments) {
    id
    code 
    wage
    year
    month
    updatedAt
  }
}
`;

export const PAYROLL_LIST = gql`
query managementPayrollList($filter: PayrollListFilter!) {
  managementPayrollList(filter: $filter) {
    total
    count
    payrolls {
      id
      name
      code
    }
  }
}
`;

export const OFFICE_MANAGEMENT_APPROVAL_FORM_LIST = gql`
query officeApprovalFormGetList($filter: ApprovalFormFilter) {
  officeApprovalFormGetList(filter: $filter) {
    total
    count
    approvalForms{
      id
      name
      note
      status
      type
      departments{
        id
        code
        name
      }
    }
  }
}
`;

export const OFFICE_MANAGEMENT_APPROVAL_FORM_DETAIL = gql`
query officeApprovalGetForm($id: String!) {
  officeApprovalGetForm(id: $id) {
    id
    name
    note
    status
    type
    users {
      id
      fullname
    }
    departments {
      id
      code
      name
      level
    }
    fields {
      id
      name
      dataType
      hintText
      order
      required
      timeInPast
      multiSelect
      optionItems
      columns{
        name
        required
        order
      }
    }
    steps {
      id
      action
      order
      unit
      approveBy
      approverLevel
      approvers {
        id
        code
        fullname
      }
      consentBy
      consentUsers {
        id
        code
        fullname
      }
      departmentId
      department {
        id
        code
        name
      }
    }
    subscriberIds
    subcribers {
      id
      code
      fullname
    }
  }
}
`;

export const OFFICE_MANAGEMENT_ADD_APPROVAL_FORM = gql`
mutation officeApprovalAddForm($arguments: ApprovalFormArgs!) {
  officeApprovalAddForm(arguments: $arguments) {
    id
    name
    note
  }
}
`;

export const OFFICE_MANAGEMENT_EDIT_APPROVAL_FORM = gql`
mutation officeApprovalEditForm($arguments: EditApprovalFormArgs!) {
  officeApprovalEditForm(arguments: $arguments) {
    id
    name
    note
  }
}
`;

export const OFFICE_MANAGEMENT_DOCUMENT_UPLOAD_FILE = gql`
mutation documentUploadFile($file: Upload!,$folderId: String!,$override: Boolean!) {
  documentUploadFile(file: $file,folderId: $folderId,override: $override) {
    id
    name
    folderId
    location
  }
}
`;

export const OFFICE_MANAGEMENT_DOCUMENT_COPY_FILE = gql`
mutation documentCopyFile($fileId: String!,$folderId: String!,$override: Boolean!) {
  documentCopyFile(fileId: $fileId,folderId: $folderId,override: $override) {
    id
    name
    folderId
    location
  }
}
`;

export const OFFICE_MANAGEMENT_DOCUMENT_MOVE_FILE = gql`
mutation documentMoveFile($fileId: String!,$folderId: String!,$override: Boolean!) {
  documentMoveFile(fileId: $fileId,folderId: $folderId,override: $override) {
    id
    name
    folderId
    location
  }
}
`;

export const OFFICE_MANAGEMENT_DOCUMENT_DELETE_FILE = gql`
mutation documentDeleteFile($fileId: String!) {
  documentDeleteFile(fileId: $fileId) {
    id
    name
    folderId
    location
  }
}
`;

export const OFFICE_MANAGEMENT_DOCUMENT_GET_FILE = gql`
query documentGetFile($id: String!) {
  documentGetFile(id: $id) {
    id
    name
    folderId
    location
    url
  }
}
`;

export const OFFICE_MANAGEMENT_DOCUMENT_ADD_FOLDER = gql`
mutation documentAddFolder($arguments: DocumentFolderArgs!) {
  documentAddFolder(arguments: $arguments) {
    id
    name
    pathName
    parentId
  }
}
`;

export const OFFICE_MANAGEMENT_DOCUMENT_EDIT_FOLDER = gql`
mutation documentEditFolder($arguments: EditDocumentFolderArgs!) {
  documentEditFolder(arguments: $arguments) {
    id
    name
    parentId
    parentFolder {
      id
      name
    }
    pathName
    note
    scope
    departments {
      id
      code
      name
    }
  }
}
`;

export const OFFICE_MANAGEMENT_DOCUMENT_DELETE_FOLDER = gql`
mutation documentDeleteFolder($folderId: String!) {
  documentDeleteFolder(folderId: $folderId) {
    id
    name
    pathName
    parentId
  }
}
`;

export const OFFICE_MANAGEMENT_DOCUMENT_GET_FOLDER = gql`
query documentGetFolder($id: String!) {
  documentGetFolder(id: $id) {
    id
    name
    parentId
    parentFolder{
      id
      name
    }
    pathName
    departments{
      id
      code
      name
    }
  }
}
`;

export const OFFICE_MANAGEMENT_DOCUMENT_GET_FOLDER_TREE = gql`
query documentFolderTree($parentId: String!) {
  documentFolderTree(parentId: $parentId) {
    total
    count
    folders{
      id
      name
      parentId
      parentFolder{
        id
        name
      }
      pathName
      note
      scope
      departments{
        id
        code
        name
      }
    }
  }
}
`;

export const OFFICE_MANAGEMENT_DOCUMENT_GET_FOLDER_ELEMENTS = gql`
query documentFolderElements($filter: DocumentElementFilter,$folderId: String!,$order: DocumentOrderBy) {
  documentFolderElements(filter: $filter,folderId: $folderId,order: $order) {
    total
    count
    elements{
      id
      name
      size
      mimetype
      modifiedAt
      type
      url
      pathName
    }
  }
}
`;

export const OFFICE_MANAGEMENT_DOCUMENT_SEARCH_FOLDER_ELEMENTS = gql`
query documentSearchElements($filter: DocumentElementFilter,$folderId: String!,$order: DocumentOrderBy) {
  documentSearchElements(filter: $filter,folderId: $folderId,order: $order) {
    total
    count
    elements{
      id
      name
      size
      mimetype
      modifiedAt
      type
      url
      path
      pathName
    }
  }
}
`;

export const OFFICE_MANAGEMENT_CHECK_IN_OUT_WHITE_LIST_GET_IPS = gql`
query whitelistGetIPs($filter: WhitelistIPFilter) {
  whitelistGetIPs(filter: $filter) {
    total
    count
    publicIps{
      id
      publicIp
      type
    }
  }
}
`;

export const OFFICE_MANAGEMENT_CHECK_IN_OUT_WHITE_LIST_ADD_IP = gql`
mutation whitelistAddIP($publicIPs: [PublicIpArgs!]!) {
  whitelistAddIP(publicIPs: $publicIPs) {
    total
    existedCount
    existedIPs
    insertedCount
    insertedIPs{
      id
      publicIp
      type
    }
  }
}
`;

export const OFFICE_MANAGEMENT_CHECK_IN_OUT_WHITE_LIST_REMOVE_IP = gql`
mutation whitelistRemoveIP($publicIPs: [String!]!) {
  whitelistRemoveIP(publicIPs: $publicIPs) {
    total
    removedCount
    removedIPs{
      id
      publicIp
      type
    }
  }
}
`;

export const OFFICE_MANAGEMENT_CHECK_IN_PLACE_LIST = gql`
query checkInGetPlaceList($filter: CheckInPlaceFilter) {
  checkInGetPlaceList(filter: $filter) {
    total
    count
    places{
      id
      code
      name
      provinceId
      province
      districtId
      district
      wardId
      ward
      address
      addressZoneId
      latitude
      longitude
      ipValidation
      status
    }
  }
}
`;

export const OFFICE_MANAGEMENT_CHECK_IN_PLACE_DETAIL = gql`
query checkInGetPlace($id: String!) {
  checkInGetPlace(id: $id) {
    id
    code
    name
    provinceId
    province
    districtId
    district
    wardId
    ward
    address
    addressZoneId
    latitude
    longitude
    ipValidation
    status
  }
}
`;

export const OFFICE_MANAGEMENT_CHECK_IN_ADD_PLACE = gql`
mutation checkInAddPlace($arguments: CheckInPlaceArgs!) {
  checkInAddPlace(arguments: $arguments) {
    id
    code
    name
  }
}
`;

export const OFFICE_MANAGEMENT_CHECK_IN_EDIT_PLACE = gql`
mutation checkInEditPlace($arguments: EditCheckInPlaceArgs!) {
  checkInEditPlace(arguments: $arguments) {
    id
    code
    name
  }
}
`;

export const OFFICE_MANAGEMENT_CHECK_IN_REMOVE_PLACE = gql`
mutation checkInRemovePlace($id: String!) {
  checkInRemovePlace(id: $id) {
    id
    code
    name
  }
}
`;

export const OFFICE_MANAGEMENT_GET_COORDINATES_BY_TEXT = gql`
query addressGetLocationByText($params: AddressTextArgs!) {
  addressGetLocationByText(params: $params) {
    latitude
    longitude
  }
}
`;

export const OFFICE_MANAGEMENT_MEETING_ROOM_LIST = gql`
query officeMeetingRoomGetList($arguments: QueryMeetingRoomsArgs!) {
  officeMeetingRoomGetList(arguments: $arguments) {
    total
    count
    meetingRooms {
      id
      code
      name
      capacity
      color
      status
      approvalFormId
      orgChart {
        id
        code
        name
      }
      approvalForm {
        id
        name
        fields {
          id
          name
          dataType
          hintText
          order
          required
          timeInPast
          multiSelect
          optionItems
        }
      }
    }
  }
}
`;

export const OFFICE_MANAGEMENT_MEETING_ROOM_CREATE = gql`
mutation officeCreateMeetingRoom($arguments: CreateMeetingRoomArgs!) {
  officeCreateMeetingRoom(arguments: $arguments) {
    id
    code
    name
    capacity
    color
    status
  }
}
`;

export const OFFICE_MANAGEMENT_MEETING_ROOM_UPDATE = gql`
mutation officeUpdateMeetingRoom($arguments: UpdateMeetingRoomArgs!) {
  officeUpdateMeetingRoom(arguments: $arguments) {
    id
    code
    name
    capacity
    color
    status
  }
}
`;

export const OFFICE_MANAGEMENT_MEETING_ROOM_DELETE = gql`
mutation officeDeleteMeetingRoom($arguments: DeleteMeetingRoomArgs!) {
  officeDeleteMeetingRoom(arguments: $arguments) {
    id
    code
    name
    capacity
    color
    status
  }
}
`;

export const OFFICE_MANAGEMENT_MEETING_SCHEDULE_DELETE = gql`
mutation managementDeleteBookingMeetingRoom($arguments: DeleteBookingMeetingRoomArgs!) {
  managementDeleteBookingMeetingRoom(arguments: $arguments) 
}
`;

export const OFFICE_MANAGEMENT_MEETING_ROOM_BOOKING = gql`
mutation officeBookMeetingRoom($arguments: BookMeetingRoomArgs!) {
  officeBookMeetingRoom(arguments: $arguments) {
    booking{
      id
      meetingContent
      startAt
      endAt
      quantity
      note
    }
  }
}
`;

export const OFFICE_MANAGEMENT_MEETING_LIST = gql`
query managementGetEmployeeSchedule($arguments: QueryScheduleArgs!) {
  managementGetEmployeeSchedule(arguments: $arguments) {
    total
    count
    schedules{
      id
      title
      type
      startAt
      endAt
    }
  }
}
`;

export const OFFICE_MANAGEMENT_CAR_LIST = gql`
query officeGetCars($filter: OfficeCarFilter) {
  officeGetCars(filter: $filter) {
    total
    count
    cars {
      id
      code
      model
      driverId
      color
      capacity
      plateNumber
      status
      orgChartId
      approvalFormId
      approvalForm {
        id
        name
      }
      driver {
        id
        fullname
      }
      orgChart {
        id
        code
        name
      }
    }
  }
}
`;

export const OFFICE_MANAGEMENT_ACTIVE_CAR_LIST = gql`
query officeGetActiveCars($filter: OfficeActiveCarFilter) {
  officeGetActiveCars(filter: $filter) {
    total
    count
    cars {
      id
      code
      model
      color
      capacity
      plateNumber
      status
      orgChartId
      approvalFormId
      driver {
        id
        fullname
      }
      approvalForm {
        fields {
          id
          name
          dataType
          hintText
          order
          required
          timeInPast
          multiSelect
          optionItems
        }
      }
    }
  }
}
`;

export const OFFICE_MANAGEMENT_CAR_CREATE = gql`
mutation officeAddCar($arguments: OfficeCarArgs!) {
  officeAddCar(arguments: $arguments) {
    id
    code
    model
    driverId
    color
    capacity
    plateNumber
    status
  }
}
`;

export const OFFICE_MANAGEMENT_CAR_UPDATE = gql`
mutation officeEditCar($arguments: EditOfficeCarArgs!) {
  officeEditCar(arguments: $arguments) {
    id
    code
    model
    driverId
    color
    capacity
    plateNumber
    status
  }
}
`;

export const OFFICE_MANAGEMENT_CAR_DELETE = gql`
mutation officeRemoveCar($id: String!) {
  officeRemoveCar(id: $id) {
    id
    code
  }
}
`;


export const OFFICE_MANAGEMENT_NOTIFICATION_LIST = gql`
query officeGetNotificationCampaignList($filter: NotificationCampaignFilter) {
  officeGetNotificationCampaignList(filter: $filter) {
    total
    count
    campaigns{
      id
      title
      content
      imageUrls
      type
      status
      startTimeInMinutes
      weekDays
      monthDays
      startAt
      endAt
      departments{
        id
        code
        name
      }
    }
  }
}
`;

export const OFFICE_MANAGEMENT_NOTIFICATION_CREATE = gql`
mutation officeCreateNotificationCampaign(
  $arguments: NotificationCampaignArgs!
) {
  officeCreateNotificationCampaign(arguments: $arguments) {
    id
    title
    content
  }
}
`;

export const OFFICE_MANAGEMENT_NOTIFICATION_UPDATE = gql`
mutation officeUpdateNotificationCampaign(
  $arguments: NotificationUpdateCampaignArgs!
) {
  officeUpdateNotificationCampaign(arguments: $arguments) {
    id
    title
    content
  }
}
`;
