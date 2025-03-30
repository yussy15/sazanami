import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

type WithAuthProps = {
  children: ReactNode;
};

export function withAuth(Component: React.FC) {
  return function ProtectedComponent(props: any) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'unauthenticated') {
        router.push('/');
      }
    }, [session, status, router]);

    if (status === 'loading') {
      return <p>Loading...</p>;
    }

    if (!session) {
      return null;
    }

    return <Component {...props} />;
  };
}
