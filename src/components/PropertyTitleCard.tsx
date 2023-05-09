import { ListedProperty } from '../../constants/subgraphQueries';
import Image from 'next/image';
import HouseLogo from '../../public/images/house-unsplash.jpg';

export const PropertyTitleCard = ({
	listed_property,
}: {
	listed_property: ListedProperty;
}) => {
	return (
		<div className='relative overflow-hidden rounded-lg bg-gray-800 shadow-md'>
			<div className='relative'>
				<Image
					src={HouseLogo}
					alt={'House-Item'}
					width={500}
					height={500}
					className='h-full w-full object-cover object-center'
				/>
				<button className='absolute bottom-0 right-0 bg-white px-4 py-2 font-bold text-gray-800'>
					Hacer oferta
				</button>
			</div>
			<div className='p-4'>
				<h2 className='mb-2 text-lg font-bold'>
					{listed_property.state +
						' - ' +
						listed_property.district +
						' - ' +
						listed_property.neighborhood}
				</h2>
				<p className='text-base text-gray-400'>{listed_property.state + ' - '+ listed_property.seller}</p>
				<p className='mt-2 font-bold text-white'>
					${listed_property.marketValue}
				</p>
			</div>
		</div>
	);
};

export const PropertyTitles = ({
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
