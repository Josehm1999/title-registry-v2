import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { ListedProperty } from '../../constants/subgraphQueries';
import { contractAddressesInterface } from '../types/utility';
import titleAbi from '../../constants/TitleRegistry.json';
import networkMapping from '../../constants/networkMapping.json';
import Image from 'next/image';
import HouseLogo from '../../public/images/house-unsplash.jpg';
import { useSession } from 'next-auth/react';

export const PropertyCardBuyer = ({
  listed_property,
}: {
  listed_property: ListedProperty;
}) => {
  const addresses: contractAddressesInterface = networkMapping;
  const contractAddress = addresses['5']!['TitleRegistry']![0]!;
  const loading_shorthand =
    'animate-pulse bg-gray-400 text-base text-gray-400 mb-1';

  const session = useSession();
  const user_is_owner =
    listed_property.seller === session.data?.address.toLowerCase();
  const { config } = usePrepareContractWrite({
    address: `0x${contractAddress.substring(2, contractAddress.length)}`,
    abi: titleAbi,
    functionName: 'requestToLandOwner',
    args: [parseInt(listed_property.surveyNumber)],
    enabled: !user_is_owner,
  });

  const { data: data_from_contract, write: request_land } =
    useContractWrite(config);

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data_from_contract?.hash,
  });

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
        <button
          className={`${
            user_is_owner ? 'bg-gray-400 cursor-not-allowed' : 'bg-white'
          } absolute bottom-0 right-0 px-4 py-2 font-bold text-gray-800`}
          disabled={user_is_owner}
          onClick={() => request_land?.()}
        >
          Hacer oferta{' '}
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
        <p className='text-base text-gray-400'>
          <span className={`${isLoading ? loading_shorthand : ''}`}>
            {'Solicitante: ' + listed_property.requester}
          </span>
          <br />
          <span className={`${isLoading ? loading_shorthand : ''}`}>
            {'Estado solicitud: ' + listed_property.ReqStatus}
          </span>
          <br />
        </p>
        <p className='mt-2 font-bold text-white'>
          ${listed_property.marketValue}
        </p>
      </div>
    </div>
  );
};
