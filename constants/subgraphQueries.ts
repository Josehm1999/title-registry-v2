import { gql, TypedDocumentNode } from '@apollo/client';

type RegionalAdmins = {
  regionalAdmins: RegionalAdmin[];
};

type RegionalAdmin = {
  type_name: string;
  id: string;
  regionalAdmin: string;
  district: string;
};

type PropertyListeds = {
  propertyListeds: ListedProperty[];
};

type ListedProperty = {
  id: string;
  state: string;
  neighborhood: string;
  surveyNumber: string;
  seller: string;
  marketValue: string;
  isAvailable: boolean;
  requester: string;
  ReqStatus: string;
  updatedAt: string;
};

type BoughtProperties = {
  bought_properties: BoughtPropertie[];
};

type BoughtPropertie = {
  id: string;
  seller: string;
  buyer: string;
  surveyNumber: string;
  marketValue: string;
  updatedAt: string;
};

export const listed_properties: TypedDocumentNode<
  PropertyListeds,
  ListedProperty
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

export const bought_properties: TypedDocumentNode<
  BoughtProperties,
  BoughtProperties
> = gql`
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
  RegionalAdmins,
  RegionalAdmin
> = gql`
  {
    regionalAdmins(first: 5) {
      id
      regionalAdmin
      district
    }
  }
`;
