import { useState, ChangeEvent } from 'react';

export default function PriceFilter() {
	const [minPrice, setMinPrice] = useState('');
	const [maxPrice, setMaxPrice] = useState('');

	const handleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
		setMinPrice(event.target.value);
	};

	const handleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
		setMaxPrice(event.target.value);
	};

	const handleFilterClick = () => {
		console.log(
			`Filter items with minPrice ${minPrice} and maxPrice ${maxPrice}`
		);
	};

	return (
		<form action='' className='grid gap-4'>
			<div className='flex items-center gap-3'>
				<div className=''>
					<input
						type='text'
						inputMode='numeric'
						id='min-price'
						value={minPrice}
						onChange={handleMinPriceChange}
						placeholder='$ Min'
						min={'0'}
						className={
							'h-9 w-full rounded-xl bg-white py-3 px-2 text-lg leading-none text-black '
						}
					/>
				</div>
				<span>a</span>
				<div className=''>
					<input
						type='text'
						inputMode='numeric'
						id='max-price'
						value={maxPrice}
						onChange={handleMaxPriceChange}
						placeholder='$ Max'
						min={'0'}
						className={
							'h-9 w-full rounded-xl bg-white py-3 px-2 text-lg leading-none text-black '
						}
					/>
				</div>
			</div>
			<div>
				<button
					onClick={handleFilterClick}
					className='btn-outline btn h-7 min-h-8'
				>
					Aplicar
				</button>
			</div>
		</form>
	);
}
