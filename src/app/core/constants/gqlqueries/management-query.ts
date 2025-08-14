import {gql} from "apollo-angular";


export const PAYROLL_IMPORT = gql`
mutation managementUserPaycheckBulkUpsert($userPaychecks: [UserPaycheckBulkUpsertInput!]!) {
  managementUserPaycheckBulkUpsert(userPaychecks: $userPaychecks) {
    records{
      code
      name
      wage
      year
      id
      metadata
      month
      userCode
      payrollCode
      errorMessage
    }
  }
}
`;



export const MANAGEMENT_GET_ORGANIZATION_LIST_AUTHOR = gql`
query officeOrgChartList($filter: OrgChartFilter!) {
  officeOrgChartList(filter: $filter) {
    total
    count
    orgCharts{
      id
      name
      code
      parentId
      companyId
      parent{
        id
        name
        code
        parentId
      }
      level
      type
      status
      path
      approverId
      approver{
        id
        code
        fullname
      }
    }
  }
}
`;

export const MANAGEMENT_GET_EMPLOYEE_OFFICE_LIST = gql`
query officeListEmployeeOfOrgChart($filter: UserOrgChartFilter!) {
  officeListEmployeeOfOrgChart(filter: $filter) {
    total
    count
    officeUsers {
      id
      code
      fullname
      phone
      status
      dateOfBirth
      onboardingOn
      officalWorkingOn
      email
      leaveOn
      identityCard
      major
      socialInsuranceCode
      createdAt
      updatedAt
      seniority
      company {
        id
        name
      }
      departmentLever {
        l2
      }
      bankAccount {
        accountNumber
        accountHolder
      }
      createdByUser {
        fullname
      }
      updatedByUser {
        fullname
      }
      departments {
        department {
          id
          code
          name
          companyId
          approver {
            fullname
          }
        }
        title {
          id
          code
          name
        }
      }
    }
  }
}
`;
export const UPDATE_PAYROLL_MAGENEMNT = gql`
mutation managementPayrollUpdate($arguments: PayrollUpdateInput!) {
  managementPayrollUpdate(arguments: $arguments) {
   code
        createdAt
        createdBy
        id
        name
        status
        updatedAt
        updatedBy
        orgCharts {
            approverId
            code
            companyId
            createdAt
            createdBy
            id
            level
            name
            no
            note
            parentId
            path
            status
            type
            updatedAt
            updatedBy
        }
        paychecks {
            code
            createdAt
            createdBy
            currency
            id
            month
            name
            no
            updatedAt
            updatedBy
            wage
            year
        }
    }
}
`;


export const GET_DATA_PAYROLL = gql`
query managementPayrollGet($id: String!) {
  managementPayrollGet(id: $id){
      blocks {
          code
          createdAt
          createdBy
          id
          name
          no
          note
          officeUserExtraData
          order
          status
          updatedAt
          updatedBy
      }
      code
      createdAt
      createdBy
      id
      name
      orgCharts {
          approverId
          code
          companyId
          createdAt
          createdBy
          id
          level
          name
          no
          note
          parentId
          path
          status
          type
          updatedAt
          updatedBy
      }
      paychecks {
          code
          createdAt
          createdBy
          currency
          id
          month
          name
          no
          updatedAt
          updatedBy
          wage
          year
      }
      status
      updatedAt
      updatedBy
  }
}

   
`;

export const DEPARTMENT_LIST = gql`
query adminOrgChartList($filter: SysOrgChartFilter) {
  adminOrgChartList(filter: $filter) {
    total
    count
     orgCharts {
          approverId
          code
          companyId
          createdAt
          createdBy
          id
          level
          name
          no
          note
          parentId
          path
          status
          type
          updatedAt
          updatedBy
      }
}
}
`;

