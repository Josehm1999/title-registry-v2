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
		<div className='p-5 grid '>
			<form action=''>
				<div className='input-filters'>
					<div className='input-group'>
						<input
							type='text'
							inputMode='numeric'
							id='min-price'
							value={minPrice}
							onChange={handleMinPriceChange}
							placeholder='$ Min'
							min={'0'}
						/>
					</div>
					<div className='input-group'>
						<input
							type='text'
							inputMode='numeric'
							id='max-price'
							value={maxPrice}
							onChange={handleMaxPriceChange}
							placeholder='$ Max'
							min={'0'}
						/>
					</div>
				</div>
				<div>
					<button onClick={handleFilterClick}>Filter</button>
				</div>
			</form>
		</div>
	);
}
