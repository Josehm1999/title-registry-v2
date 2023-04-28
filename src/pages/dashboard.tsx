import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import HouseLogo from '../../public/images/house-logo-unsplash.jpg';
import {
	ListedProperty,
	listed_properties,
} from '../../constants/subgraphQueries';
import { graphqlClient } from './_app';

const PropertyTitleCard = ({
	listed_property,
}: {
	listed_property: ListedProperty;
}) => {
	return (
		<div className='card card-compact w-96 bg-base-100 shadow-xl mx-5 my-5 glass flex justify-center'>
			<figure>
				<Image src={HouseLogo} alt={'House-Logo'} width={210} height={235} />
			</figure>
			<div className='card-body'>
				<h2 className='card-title'>{listed_property.state}</h2>
				<p>
					{listed_property.district}
					<br />
					{listed_property.neighborhood}
					<br />

					{listed_property.surveyNumber}
					<br />

					{listed_property.updatedAt}
					<br />
				</p>
				<div className='card-actions justify-end'>
					<button className='btn-primary btn'>Hacer oferta</button>
				</div>
			</div>
		</div>
	);
};

const PropertyTitles = ({
	propertyTitles,
}: {
	propertyTitles: ListedProperty[];
}) => {
	return (
		<>
			{propertyTitles.map((propertyTitle) => (
				<PropertyTitleCard
					key={propertyTitle.id}
					listed_property={propertyTitle}
				/>
			))}
		</>
	);
};

export default function Dashboard({
	propertyTitles,
}: {
	propertyTitles: ListedProperty[];
}) {
	return (
		<main className='grid bg-black text-white md:grid-cols-3'>
			<PropertyTitles propertyTitles={propertyTitles}></PropertyTitles>
		</main>
	);
}

export async function getServerSideProps(context: NextPageContext) {
	try {
		const result_properties = await graphqlClient.query({
			query: listed_properties,
		});
		const propertyTitles = result_properties.data.propertyListeds;
		const session = await getSession(context);
		if (!session) {
			return {
				redirect: {
					destination: '/',
					permanent: false,
				},
			};
		}
		return {
			props: { propertyTitles },
		};
	} catch (error) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
			props: {},
		};
	}
}