export const PALLROLL_LIST_TABLE_MANAGENMENT = gql`
query managementUserPaycheckList($filter: UserPaycheckListFilter!) {
  managementUserPaycheckList(filter: $filter) {
   total
        count
        userPaychecks {
            code
            createdAt
            createdBy
            currency
            id
            month
            name
            no
            updatedAt
            updatedBy
            wage
            year
            status
            user {
             code
             id
            }
              infoBlocks {
                code
                createdAt
                createdBy
                id
                name
                no
                note
                officeUserExtraData
                order
                status
                updatedAt
                updatedBy
                fields {
                    code
                    createdAt
                    createdBy
                    dataType
                    id
                    name
                    no
                    note
                    officeUserExtraData
                    optionItems
                    order
                    required
                    status
                    updatedAt
                    updatedBy
                    value
                }
            }
            payroll {
                code
                createdAt
                createdBy
                id
                name
                status
                updatedAt
                updatedBy
            }
        }
  }
}
`;



export const PALLROLL_LIST_TABLE = gql`
query managementPayrollList($filter: PayrollListFilter!) {
  managementPayrollList(filter: $filter) {
    total
    count
     payrolls {
            code
            createdAt
            createdBy
            id
            name
            status
            updatedAt
            updatedBy
            blocks {
            code
            createdAt
            createdBy
            id
            name
            no
            note
            officeUserExtraData
            order
            status
            updatedAt
            updatedBy
        }
            orgCharts {
                approverId
                code
                companyId
                createdAt
                createdBy
                id
                level
                name
                no
                note
                parentId
                path
                status
                type
                updatedAt
                updatedBy
            }
        }
      
  }
}
`;


export const MANAGEMENT_GET_EMPLOYEE_LIST = gql`
query managementGetEmployeeList($filter: OfficeUserFilter) {
  managementGetEmployeeList(filter: $filter) {
    total
    count
    officeUsers {
      id
      code
      fullname
      phone
      status
      dateOfBirth
      onboardingOn
      officalWorkingOn
      email
      leaveOn
      identityCard
      major
      socialInsuranceCode
      createdAt
      updatedAt
      seniority
      company {
        id
        name
      }
      departmentLever {
        l2
      }
      bankAccount {
        accountNumber
        accountHolder
      }
      createdByUser {
        fullname
      }
      updatedByUser {
        fullname
      }
      departments {
        department {
          id
          code
          name
          companyId
          approver {
            fullname
          }
        }
        title {
          id
          code
          name
        }
      }
    }
  }
}
`;

export const MANAGEMENT_GET_EMPLOYEE = gql`
query managementGetEmployee($id: String!) {
  managementGetEmployee(id: $id) {
    id
    code
    hrCode
    major
    onboardingOn
    officalWorkingOn
    fullname
    phone
    relativePhone
    status
    imageUrls
    email
    personalEmail
    dateOfBirth
    age
    leaveOn
    identityCard
    idCardIssuedOn
    idCardIssuedPlace
    socialInsuranceCode
    taxCode
    resigned
    resignationType
    resignationReason
    resignationDetailReason
    officalWorkingOn
    lastWorkingOn
    leaveOn
    leader{
      id
      code
      fullname
    }
    attachFiles{
      id
      name
      location
      mimetype
    }
    company{
      id
      name
    }
    bankAccount{
      bankName
      bankId
      bankBranch
      accountHolder
      accountNumber
    }
    address{
      address
      addressZoneId
      wardId
      ward
      districtId
      district
      provinceId
      province
    }
    departments{
      department{
        id
        code
        name
        companyId
        approver{
          id
          fullname
          code
        }
      }
      title{
        id
        code
        name
      }
    }
    infoBlocks{
      id
      code
      name
      order
      status
      fields{
        id
        code
        name
        dataType
        optionItems
        order
        required
        value
        status
      }
    }
    workProfile {
            createdAt
            createdBy
            id
            updatedAt
            updatedBy
            detail {
                createdAt
                createdBy
                id
                major
                updatedAt
                updatedBy
                userCode
                infoBlocks {
                    code
                    createdAt
                    createdBy
                    id
                    name
                    no
                    note
                    officeUserExtraData
                    order
                    status
                    updatedAt
                    updatedBy
                    fields {
                        code
                        createdAt
                        createdBy
                        dataType
                        id
                        name
                        no
                        note
                        officeUserExtraData
                        optionItems
                        order
                        required
                        status
                        updatedAt
                        updatedBy
                        value
                        fieldType
                    }
                }
            }
            info {
                activeDate
                createdAt
                createdBy
                decidedDate
                decidedNumber
                id
                isDecided
                note
                reason
                type
                typeTitle
                updatedAt
                updatedBy
            }
        }
  }
}
`;

