import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { usePrevious } from './usePrevious';

export function useProtected() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const session = useSession();
  const prevAddress = usePrevious(address);

  const handleSignout = async () => {
    await signOut({ callbackUrl: '/' });
    disconnect();
  };

  useEffect(() => {
    if (prevAddress && !address) {
      handleSignout();
    }
    if (session.status !== 'loading' && !address && prevAddress) {
      handleSignout();
    }
  }, [address]);

  return handleSignout;
}
