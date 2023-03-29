import { useQuery } from '@apollo/client';
import type { NextPage } from 'next';

import { listed_properties } from '../../constants/subgraphQueries';
import networkMapping from '../../constants/networkMapping.json';

type titleInterface = {
  state: string;
  district: string;
  neighborhood: string;
  surveyNumber: string;
  seller: string;
  marketValue: string;
  isAvailable: string;
  requester: string;
  ReqStatus: string;
  updatedAt: string;
};

type contractAddressesInterface = {
  [key: string]: contractAddressesTitleInterface;
};

type contractAddressesTitleInterface = {
  [key: string]: string[];
};

type query_result_titles = {
  propertyListeds: Array<titleInterface>;
};

const MarketPlace: NextPage = () => {
  // const { isWeb3Enabled, chainId } = useMoralis();
  // const addresses: contractAddressesInterface = networkMapping;
  // const chain_string = !!chainId ? parseInt(chainId).toString() : '1337';
  // const title_registry_adresses =
  //   addresses[chain_string!]!['TitleRegistry']![0];
  const {
    loading,
    error: subgraph_query_error,
    data: properties_titles,
  } = useQuery<query_result_titles>(listed_properties);

  return (
    <div className='container mx-auto bg-white'>
      <h1 className='py-4 px-4 text-2xl font-bold'>Listados recientemente</h1>
      <div className='flex flex-wrap'>
        {
          //!isWeb3Enabled ? (
          //     <div> Web3 no esta habilitada.</div>
          //   ) : loading || !properties_titles ? (
          //     <div>Cargando</div>
          //   ) : subgraph_query_error ? (
          //     <div> Error en la consulta </div>
          //   ) : (
          //     properties_titles.propertyListeds.map((title: titleInterface) => {
          //       const {
          //         state,
          //         district,
          //         neighborhood,
          //         surveyNumber,
          //         seller,
          //         marketValue,
          //         isAvailable,
          //         requester,
          //         ReqStatus,
          //         updatedAt,
          //       } = title;
          //       return <div key={`${district}-${surveyNumber}`}>En desarrollo</div>;
          //     })
          //  )
        }
      </div>
    </div>
  );
};

export default MarketPlace;
