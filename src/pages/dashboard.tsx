import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import {
  ListedProperty,
  listed_properties,
} from '../../constants/subgraphQueries';
import { graphqlClient } from './_app';

const PropertyTitleCard = ({ surveyNumber }: { surveyNumber: string }) => {
  return <div>{surveyNumber}</div>;
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
          surveyNumber={propertyTitle.surveyNumber}
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
    <main className='grid text-white md:grid-cols-3'>
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
