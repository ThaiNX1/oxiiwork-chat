import {gql} from "apollo-angular";

export const GET_BANK_LIST = gql`
query identityBankGetList($filter: BankFilterArgs) {
  identityBankGetList(filter: $filter) {
    total
    count
    banks{
      id
      vn_name
      en_name
      brandName
    }
  }
}
`;