export const MANAGEMENT_ADD_EMPLOYEE = gql`
mutation managementAddEmployee($arguments: AddEmployeeArgs!) {
  managementAddEmployee(arguments: $arguments) {
    id
    code
    fullname
  }
}
`;

export const MANAGEMENT_EDIT_EMPLOYEE = gql`
mutation managementEditEmployee($arguments: EditEmployeeArgs!) {
  managementEditEmployee(arguments: $arguments) {
    id
    code
    fullname
  }
}
`;

export const MANAGEMENT_IMPORT_BASIC_INFO_EMPLOYEE = gql`
mutation managementEmployeeBulkUpsert($officeUsers: [ImportEmployeeArgs!]!) {
  managementEmployeeBulkUpsert(officeUsers: $officeUsers) {
    total
    count
    records {
      id
      code
      fullname
      phone
      title
      department
      email
      personalEmail
      address
      province
      district
      ward
      identityCard
      idCardIssuedOn
      idCardIssuedPlace
      birthday
      hrCode
      major
      onboardingOn
      officalWorkingOn
      resignationType
      resignationReason
      resignationDetailReason
      lastWorkingOn
      leaveOn
      taxCode
      socialInsuranceCode
      relativePhone
      bankName
      bankBranch
      accountHolder
      accountNumber
      status
      errorMessage
      data
    }
  }
}
`;

export const MANAGEMENT_IMPORT_ADVANCE_INFO_EMPLOYEE = gql`
mutation managementEmployeeDataBulkUpsert($employeeDatas: [UpsertEmployeeDataArgs!]!) {
  managementEmployeeDataBulkUpsert(employeeDatas: $employeeDatas) {
    total
    count
    records{
      code
      data
      errorMessage
    }
  }
}
`;

export const MANAGEMENT_EXPORT_INFO_EMPLOYEE_DETAIL = gql`
query managementEmployeeReportDetailExport($filter: EmployeeReportFilterArgs) {
  managementEmployeeReportDetailExport(filter: $filter) {
    id
    location
    name
  }
}
`;

export const MANAGEMENT_EXPORT_INFO_EMPLOYEE_SUMMARY = gql`
query managementEmployeeReportSummaryExport($filter: EmployeeReportFilterArgs) {
  managementEmployeeReportSummaryExport(filter: $filter) {
    id
    location
    name
  }
}
`;

export const MANAGEMENT_EXPORT_INFO_EMPLOYEE_RESIGN = gql`
query managementEmployeeResignReportExport($filter: EmployeeReportFilterArgs) {
  managementEmployeeResignReportExport(filter: $filter) {
    id
    location
    name
  }
}
`;

export const MANAGEMENT_GET_ORGANIZATION_TREE = gql`
query managementOrgChartTree($parentId: String! = "root") {
  managementOrgChartTree(parentId: $parentId) {
    total
    count
    orgCharts{
      id
      name
      code
      parentId
      parent{
        id
        name
        code
        parentId
      }
    }
  }
}
`;

export const MANAGEMENT_GET_ORGANIZATION_LIST = gql`
query managementOrgChartList($filter: OrgChartFilter) {
  managementOrgChartList(filter: $filter) {
    total
    count
    orgCharts{
      id
      name
      code
      parentId
      parent{
        id
        name
        code
        parentId
      }
    }
  }
}
`;

