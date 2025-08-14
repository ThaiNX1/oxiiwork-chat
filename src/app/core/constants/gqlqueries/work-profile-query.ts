import {gql} from "apollo-angular";

export const OFFICE_MANAGEMENT_WORK_PROFILE_LIST = gql`
query officeWorkProfileList($filter: OfficeWorkProfileFilter) {
  officeWorkProfileList(filter: $filter) {
    total
    count
    records{
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
