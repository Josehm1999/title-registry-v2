import Sidebar from '../components/Sidebar';
import {
	ListedProperty,
	listed_properties,
} from '../../constants/subgraphQueries';
import { graphqlClient } from './_app';
import { PropertyTitles } from '../components/PropertyTitleCard';
import { getSession } from 'next-auth/react';

export default function Dashboard({
	propertyTitles,
}: {
	propertyTitles: ListedProperty[];
}) {
	return (
		<Sidebar>
			<main className='mt-6 mr-6 grid grid-cols-1 gap-x-6 gap-y-10 text-white sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 '>
				<PropertyTitles propertyTitles={propertyTitles}></PropertyTitles>
			</main>
		</Sidebar>
	);
}

export async function getServerSideProps() {
	try {
		const session = await getSession();
		const result_properties = await graphqlClient.query({
			query: listed_properties,
			// variables: {
			// 	owner_address: session?.address!,
			// },
		});
		const propertyTitles = result_properties.data.propertyListeds;
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
