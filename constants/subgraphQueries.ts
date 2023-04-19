import { gql, TypedDocumentNode } from '@apollo/client';

type RocketInventoryData = {
  rocketInventory: RocketInventoryVars[];
};

type RocketInventoryVars = {
  year: number;
};

export const listed_properties: TypedDocumentNode<
  RocketInventoryData,
  RocketInventoryVars
> = gql`
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

export const regional_admins: TypedDocumentNode<
  RocketInventoryData,
  RocketInventoryVars
> = gql`
  {
    regionalAdmins(first: 5) {
      id
      regionalAdmin
      district
    }
  }
`;