export const MANAGEMENT_GET_ORGANIZATION_FULL_LIST = gql`
query managementOrgChartFullList($rootId: String) {
  managementOrgChartFullList(rootId: $rootId) {
    total
    count
    orgCharts{
      id
      name
      code
      parentId
      companyId
      parent{
        id
        name
        code
        parentId
      }
      level
      type
      status
      path
      approverId
      approver{
        id
        code
        fullname
      }
    }
  }
}
`;

export const MANAGEMENT_ADD_ORGANIZATION = gql`
mutation managementAddOrgChart($arguments: OrgChartArgs!) {
  managementAddOrgChart(arguments: $arguments) {
    id
    code
    name
    parentId
  }
}
`;

export const MANAGEMENT_EDIT_ORGANIZATION = gql`
mutation managementEditOrgChart($arguments: EditOrgChartArgs!) {
  managementEditOrgChart(arguments: $arguments) {
    id
      name
      code
      parentId
      companyId
      parent{
        id
        name
        code
        parentId
      }
      level
      type
      status
      path
      approverId
      approver{
        id
        code
        fullname
      }
  }
}
`;

export const MANAGEMENT_REMOVE_ORGANIZATION = gql`
mutation managementRemoveOrgChart($id: String!) {
  managementRemoveOrgChart(id: $id) {
    id
    code
    name
    parentId
  }
}
`;

export const MANAGEMENT_IMPORT_ORGANIZATION = gql`
mutation managementOrgChartBulkUpsert($orgcharts: [UpsertOrgChartArgs!]!) {
  managementOrgChartBulkUpsert(orgcharts: $orgcharts) {
    count
    total
    records{
      code
      name
      parentCode
      errorMessage
    }
  }
}
`;

export const MANAGEMENT_EXPORT_ORGANIZATION = gql`
query managementOrgChartExport {
  managementOrgChartExport {
    id
    location
    name
  }
}
`;

export const MANAGEMENT_GET_OFFICE_TITLE = gql`
query officeGetTitles($filter: OfficeTitleFilter) {
  officeGetTitles(filter: $filter) {
    total
    count
    titles{
      id
      code
      name
      note
      createdAt
    }
  }
}
`;

export const MANAGEMENT_ADD_OFFICE_TITLE = gql`
mutation officeAddTitle($arguments: OfficeTitleArgs!) {
  officeAddTitle(arguments: $arguments) {
    id
    code
    name
    note
  }
}
`;

export const MANAGEMENT_EDIT_OFFICE_TITLE = gql`
mutation officeEditTitle($arguments: EditOfficeTitleArgs!) {
  officeEditTitle(arguments: $arguments) {
    id
    code
    name
    note
  }
}
`;

export const MANAGEMENT_REMOVE_OFFICE_TITLE = gql`
mutation officeRemoveTitle($id: String!) {
  officeRemoveTitle(id: $id) {
    id
    code
    name
    note
  }
}
`;

export const MANAGEMENT_IMPORT_OFFICE_TITLE = gql`
mutation officeTitleBulkUpsert($titles: [UpsertTitleArgs!]!) {
  officeTitleBulkUpsert(titles: $titles) {
    count
    total
    records{
      code
      name
      errorMessage
    }
  }
}
`;

export const MANAGEMENT_IMPORT_ASSET = gql`
mutation managementCreateAssetImport($file: Upload!) {
  managementCreateAssetImport(file: $file) {
    count
    total
    resultFileUrl
  }
}
`;

export const MANAGEMENT_IMPORT_UPDATE_ASSET = gql`
mutation managementUpdateAssetImport($file: Upload!) {
  managementUpdateAssetImport(file: $file) {
    count
    total
    resultFileUrl
  }
}
`;

export const MANAGEMENT_ASSET_CREATE = gql`
mutation managerAssetCreate($arguments: AssetCreateInput!) {
  managerAssetCreate(arguments: $arguments) {
    code
  }
}
`;

export const MANAGEMENT_CATEGORY_ASSET_LIST = gql`
query managementCategoryAssetList {
  managementCategoryAssetList {
    total
    count
    records{
      id
      code
      name
    }
  }
}
`;

