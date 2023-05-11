import { useState, useEffect } from 'react';
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

export const PropertyCardSeller = ({
  listed_property,
}: {
  listed_property: ListedProperty;
}) => {
  const addresses: contractAddressesInterface = networkMapping;
  const contractAddress = addresses['5']!['TitleRegistry']![0]!;

  const [propertyStatus, setPropertyStatus] = useState(
    listed_property.isAvailable
  );

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: `0x${contractAddress.substring(2, contractAddress.length)}`,
    abi: titleAbi,
    functionName: 'makeAvailable',
    args: [parseInt(listed_property.surveyNumber)],
  });

  const {
    data: data_from_contract,
    write: make_available,
    error,
  } = useContractWrite(config);

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data_from_contract?.hash,
  });

  const {
    config: config_unavailable,
    error: prepareError_unavailable,
    isError: isPrepareError_unavailable,
  } = usePrepareContractWrite({
    address: `0x${contractAddress.substring(2, contractAddress.length)}`,
    abi: titleAbi,
    functionName: 'makeAvailable',
    args: [parseInt(listed_property.surveyNumber)],
  });

  const {
    data: data_unavailable,
    write: make_unavailable,
    error: error_unavailable,
  } = useContractWrite(config);

  const {
    isLoading: isLoading_unavailable,
    isSuccess: isSuccess_unavailable,
    isError: isError_unavailable,
  } = useWaitForTransaction({
    hash: data_from_contract?.hash,
  });

  // useEffect(() => {
  //   if (isSuccess) {
  //     console.log(listed_property);
  //   }
  //   // setPropertyStatus(!listed_property.isAvailable);
  //   // console.log(isSuccess);
  // }, [isSuccess]);

  function change_availability() {
    propertyStatus ? make_available?.() : make_unavailable?.();
  }

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
          className='absolute bottom-0 right-0 bg-white px-4 py-2 font-bold text-gray-800'
          disabled={!make_available}
          onClick={() => change_availability()}
        >
          Cambiar estado
        </button>
      </div>
      <div className='p-4'>
        <h2 className='mb-2 text-lg font-bold'>
          {listed_property.neighborhood}
        </h2>
        <p className='text-base text-gray-400'>
          {'Ciudad: ' + listed_property.state} <br />
          {'Distrito: ' + listed_property.district} <br />
          {'Estado: ' + (propertyStatus ? 'Disponible' : 'No listado')}
        </p>
        <p className='mt-2 font-bold text-white'>
          ${listed_property.marketValue}
        </p>
      </div>
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
    </div>
  );
};
