import { zodResolver } from '@hookform/resolvers/zod';
import { utils } from 'ethers';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

const propertySchema = z.object({
	state: z.string().trim().min(5, 'Debe de contener al menos 5 caractere(s)'),
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

export default function NewPropertyForm(titleAddress: string) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		mode: 'onChange',
		resolver: zodResolver(propertySchema),
	});

	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
	return (
		<div
			className={`card w-2/4 bg-white shadow-xl ${
				errors.state ? 'mt-36' : 'mt-2'
			} `}
		>
			<h3 className='pt-4 text-center text-lg font-bold text-gray-700'>
				Registra una nueva propiedad
			</h3>
			<form onSubmit={handleSubmit(onSubmit)} className='px-8 pt-6 pb-8'>
				<div className='relative mb-2 w-full'>
					<label
						htmlFor='state'
						className='text-md mb-2 block font-bold text-gray-700'
					>
						Provincia:
					</label>
					<input
						id='state'
						type='text'
						className='focus:shadow-outline text-md w-full appearance-none rounded border px-3 py-2 leading-tight text-white focus:outline-none'
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
						className='text-md mb-2 block font-bold text-gray-700'
					>
						Distrito:
					</label>
					<input
						id='district'
						type='text'
						className='focus:shadow-outline text-md w-full appearance-none rounded border px-3 py-2 leading-tight text-white focus:outline-none'
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
						className='text-md mb-2 block font-bold text-gray-700'
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
						className='text-md mb-2 block font-bold text-gray-700'
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
						className='text-md mb-2 block font-bold text-gray-700'
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
						className='text-md mb-2 block font-bold text-gray-700'
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
					className='focus:shadow-outline w-full rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
				>
					Enviar
				</button>
			</form>
		</div>
	);
}