export const MANAGEMENT_IMPORT_ASSET_FIELDS_KEY_LIST = gql`
query managementImportAssetFieldsKeyList {
  managementImportAssetFieldsKeyList {
    fields
  }
}
`;

export const MANAGEMENT_IMPORT_ASSET_FIELDS_TITLE_LIST = gql`
query managementImportAssetFieldsTitleList {
  managementImportAssetFieldsTitleList {
    fields
  }
}
`;

export const MANAGEMENT_IMPORT_ASSET_TEMPLATE_EXPORT = gql`
query managementImportAssetTemplateExport {
  managementImportAssetTemplateExport {
    location
  }
}
`;

export const MANAGEMENT_ASSET_BULK_UPSERT = gql`
mutation managementAssetBulkUpsert($arguments: [AssetBulkUpsertInput!]!) {
  managementAssetBulkUpsert(arguments: $arguments) {
    count
    records {
      assignedDepartmentCode
      assignedUserCode
      categoryCode
      assetCode
      errorMessage
      managementDepartmentCode
      managementUserCode
      purchaseDate
      warehouseCode
      warrantyExpiredDate
    }
    total
  }
}
`;

export const MANAGEMENT_ASSET_UPDATE = gql`
mutation managerAssetUpdate($arguments: AssetUpdateInput!) {
  managerAssetUpdate(arguments: $arguments) {
    id
  }
}
`;

export const MANAGEMENT_ASSET_LIST = gql`
query managementAssetList($filter: ManagementAssetFilter)  {
  managementAssetList(filter: $filter) {
    count
    records {
      id
      code
      name
      category {
        name
      }
      serial
      price
      purchaseAt
      warrantyByMonth
      providerText
      assignedUser {
        fullname
      }
      managementDepartment {
        name
      }
      managementUser {
        fullname
      } 
      status
    }
    total
  }
}
`;

export const MANAGEMENT_ASSET_GET = gql`
query managementAssetGet($id: String!)  {
  managementAssetGet(id: $id) {
    id
    code
    name
    category {
      id
      name
      unit
    }
    serial
    price
    purchaseAt
    warrantyByMonth
    warrantyExpiredAt
    providerText
    assignedUser {
      fullname
    }
    managementDepartment {
      id
      name
    }
    assignedDepartment {
      id
      name
    }
    managementUser {
      id
      fullname
    } 
    assignedUser {
      id
      fullname
    } 
    status
    description
    warehouse {
      id
      name
    }
    attachments {
      createdAt
      encoding
      id
      location
      mimetype
      name
      size
      updatedAt
    }

    images {
      createdAt
      encoding
      id
      location
      mimetype
      name
      size
      updatedAt
    }
  }
}
`;

export const MANAGEMENT_WARE_HOUSE_ASSET_LIST = gql`
query managementWarehouseAssetList($filter: ManagementWarehouseAssetFilter)  {
  managementWarehouseAssetList(filter: $filter) {
    count
    records {
      code
      id
      name
    }
    total
  }
}
`;

export const PROFILE_GET_BLOCK_LIST = gql`
query profileGetBlocks {
  profileGetBlocks {
    total
    count
    blocks{
      id
      code
      name
      status
      order
    }
  }
}
`;

export const PROFILE_ADD_BLOCK = gql`
mutation profileAddBlock($arguments: InfoBlockArgs!) {
  profileAddBlock(arguments: $arguments) {
    id
    code
    name
    status
  }
}
`;

export const PROFILE_EDIT_BLOCK = gql`
mutation profileEditBlock($arguments: EditInfoBlockArgs!) {
  profileEditBlock(arguments: $arguments) {
    id
    code
    name
    status
  }
}
`;

export const PROFILE_IMPORT_BLOCK = gql`
mutation profileBlockBulkUpsert($blocks: [UpsertBlockArgs!]!) {
  profileBlockBulkUpsert(blocks: $blocks) {
    count
    total
    records{
      code
      name
      status
      errorMessage
    }
  }
}
`;

