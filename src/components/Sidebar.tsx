import { ReactNode, ChangeEvent, useState } from 'react';
import { FaSlidersH } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';
import PriceFilter from './PriceFilter';

export default function Navbar({ children }: { children: ReactNode }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [isExpandedEstadoPropiedad, setIsExpandedEstadoPropiedad] =
		useState(false);
	const [isExpandedPrecio, setIsExpandedPrecio] = useState(false);
	const [isExpandedCategoria, setIsExpandedCategoria] = useState(false);

	const handleSidebarToggle = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const drawer_styles = `${
		isSidebarOpen
			? 'drawer grid-cols-[256px_1fr] '
			: ' drawer grid-cols-[auto_1fr] '
	}`;

	return (
		<div className={drawer_styles}>
			<input
				id='my-drawer'
				type='checkbox'
				className='drawer-toggle'
				onChange={handleSidebarToggle}
			/>
			<div className='drawer-content-custom ml-3'>{children}</div>
			<div className='drawer-side-custom'>
				<ul
					className={`menu ${
						isSidebarOpen ? 'w-64' : 'w-28'
					} bg-base-300 p-4 text-base-content`}
				>
					<label htmlFor='my-drawer' className='drawer-button btn'>
						{isSidebarOpen && <span className='mr-2'>Filtros</span>}
						<FaSlidersH size={'1rem'} color={'white'} />
					</label>
					{isSidebarOpen ? (
						<>
							<li className='pt-2'>
								<div className='flex-col'>
									<div
										className='w-full text-base lg:text-lg'
										onClick={() =>
											setIsExpandedEstadoPropiedad(!isExpandedEstadoPropiedad)
										}
									>
										Estado
										<FaChevronDown
											className={`delay-400 float-right mt-1 h-5 w-5 transition-all duration-500 ${
												isExpandedEstadoPropiedad ? 'rotate-180' : ''
											}`}
										/>
									</div>
									<div
										className={`w-full ${
											isExpandedEstadoPropiedad ? '' : 'hidden'
										}`}
									>
										<ul className='menu menu-compact'>
											<li className=''>
												<span className='flex-1'>Disponible</span>
											</li>
											<li className=''>
												<span className='flex-1'>Con ofertas</span>
											</li>
											<li className=''>
												<span className='flex-1'>En subasta</span>
											</li>
										</ul>
									</div>
								</div>
							</li>
							<li className='pt-2'>
								<div className='flex flex-col'>
									<div
										className='w-full text-base lg:text-lg'
										onClick={() => setIsExpandedPrecio(!isExpandedPrecio)}
									>
										Precio
										<FaChevronDown
											className={`delay-400 float-right mt-1 h-5 w-5 transition-all duration-500 ${
												isExpandedPrecio ? 'rotate-180' : ''
											}`}
										/>
									</div>
									<div
										className={`w-full ${
											isExpandedPrecio ? '' : 'hidden'
										}`}
									>
										<PriceFilter />
									</div>
								</div>
							</li>

							<li className='pt-2'>
								<div className='flex-col'>
									<div
										className='w-full text-base lg:text-lg'
										onClick={() => setIsExpandedCategoria(!isExpandedCategoria)}
									>
										Categoría
										<FaChevronDown
											className={`delay-400 float-right mt-1 h-5 w-5 transition-all duration-500 ${
												isExpandedCategoria ? 'rotate-180' : ''
											}`}
										/>
									</div>
									<div
										className={`w-full ${isExpandedCategoria ? '' : 'hidden'}`}
									>
										<ul className='menu menu-compact'>
											<li className=''>
												<span className='flex-1'>Distrito</span>
											</li>
											<li className=''>
												<span className='flex-1'>Vecindario</span>
											</li>
										</ul>
									</div>
								</div>
							</li>
						</>
					) : null}
				</ul>
			</div>
		</div>
	);
}
