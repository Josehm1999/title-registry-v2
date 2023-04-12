import { zodResolver } from '@hookform/resolvers/zod';
import { utils } from 'ethers';
import { SubmitHandler as SubmitHandlerAdmin, useForm } from 'react-hook-form';
import {
	useConnect,
	useContractWrite,
	usePrepareContractWrite,
	useWaitForTransaction,
} from 'wagmi';
import { z } from 'zod';
import networkMapping from '../../constants/networkMapping.json';
import titleAbi from '../../constants/TitleRegistry.json';

const regional_admin_schema = z.object({
	admin_address: z
		.string()
		.refine(
			(value) => utils.isAddress(value),
			'No es una dirección Etherum valida'
		),
	district: z
		.string()
		.trim()
		.min(5, 'Debe de contener al menos 5 caractere(s)'),
});

type InputsAdmin = z.infer<typeof regional_admin_schema>;

type contractAddressesInterface = {
	[key: string]: contractAddressesTitleInterface;
};

type contractAddressesTitleInterface = {
	[key: string]: string[];
};

export default function RegionalAdminForm() {
	const { data } = useConnect();
	const addresses: contractAddressesInterface = networkMapping;
	const chainString = !!data?.chain.id ? data?.chain.id.toString() : '1337';
	const titleAddress = addresses[chainString]!['TitleRegistry']![0];

	const {
		register: registerAdmin,
		handleSubmit: handleSubmitAdmin,
		formState: { errors: errorsAdmin },
	} = useForm<InputsAdmin>({
		resolver: zodResolver(regional_admin_schema),
	});

	const { config } = usePrepareContractWrite({
		address: `0x${titleAddress?.substring(1, titleAddress.length - 1)}`,
		abi: titleAbi,
		functionName: 'addRegionalAdmin',
		args: ['0x2e3053A561d1Bd36c0ba511F4634101007bFb0c5', 'Barranco'],
	});

	const { data: data_from_contract, write } = useContractWrite(config);

	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data_from_contract?.hash,
	});

	const onSubmitAdmin: SubmitHandlerAdmin<InputsAdmin> = (data_form) => {
		write?.();
		console.log(
			titleAddress +
				' ' +
				`0x${titleAddress?.substring(2, titleAddress.length)}`
		);
	};

	return (
		<div className='card mt-4 w-2/4 bg-white shadow-xl'>
			<form
				onSubmit={handleSubmitAdmin(onSubmitAdmin)}
				className='px-8 pt-6 pb-8'
			>
				<h3 className='pt-4 text-center text-lg font-bold text-gray-700'>
					Registra una nuevo administrador regional
				</h3>
				<div className='mb-4 md:flex md:justify-between'>
					<div className='mb-2 w-full md:mr-2 md:mb-0'>
						<label
							htmlFor='superAdmin'
							className='text-md mb-2 block font-bold text-gray-700'
						>
							Dirección (ethereum)
						</label>
						<input
							id='superAdmin'
							type='text'
							className='focus:shadow-outline text-md w-full appearance-none rounded border px-3 py-2 leading-tight text-white focus:outline-none'
							{...registerAdmin('admin_address', { required: true })}
						/>
						{errorsAdmin.admin_address && (
							<span className='text-sm text-red-600'>
								{errorsAdmin.admin_address?.message}
							</span>
						)}
					</div>

					<div className='mb-2 md:mr-2 md:mb-0'>
						<label
							htmlFor='district'
							className='text-md mb-2 block font-bold text-gray-700'
						>
							Distrito:
						</label>
						<input
							id='district'
							type='text'
							className='focus:shadow-outline text-md w-full appearance-none rounded border px-3 py-2 leading-tight text-white focus:outline-none'
							{...registerAdmin('district', { required: true })}
						/>
						{errorsAdmin.district && (
							<span className='text-sm text-red-600'>
								{errorsAdmin.district?.message}
							</span>
						)}
					</div>
				</div>
				<div>
					{' '}
					<button
						type='submit'
						className='focus:shadow-outline w-full rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
					>
						{isLoading ? 'Enviando...' : 'Enviar'}
					</button>
					{isSuccess && (
						<div>
							Se creo con exito!
							<div>
								<a href={`https://etherscan.io/tx/${data_from_contract?.hash}`}>
									Etherscan
								</a>
							</div>
						</div>
					)}
				</div>
			</form>
		</div>
	);
}
