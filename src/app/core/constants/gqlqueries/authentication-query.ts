import {gql} from "apollo-angular";

export const IDENTITY_SYS_LOGIN = gql`
mutation identitySysLogin($credential: CmsUserLoginArgs!) {
  identitySysLogin(credential: $credential) {
    accessToken
    refreshToken
    loggedInTime
    avaiableBusinessRoles{
      id
      code
      name
    }
    user{
      id
      phone
      email
      avatar{
        location
      }
      fullname
      sessionBusinessRole{
        id
        code
        name
      }
      businessRoles{
        id
        code
        name
      }
      officeUser{
        id
        fullname
        code
        imageUrls
      }
    }
  }
}
`;

export const IDENTITY_OFFICE_LOGIN = gql`
mutation identityOfficeLogin($credential: UserLoginArgs!) {
  identityOfficeLogin(credential: $credential) {
    accessToken
    refreshToken
    loggedInTime
    avaiableBusinessRoles{
      id
      code
      name
    }
    user{
      id
      phone
      email
      avatar{
        location
      }
      fullname
      sessionBusinessRole{
        id
        code
        name
      }
      businessRoles{
        id
        code
        name
      }
      officeUser{
        id
        fullname
        code
        titleName
        imageUrls
      }
    }
  }
}
`;

export const IDENTITY_SYS_REFRESH_TOKEN = gql`
mutation identityRefreshToken($refreshToken: String!) {
  identityRefreshToken(refreshToken: $refreshToken) {
    accessToken
    refreshToken
  }
}
`;

export const IDENTITY_LOGOUT = gql`
mutation identityLogout {
  identityLogout {
    id
  }
}
`;

export const IDENTITY_CMS_CHANGE_PASSWORD = gql`
mutation identityChangePassword($arguments: UserPasswordArgs!) {
  identityChangePassword(arguments: $arguments) {
    accessToken
    refreshToken
  }
}
`;

export const IDENTITY_PROFILE = gql`
query identityProfile {
  identityProfile {
    id
    officeUser {
      leader {
        fullname
        departments {
          title {
            name
          }
        }
      }
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
      company {
        id
        name
      }
      bankAccount {
        bankName
        bankId
        bankBranch
        accountHolder
        accountNumber
      }
      address {
        address
        addressZoneId
        wardId
        ward
        districtId
        district
        provinceId
        province
      }
      departments {
        department {
          id
          code
          name
          companyId
          approver {
            id
            fullname
            code
            departments {
              title {
                name
              }
            }
          }
        }
        title {
          id
          code
          name
        }
      }
      infoBlocks {
        id
        code
        name
        order
        status
        fields {
          id
          code
          name
          dataType
          optionItems
          order
          required
          value
        }
      }
    }
  }
}
`;

export const IDENTITY_PROFILE_GUEST = gql`
query identityProfile {
  identityProfile {
    id
    officeUser {
      id
      phone
      fullname
      code
      imageUrls
    }
  }
}
`;

export const IDENTITY_GUEST_GET_OTP = gql`
mutation identityOfficePhoneChallenge($phone: String!) {
  identityOfficePhoneChallenge(phone: $phone) {
    organization
    session
    target
  }
}
`;

export const IDENTITY_GUEST_VERIFY_OTP = gql`
mutation identityVerifyForgotPassword($otp: Float!, $session: String!) {
  identityVerifyForgotPassword(otp: $otp, session: $session) {
    accessToken
    refreshToken
  }
}
`;

export const IDENTITY_GUEST_SET_NEW_PASSWORD = gql`
mutation identitySetPassword($password: String!) {
  identitySetPassword(password: $password) {
    accessToken
    refreshToken
  }
}
`;
