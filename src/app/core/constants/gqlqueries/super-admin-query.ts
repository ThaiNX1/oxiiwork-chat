import {gql} from "apollo-angular";

export const IAM_ACCESS_PERMISSION = gql`
query iamAccessGetPermission {
  iamAccessGetPermission {
    version
    serviceCode
    isRoot
    statement {
      Menus {
        name
        code
        description
        parentCode
      }
      Allow{
        resources
        actions
        condition
      }
    }
  }
}
`;

export const PERMISSION_ACTION_LIST = gql`
query officePermissionActionGetList{
  officePermissionActionGetList{
    total
    count
    actions{
      id
      name
      description
      children{
        id
        code
        name
      }
    }
  }
}
`;

export const BUSINESS_ROLE_GET_LIST = gql`
query officePermissionBusinessRoleGetList(
  $filter: PermissionBusinessRoleFilter
) {
  officePermissionBusinessRoleGetList(filter: $filter) {
    total
    count
    businessRoles {
      id
      name
      code
      organization {
        id
        name
        code
      }
      policies {
        id
        condition
        actions {
          id
          name
          code
        }
      }
    }
  }
}
`;

export const BUSINESS_ROLE_GET_LIST_FILTER = gql`
query officePermissionBusinessRoleGetList(
  $filter: PermissionBusinessRoleFilter
) {
  officePermissionBusinessRoleGetList(filter: $filter) {
    total
    count
    businessRoles {
      id
      name
      code
    }
  }
}
`;

export const BUSINESS_ROLE_CREATE = gql`
mutation officeBusinessRoleCreate($arguments: BusinessRoleCreateArgs!) {
  officeBusinessRoleCreate(arguments: $arguments) {
    id
    code
    name
  }
}
`;

export const BUSINESS_ROLE_UPDATE = gql`
mutation officeBusinessRoleUpdate($arguments: BusinessRoleUpdateArgs!) {
  officeBusinessRoleUpdate(arguments: $arguments) {
    id
    code
    name
  }
}
`;

export const SYSTEM_USER_GET_LIST = gql`
query officeSysUserGetList($filter: SysUserFilter) {
  officeSysUserGetList(filter: $filter) {
    total
    count
    sysUsers {
      id
      no
      code
      fullname
      email
      updatedAt
      status
      updatedByUser {
        id
        fullname
        email
      }
      orgCharts {
        id
        code
        name
      }
      businessRole {
        id
        code
        name
      }
    }
  }
}
`;

export const SYSTEM_USER_CREATE = gql`
mutation officeSysUserCreate($arguments: AddSysUserArgs!) {
  officeSysUserCreate(arguments: $arguments) {
    id
    code
    fullname
  }
}
`;

export const SYSTEM_USER_UPDATE = gql`
mutation officeSysUserUpdate($arguments: EditSysUserArgs!) {
  officeSysUserUpdate(arguments: $arguments) {
    id
    code
    fullname
  }
}
`;
