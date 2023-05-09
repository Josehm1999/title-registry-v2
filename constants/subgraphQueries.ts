import { gql, TypedDocumentNode } from '@apollo/client';

export type RegionalAdmins = {
	regionalAdmins: RegionalAdmin[];
};

export type RegionalAdmin = {
	type_name: string;
	id: string;
	regionalAdmin: string;
	district: string;
};

export type PropertyListeds = {
	propertyListeds: ListedProperty[];
};

export type ListedProperty = {
	id: string;
	state: string;
	district: string;
	neighborhood: string;
	surveyNumber: string;
	seller: string;
	marketValue: string;
	isAvailable: boolean;
	requester: string;
	ReqStatus: string;
	updatedAt: string;
};

export type BoughtProperties = {
	bought_properties: BoughtPropertie[];
};

export type BoughtPropertie = {
	id: string;
	seller: string;
	buyer: string;
	surveyNumber: string;
	marketValue: string;
	updatedAt: string;
};

type SearchPropertysVars = {
	owner_address: string;
};

export const listed_properties: TypedDocumentNode<
	PropertyListeds,
	SearchPropertysVars
> = gql`
	query GetListedProperties($owner_address: Bytes) {
		propertyListeds(first: 5, where: { seller: $owner_address }) {
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
