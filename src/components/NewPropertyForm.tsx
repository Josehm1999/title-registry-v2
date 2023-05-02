import { zodResolver } from '@hookform/resolvers/zod';
import { utils } from 'ethers';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { z } from 'zod';
import useDebounce from '../hooks/useDebounce';
import titleAbi from '../../constants/TitleRegistry.json';
import { useEffect } from 'react';

const propertySchema = z.object({
  state: z.string().trim().min(4, 'Debe de contener al menos 5 caractere(s)'),
  district: z
    .string()
    .trim()
    .min(5, 'Debe de contener al menos 5 caractere(s)'),
  neighborhood: z
    .string()
    .trim()
    .min(5, 'Debe de contener al menos 5 caractere(s)'),
  surveyNumber: z
    .string()
    .trim()
    .min(9, 'Debe de contener al menos 5 caractere(s)'),
  seller: z
    .string()
    .refine(
      (value) => utils.isAddress(value),
      'No es una dirección Etherum valida'
    ),
  marketValue: z.preprocess(
    (a) => parseInt(a as string, 10),
    z.number().positive('Debe de ingresar un número positivo')
  ),
});

type Inputs = z.infer<typeof propertySchema>;

export default function NewPropertyForm(props: { titleAddress: string }) {
  const {
    register,
    handleSubmit,
    watch,
    formState,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<Inputs>({
    mode: 'onChange',
    resolver: zodResolver(propertySchema),
  });

  const watch_state = watch('state', '');
  const watch_district = watch('district', '');
  const watch_neighborhood = watch('neighborhood', '');
  const watch_surveyNumber = watch('surveyNumber', '');
  const watch_seller = watch('seller', '');
  const watch_marketValue = watch('marketValue', 0);
  const debounced_state = useDebounce(watch_state, 500);
  const debounced_district = useDebounce(watch_district, 500);
  const debounced_neighborhood = useDebounce(watch_neighborhood, 500);
  const debounced_surveyNumber = useDebounce(watch_surveyNumber, 500);
  const debounced_seller = useDebounce(watch_seller, 500);
  const debounced_marketValue = useDebounce(watch_marketValue, 500);

  const { config } = usePrepareContractWrite({
    address: `0x${props.titleAddress.substring(2, props.titleAddress.length)}`,
    abi: titleAbi,
    functionName: 'registerTitle',
    args: [
      watch_state,
      watch_district,
      watch_neighborhood,
      watch_surveyNumber,
      watch_seller,
      watch_marketValue,
    ],
    enabled: Boolean(
      debounced_state &&
        debounced_district &&
        debounced_neighborhood &&
        debounced_surveyNumber &&
        debounced_seller &&
        debounced_marketValue
    ),
  });

  const { data: data_from_contract, write } = useContractWrite(config);
  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data_from_contract?.hash,
  });

  const onSubmit: SubmitHandler<Inputs> = () => {
    write?.();
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful && isSuccess) {
      reset();
    }
  }, [reset, isSubmitSuccessful, formState]);

  return (
    <div
      className={`card w-2/4 bg-base-300 shadow-xl ${
        errors.state ? 'mt-36' : 'mt-2'
      } `}
    >
      <h3 className='pt-4 text-center text-lg font-bold text-white'>
        Registra una nueva propiedad
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className='px-8 pt-6 pb-8'>
        <div className='relative mb-2 w-full'>
          <label
            htmlFor='state'
            className='text-md mb-2 block font-bold text-white'
          >
            Provincia:
          </label>
          <input
            id='state'
            type='text'
            className='focus:shadow-outline text-md w-full appearance-none rounded px-3 py-2 leading-tight text-white focus:outline-none'
            {...register('state', { required: true })}
          />
          {errors.state && (
            <span className='text-sm text-red-600'>
              {errors.state?.message}
            </span>
          )}
        </div>
        <div className='relative mb-2 w-full'>
          <label
            htmlFor='district'
            className='text-md mb-2 block font-bold text-white'
          >
            Distrito:
          </label>
          <input
            id='district'
            type='text'
            className='focus:shadow-outline text-md w-full appearance-none rounded px-3 py-2 leading-tight text-white focus:outline-none'
            {...register('district', { required: true })}
          />
          {errors.district && (
            <span className='text-sm text-red-600'>
              {errors.district?.message}
            </span>
          )}
        </div>
        <div className='relative mb-2 w-full'>
          <label
            htmlFor='neighborhood'
            className='text-md mb-2 block font-bold text-white'
          >
            Vecindario:
          </label>

          <input
            id='neighborhood'
            type='text'
            className='focus:shadow-outline text-md w-full appearance-none rounded border px-3 py-2 leading-tight text-white focus:outline-none'
            {...register('neighborhood', { required: true })}
          />
          {errors.neighborhood && (
            <span className='text-sm text-red-600'>
              {errors.neighborhood?.message}
            </span>
          )}
        </div>
        <div className='relative mb-2 w-full'>
          <label
            htmlFor='surveyNumber'
            className='text-md mb-2 block font-bold text-white'
          >
            Número de partida registral:
          </label>
          <input
            id='surveyNumber'
            type='text'
            className='focus:shadow-outline text-md w-full appearance-none rounded border px-3 py-2 leading-tight text-white focus:outline-none'
            {...register('surveyNumber', { required: true })}
          />
          {errors.surveyNumber && (
            <span className='text-sm text-red-600'>
              {errors.surveyNumber?.message}
            </span>
          )}
        </div>
        <div className='relative mb-2 w-full'>
          <label
            htmlFor='seller'
            className='text-md mb-2 block font-bold text-white'
          >
            Cuenta del dueño:
          </label>
          <input
            id='seller'
            type='text'
            className='focus:shadow-outline text-md w-full appearance-none rounded border px-3 py-2 leading-tight text-white focus:outline-none'
            {...register('seller', { required: true })}
          />
          {errors.seller && (
            <span className='text-sm text-red-600'>
              {errors.seller?.message}
            </span>
          )}
        </div>
        <div className='relative mb-2 w-full'>
          <label
            htmlFor='marketValue'
            className='text-md mb-2 block font-bold text-white'
          >
            Precio:
          </label>
          <input
            id='marketValue'
            type='number'
            className='focus:shadow-outline text-md w-full appearance-none rounded border px-3 py-2 leading-tight text-white focus:outline-none'
            {...register('marketValue', { required: true })}
          />
          {errors.marketValue && (
            <span className='text-sm text-red-600'>
              {errors.marketValue?.message}
            </span>
          )}
        </div>
        <button
          type='submit'
          className='focus:shadow-outline w-full rounded-full btn btn-outline px-4 py-2 font-bold text-gray-400 hover:border-white hover:text-white focus:outline-none'
        >
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
        {isSuccess && (
          <div className='text-gray-700'>
            Se creo con exito! -
            <a
              href={`https://etherscan.io/tx/${data_from_contract?.hash}`}
              className='text-blue-700'
            >
              Etherscan
            </a>
          </div>
        )}
        {isError && (
          <div className='text-red-700'>
            Ha ocurrido un error. Revise la información que ingreso.
          </div>
        )}
      </form>
    </div>
  );
}