export const PROFILE_GET_FIELD_LIST = gql`
query profileGetFields($blockId: String) {
  profileGetFields(blockId: $blockId) {
    total
    count
    fields{
      id
      block{
        id
        name
      }
      code
      name
      dataType
      note
      optionItems
      required
      status
      order
    }
  }
}
`;

export const MANAGEMENT_WORK_PROFILE_GET = gql`
query managementWorkProfileGet($id: String!) {
  managementWorkProfileGet(id: $id) {
    user {
      id
      fullname
    }
    info {
          endDate
          activeDate
          attachments {
              createdAt
              encoding
              id
              location
              mimetype
              name
              size
              updatedAt
          }
          decidedDate
          decidedNumber
          isDecided
          note
          reason
          type
      }
      id
      createdAt
      updatedAt
      createdBy
      updatedBy
      detail {
          department {
            name
            approver {
              departments {
                  title {
                      name
                  }
              }
              fullname
            }
            id
          }
          leader {
            fullname
            departments {
                title {
                    name
                }
            }
            id
          }
          major
          title {
              name
              id
          }
          userCode
          infoBlocks {
              fields {
                  code
                  createdAt
                  createdBy
                  dataType
                  id
                  name
                  no
                  note
                  officeUserExtraData
                  optionItems
                  order
                  required
                  status
                  updatedAt
                  updatedBy
                  value
              }
              code
              name
              status
              officeUserExtraData
          }
      }
  }
}
`;

export const MANAGEMENT_IMPORT_USER_FIELDS_GET = gql`
query managementImportUserFieldsGet {
  managementImportUserFieldsGet {
    fields
  }
}
`;

export const MANAGEMENT_IMPORT_WORK_PROFILE_FIELDS_GET = gql`
query managementImportWorkProfileFieldsGet {
  managementImportWorkProfileFieldsGet {
    fields
  }
}
`;

export const MANAGEMENT_IMPORT_WORK_PROFILE_FIELDS_GET_TITLE = gql`
query managementImportWorkProfileFieldsGetTitle {
  managementImportWorkProfileFieldsGetTitle {
    fields
  }
}
`;

export const MANAGEMENT_IMPORT_USER_FIELDS_GET_TITLE = gql`
query managementImportUserFieldsGetTitle {
  managementImportUserFieldsGetTitle {
    fields
  }
}
`;

export const MANAGEMENT_IMPORT_USER_CREATE_FIELDS_GET_TITLE = gql`
query managementImportUserCreateFieldsGetTitle {
  managementImportUserCreateFieldsGetTitle {
    fields
  }
}
`;

export const MANAGEMENT_IMPORT_USER_CREATE_FIELDS_GET = gql`
query managementImportUserCreateFieldsGet {
  managementImportUserCreateFieldsGet {
    fields
  }
}
`;


export const MANAGEMENT_IMPORT_USER_TEMPLATE_EXPORT = gql`
query managementImportUserTemplateExport {
  managementImportUserTemplateExport {
    createdAt
    encoding
    id
    location
    mimetype
    name
    size
    updatedAt
  }
}
`;

export const MANAGEMENT_IMPORT_USER_CREATE_TEMPLATE_EXPORT = gql`
query managementImportUserCreateTemplateExport {
  managementImportUserCreateTemplateExport {
    createdAt
    encoding
    id
    location
    mimetype
    name
    size
    updatedAt
  }
}
`;

export const MANAGEMENT_IMPORT_WORK_PROFILE_TEMPLATE_EXPORT = gql`
query managementImportWorkProfileTemplateExport {
  managementImportWorkProfileTemplateExport {
    createdAt
    encoding
    id
    location
    mimetype
    name
    size
    updatedAt
  }
}
`;

export const MANAGEMENT_WORK_PROFILE_GET_SOFT_FIEDLS = gql`
query managementWorkProfileGetSoftFields {
  managementWorkProfileGetSoftFields {
    id
      block{
        id
        name
      }
    code
    name
    dataType
    note
    optionItems
    required
    status
    order
    fieldType
  }
}
`;

