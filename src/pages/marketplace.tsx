import Sidebar from '../components/Sidebar';
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
    <div className='card flex w-80 bg-slate-800 shadow-xl mt-3'>
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
          <button className='btn-info btn text-white'>Hacer oferta</button>
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
      <main className='grid grid-cols-1 justify-items-center gap-4 text-white sm:grid-cols-2 lg:grid-cols-4'>
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
