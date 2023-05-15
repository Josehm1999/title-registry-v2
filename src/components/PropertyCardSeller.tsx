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

  const loading_shorthand =
    'animate-pulse bg-gray-400 text-base text-gray-400 mb-1';

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
    enabled: !(listed_property.ReqStatus.toString() != '0'),
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
    // isError: isPrepareError_unavailable,
  } = usePrepareContractWrite({
    address: `0x${contractAddress.substring(2, contractAddress.length)}`,
    abi: titleAbi,
    functionName: 'makeUnavailable',
    args: [parseInt(listed_property.surveyNumber)],
    enabled: !(listed_property.ReqStatus.toString() != '0'),
  });

  const {
    data: data_unavailable,
    write: make_unavailable,
    error: error_unavailable,
  } = useContractWrite(config_unavailable);

  const {
    isLoading: isLoading_unavailable,
    isSuccess: isSuccess_unavailable,
    isError: isError_unavailable,
  } = useWaitForTransaction({
    hash: data_unavailable?.hash,
  });

  const {
    config: config_accept_offer,
    error: prepareError_accept_offer,
    isError: isPrepareError_accept_offer,
  } = usePrepareContractWrite({
    address: `0x${contractAddress.substring(2, contractAddress.length)}`,
    abi: titleAbi,
    functionName: 'processRequest',
    args: [parseInt(listed_property.surveyNumber), 3],
    enabled: !(listed_property.ReqStatus.toString() == '1'),
  });

  const {
    data: data_accept_offer,
    write: accept_offer,
    error: error_accept_offer,
  } = useContractWrite(config_accept_offer);

  const {
    isLoading: isLoading_accept_offer,
    isSuccess: isSuccess_accept_offer,
    isError: isError_accept_offer,
  } = useWaitForTransaction({
    hash: data_unavailable?.hash,
  });

  useEffect(() => {
    if (isSuccess || isSuccess_unavailable) {
      setPropertyStatus(!listed_property.isAvailable);
    }
  }, [isSuccess, isSuccess_unavailable, isSuccess_accept_offer]);

  function change_availability() {
    if (propertyStatus) {
      make_unavailable?.();
    } else {
      make_available?.();
    }
  }

  return (
    <div className='relative overflow-hidden rounded-lg bg-gray-800 shadow-md '>
      <div
        className={`${
          isLoading || isLoading_unavailable ? loading_shorthand : ''
        } relative`}
      >
        <Image
          src={HouseLogo}
          alt={'House-Item'}
          width={500}
          height={500}
          className={`h-full w-full object-cover object-center ${
            isLoading || isLoading_unavailable ? 'opacity-0' : ''
          }`}
          loading='lazy'
        />
        <button
          className={`${
            listed_property.ReqStatus != '0'
              ? 'cursor-not-allowed bg-gray-400'
              : ''
          } absolute bottom-0 right-0  bg-white px-4 py-2 font-bold text-gray-800`}
          disabled={
            !make_available ||
            !make_unavailable ||
            listed_property.ReqStatus != '0'
          }
          onClick={() => change_availability()}
        >
          {isLoading || isLoading_unavailable ? 'Cambiando' : 'Cambiar estado'}
        </button>
      </div>
      <div className='p-4'>
        <h2
          className={` ${
            isLoading || isLoading_unavailable
              ? loading_shorthand
              : ' mb-2 text-lg font-bold'
          }`}
        >
          {listed_property.neighborhood}
        </h2>
        <p className='text-base text-gray-400'>
          <span
            className={`${
              isLoading || isLoading_unavailable ? loading_shorthand : ''
            }`}
          >
            {'Ciudad: ' + listed_property.state}
          </span>
          <br />
          <span
            className={`${
              isLoading || isLoading_unavailable
                ? 'animate-pulse bg-gray-400 text-base text-gray-400'
                : ''
            }`}
          >
            {'Distrito: ' + listed_property.district}
          </span>{' '}
          <br />
          <span
            className={`${
              isLoading || isLoading_unavailable ? loading_shorthand : ''
            }`}
          >
            {'Estado: ' + (propertyStatus ? 'Disponible' : 'No listado')}
          </span>
          <br />
          <span
            className={`${
              isLoading || isLoading_unavailable ? loading_shorthand : ''
            }`}
          >
            {'Estado de transacción: ' + listed_property.ReqStatus}
          </span>
          <br />
        </p>
        <div className='flex flex-col gap-2 pt-2'>
          <p className='pt-2 font-bold text-white'>
            <span
              className={` ${
                isLoading || isLoading_unavailable ? loading_shorthand : ''
              }`}
            >
              ${listed_property.marketValue}
            </span>
          </p>
          {listed_property.ReqStatus.toString() == '1' && (
            <>
              <button
                className='btn-outline btn-success min-h-8 btn h-7'
                onClick={() => accept_offer?.()}
              >
                Aceptar oferta
              </button>
              <button className='btn-outline btn-error min-h-8 btn h-7'>
                Rechazar oferta
              </button>
            </>
          )}
        </div>
      </div>
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
      {isError_unavailable && (
        <div>
          Error: {(prepareError_unavailable || error_unavailable)?.message}
        </div>
      )}
      {isPrepareError_accept_offer ||
        (prepareError_accept_offer && (
          <div>
            Error: {(prepareError_accept_offer || error_accept_offer)?.message}
          </div>
        ))}
    </div>
  );
};