export const MANAGEMENT_WORK_PROFILE_INFO_TYPE_GET_FIEDLS = gql`
query managementWorkProfileInfoTypeGetList {
  managementWorkProfileInfoTypeGetList {
    key
    title
    type
  }
}
`;

export const MANAGEMENT_WORK_PROFILE_EXPORT = gql`
query managementWorkProfileExport($filter: ManagementWorkProfileFilter)  {
  managementWorkProfileExport(filter: $filter) {
    createdAt
    encoding
    id
    location
    mimetype
    name
    size
    updatedAt
  }
}
`;

export const MANAGEMENT_WORK_PROFILE_LIST = gql`
query managementWorkProfileList($filter: ManagementWorkProfileFilter) {
  managementWorkProfileList(filter: $filter) {
    total
    count
    records{
      user {
        fullname
      }
      createdAt
      createdBy
      detail {
        department {
          name
          approver {
            fullname
            departments {
                title {
                    name
                }
            }
          }
        }
        leader {
          fullname
          departments {
              title {
                  name
              }
          }
        }
        title {
          name
        }
        userCode
        major
        infoBlocks {
            fields {
                code
                createdAt
                createdBy
                dataType
                id
                name
                no
                note
                officeUserExtraData
                optionItems
                order
                required
                status
                updatedAt
                updatedBy
                value
                fieldType
            }
            code
            name
            status
            officeUserExtraData
        }
        workProfile {
          detail {
            infoBlocks {
              name
              fields {
                id
                block{
                  id
                  name
                }
                code
                name
                dataType
                note
                optionItems
                required
                status
                order
              }
            }
          }
        }
      }
      info {
        type
        typeTitle
        decidedDate
        reason
        activeDate
        decidedNumber
        decidedDate
        attachments {
            createdAt
            encoding
            id
            location
            mimetype
            name
            size
            updatedAt
        }
      }
      id
      updatedAt
      updatedBy
    }
  }
}
`;


export const MANAGEMENT_WORK_PROFILE_CREATE = gql`
mutation managementWorkProfileCreate($arguments: WorkProfileCreateInput!) {
  managementWorkProfileCreate(arguments: $arguments) {
        createdAt
        createdBy
        id
        updatedAt
        updatedBy
  }
}
`;

export const MANAGEMENT_WORK_PROFILE_UPDATE = gql`
mutation managementWorkProfileUpdate($arguments: WorkProfileUpdateInput!) {
  managementWorkProfileUpdate(arguments: $arguments) {
        createdAt
        createdBy
        id
        updatedAt
        updatedBy
  }
}
`;

export const MANAGEMENT_WORK_PROFILE_BULK_UPSERT = gql`
mutation managementWorkProfileBulkUpsert($arguments: [WorkProfileBulkUpsertInput!]!) {
  managementWorkProfileBulkUpsert(arguments: $arguments) {
    count
    total
    records{
      activeDate
      decided
      decidedDate
      decidedNumber
      department
      errorMessage
      id
      leader
      title
      typeText
      userCode
      userCodeUpdate
      metadata
    }
  }
}`;

export const IDENTIFY_CARD_PLACE_LIST = gql`
query identifyCardPlaceList {
    identifyCardPlaceList {
      count
      total
      records {
        title
        value
      }
    }
}
`;

export const EDIT_PAYROLL_BLOCK_FIED = gql`
mutation managementPayrollBlockFieldUpdate($arguments: PayrollBlockFieldUpdateInput!) {
  managementPayrollBlockFieldUpdate(arguments: $arguments) {
         code
        createdAt
        createdBy
        dataType
        id
        name
        no
        note
        officeUserExtraData
        optionItems
        order
        required
        status
        updatedAt
        updatedBy
        value
  }
}
`;

export const ADD_PAYROLL_BLOCK_FIED = gql`
mutation managementPayrollBlockFieldCreate($arguments: PayrollBlockFieldCreateInput!) {
  managementPayrollBlockFieldCreate(arguments: $arguments) {
        code
        createdAt
        createdBy
        id
        name
        no
        note
        officeUserExtraData
        order
        status
        required
        updatedAt
        updatedBy
        dataType
  }
}
`;


