import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import { ListedProperty } from "../../constants/subgraphQueries";
import { contractAddressesInterface } from "../types/utility";
import titleAbi from '../../constants/TitleRegistry.json';
import networkMapping from '../../constants/networkMapping.json';
import Image from 'next/image';
import HouseLogo from '../../public/images/house-unsplash.jpg';

export const PropertyCardBuyer = ({
  listed_property,
}: {
  listed_property: ListedProperty;
}) => {
  const addresses: contractAddressesInterface = networkMapping;
  const contractAddress = addresses['5']!['TitleRegistry']![0]!;

  const { config } = usePrepareContractWrite({
    address: `0x${contractAddress.substring(2, contractAddress.length)}`,
    abi: titleAbi,
    functionName: 'makeAvailable',
    args: [parseInt(listed_property.surveyNumber)],
  });

  const { data: data_from_contract, write: make_available } =
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
        <button className='absolute bottom-0 right-0 bg-white px-4 py-2 font-bold text-gray-800'>
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
          {listed_property.state + ' - ' + listed_property.isAvailable}
        </p>
        <p className='mt-2 font-bold text-white'>
          ${listed_property.marketValue}
        </p>
      </div>
    </div>
  );
};
