import { ListedProperty } from '../../constants/subgraphQueries';
import { PropertyCardBuyer } from './PropertyCardBuyer';
import { PropertyCardSeller } from './PropertyCardSeller';

const PageNames = ['Marketplace', 'Dashboard'] as const;

export const PropertyTitles = ({
  propertyTitles,
  page_name,
}: {
  propertyTitles: ListedProperty[];
  page_name: (typeof PageNames)[number];
}) => {
  return (
    <>
      {page_name === 'Marketplace'
        ? propertyTitles.map((propertyTitle) => (
            <PropertyCardBuyer
              key={propertyTitle.id}
              listed_property={propertyTitle}
            />
          ))
        : propertyTitles.map((propertyTitle) => (
            <PropertyCardSeller
              key={propertyTitle.id}
              listed_property={propertyTitle}
            />
          ))}
    </>
  );
};