export const EDIT_PAYROLL_BLOCK = gql`
mutation managementPayrollBlockUpdate($arguments: PayrollBlockUpdateInput!) {
  managementPayrollBlockUpdate(arguments: $arguments) {
    id
    code
    name
    status
  }
}
`;

export const ADD_PAYROLL_BLOCK = gql`
mutation managementPayrollBlockCreate($arguments: PayrollBlockCreateInput!) {
  managementPayrollBlockCreate(arguments: $arguments) {
    id
    code
    name
    status
  }
}
`;

export const FIELDS_BLOCK_LIST = gql`
query managementInfoFieldGet($id: String!) {
  managementInfoFieldGet(id: $id) {
        code
        createdAt
        createdBy
        dataType
        id
        name
        no
        note
        officeUserExtraData
        optionItems
        order
        required
        status
        updatedAt
        updatedBy
        value
  }
}
`;

export const PAYYROLL_BLOCK_LIST = gql`
query managementPayrollGet($id: String!) {
  managementPayrollGet(id: $id) {
        code
        createdAt
        createdBy
        id
        name
        status
        updatedAt
        updatedBy
         blocks {
            code
            createdAt
            createdBy
            id
            name
            no
            note
            officeUserExtraData
            order
            status
            updatedAt
            updatedBy
        }
  }
}
`;


export const ADD_PAYROLL = gql`
mutation managementPayrollCreate($arguments: PayrollCreateInput!) {
  managementPayrollCreate(arguments: $arguments) {
    id
    code
    name
    status
  }
}
`;


export const PROFILE_ADD_FIELD = gql`
mutation profileAddField($arguments: InfoFieldArgs!) {
  profileAddField(arguments: $arguments) {
    id
    code
    name
    status
    order
    optionItems
    required
    dataType
  }
}
`;

export const PROFILE_EDIT_FIELD = gql`
mutation profileEditField($arguments: EditInfoFieldArgs!) {
  profileEditField(arguments: $arguments) {
    id
    code
    name
    status
    order
    optionItems
    required
    dataType
  }
}
`;

export const PROFILE_REMOVE_FIELD = gql`
mutation profileRemoveBlockField($id: String!) {
  profileRemoveBlockField(id: $id)
}
`;

export const PROFILE_IMPORT_FIELD = gql`
mutation profileFieldBulkUpsert($fields: [UpsertFieldArgs!]!) {
  profileFieldBulkUpsert(fields: $fields) {
    count
    total
    records{
      code
      blockCode
      dataType
      name
      note
      optionItems
      required
      status
      errorMessage
    }
  }
}
`;

export const GET_DATA_PAY_DETAIL = gql`
query managementUserPaycheckGet($id: String!) {
  managementUserPaycheckGet(id: $id){
     id
     code
     createdAt
     currency
     month
     name
     no
     status
     updatedAt
     year
     wage
     user {
     id
     code
     fullname
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
      payroll {
                code
                createdAt
                createdBy
                id
                name
                status
                updatedAt
                updatedBy
            }
      comments {
           updatedAt
           id
           description
           createdAt
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
}
}
`;
export const MANAGEMENT_IMPORT_BASIC_INFO_EMPLOYEE_NO_REQUIRED = gql`
mutation managementEmployeeBulkCreate($officeUsers: [EmployeeBulkCreateImport!]!) {
  managementEmployeeBulkCreate(officeUsers: $officeUsers) {
    total
    count
    records {
      accountHolder
      accountNumber
      address
      bankBranch
      bankName
      birthday
      code
      department
      district
      email
      errorMessage
      fullname
      hrCode
      idCardIssuedOn
      idCardIssuedPlace
      identityCard
      major
      officalWorkingOn
      onboardingOn
      personalEmail
      phone
      province
      relativePhone
      socialInsuranceCode
      status
      taxCode
      title
      ward
    }
  }
}
`;