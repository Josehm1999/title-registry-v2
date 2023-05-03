import Sidebar from '../components/Sidebar';
import Image from 'next/image';
import HouseLogo from '../../public/images/house-logo-unsplash.jpg';
import {
	ListedProperty,
	listed_properties,
} from '../../constants/subgraphQueries';
import { graphqlClient } from './_app';
import Link from 'next/link';

const PropertyTitleCard = ({
	listed_property,
}: {
	listed_property: ListedProperty;
}) => {
	return (
		<div className='group relative bg-slate-700'>
			<div className='min-h-80 aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80'>
				<Image
					src={HouseLogo}
					alt={'House-Logo'}
					width={210}
					height={235}
					className='h-full w-full object-cover object-center lg:h-full lg:w-full'
				/>
			</div>
			<div className='mt-4 flex justify-between py-2 pl-5'>
				<div>
					<h3 className='text-md text-white'>
						<a href={'#'}>
							<span aria-hidden='true' className='absolute inset-0' />
							{listed_property.state +
								' - ' +
								listed_property.district +
								' - ' +
								listed_property.neighborhood}
						</a>
					</h3>
					<p className='text-sm text-gray-500'>{listed_property.updatedAt}</p>

					<div className='flex justify-between'>
						<p className='text-lg font-medium text-white'>
							{'$'}
							{listed_property.marketValue.length > 6
								? listed_property.marketValue.substring(
										0,
										listed_property.marketValue.length - 6
								  ) + 'K'
								: listed_property.marketValue}
						</p>

						<div className='rounded-md shadow'>
							<Link
								href='/marketplace'
								className='flex w-full items-center justify-center rounded-md
              border border-transparent bg-blue-700 text-base
              font-medium text-white transition delay-100 ease-in-out hover:bg-blue-600 md:px-6
              md:text-lg'
							>
								Comprar
							</Link>
						</div>
					</div>
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
		<Sidebar>
			<main className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 text-white sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ' >
				<PropertyTitles propertyTitles={propertyTitles}></PropertyTitles>
			</main>
		</Sidebar>
	);
}

export async function getServerSideProps() {
	try {
		const result_properties = await graphqlClient.query({
			query: listed_properties,
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
