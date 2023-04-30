import Link from 'next/link';
type Props = {};

export default function Footer(props: Props) {
  return (
    <div className='bg-black p-2 text-center font-semibold text-white' >
      Creado por:{' '}
      <Link
        href={'https://github.com/Josehm1999'}
        className='font-semibold text-blue-600 no-underline'
      >
        Josehm1999
      </Link>
    </div>
  );
}
