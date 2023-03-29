import { gql } from '@apollo/client';

export const listed_properties = gql`
  {
    propertyListeds(
      first: 5
      where: { requester: "0x0000000000000000000000000000000000000000" }
    ) {
      id
      state
      district
      neighborhood
      surveyNumber
      seller
      marketValue
      isAvailable
      requester
      ReqStatus
      updatedAt
    }
  }
`;

export const bought_properties = gql`
  {
    propertyBoughts(first: 5) {
      id
      seller
      buyer
      surveyNumber
      marketValue
      updatedAt
    }
  }
`;

export const regional_admins = gql`
  {
    regionalAdmins(first: 5) {
      id
      regionalAdmin
      district
    }
  }
`;
