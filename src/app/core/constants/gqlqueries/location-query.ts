import {gql} from "apollo-angular";

export const GET_COUNTRY = gql`
query addressGetCountries($filter: AddressZoneFilterArgs, $keyword: String) {
  addressGetCountries(filter: $filter,keyword: $keyword) {
    total
    count
    zones{
      id
      name
    }
  }
}
`;

export const GET_PROVINCE = gql`
query addressGetProvinces($countryId: String, $filter: AddressZoneFilterArgs, $keyword: String) {
  addressGetProvinces(countryId: $countryId,filter: $filter,keyword: $keyword) {
    total
    count
    zones{
      id
      name
    }
  }
}
`;

export const GET_DISTRICT = gql`
query addressGetDistricts($provinceId: String, $filter: AddressZoneFilterArgs, $keyword: String) {
  addressGetDistricts(provinceId: $provinceId,filter: $filter,keyword: $keyword) {
    total
    count
    zones{
      id
      name
    }
  }
}
`;

export const GET_WARD = gql`
query addressGetWards($districtId: String!, $filter: AddressZoneFilterArgs, $keyword: String) {
  addressGetWards(districtId: $districtId,filter: $filter,keyword: $keyword) {
    total
    count
    zones{
      id
      name
    }
  }
}
`;

export const GET_ZONE = gql`
query addressZoneGetList($filter: AddressZoneFilterArgs) {
  addressZoneGetList(filter: $filter) {
    total
    count
    zones{
      id
      name
    }
  }
}
`;
