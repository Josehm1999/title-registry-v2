import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { contractAddressesInterface } from '../types/utility';
import titleAbi from '../../constants/TitleRegistry.json';
import networkMapping from '../../constants/networkMapping.json';
import { Session } from 'next-auth';
import { BigNumber, BigNumberish, ethers } from 'ethers';
import { useState } from 'react';
import { useIsMounted } from '../hooks/isMounted';

export default function RetrieveFunds({
  session,
}: {
  session: Session | undefined;
}) {
  const addresses: contractAddressesInterface = networkMapping;
  const contractAddress = addresses['5']!['TitleRegistry']![0]!;
  const mounted = useIsMounted();
  const { data, isSuccess, isLoading } = useContractRead({
    address: `0x${contractAddress.substring(2, contractAddress.length)}`,
    abi: titleAbi,
    functionName: 'getProceeds',
    args: [session?.address],
    select: (data) => {
      return ethers.utils.formatEther(BigNumber.from(data as bigint));
    },
  });

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: `0x${contractAddress.substring(2, contractAddress.length)}`,
    abi: titleAbi,
    functionName: 'withDrawProceeds',
    enabled: mounted && data != '0.0',
  });

  const { data: data_from_contract, write, error } = useContractWrite(config);

  const {
    isLoading: isLoading_retrieve_funds,
    isSuccess: isSuccess_retrieve_funds,
    isError: isError_retrieve_funds,
  } = useWaitForTransaction({
    hash: data_from_contract?.hash,
  });

  return (
    <div className='m-3 flex items-center'>
      <div className='mr-2'>
        <span className='text-lg font-bold'>Fondos de la cuenta:</span>
        <span className='ml-1 text-lg'>
          {mounted && (isLoading || isLoading_retrieve_funds) && '...'}
          {mounted && isSuccess ? data : '0'}
        </span>
      </div>
      <button
        className='btn-outline btn-success btn rounded py-2 px-4 font-bold text-white'
        disabled={!write}
        onClick={() => write?.()}
      >
        Retirar fondos
      </button>
    </div>
  );
}
