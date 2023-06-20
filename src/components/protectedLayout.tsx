import authRepository from '@/api/auth';
import { useMutation } from '@tanstack/react-query';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/');
    },
  });

  const handleSignOut = () => logoutMutation.mutate();

  const logoutMutation = useMutation(authRepository.logout, {
    onSuccess() {
      signOut({ redirect: false }).then((res) => {
        router.replace(window.location.href);
      });
    },
    onError() {},
  });

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      // handleSignOut();
    }
  }, [session]);

  if (status === 'loading') {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        Loading or not authenticated...
      </div>
    );
  }

  return (
    <>
      <header
        style={{
          width: '100vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <h2>Hello, {session?.user?.email}</h2>
        <button
          onClick={(event) => {
            event.preventDefault();
            handleSignOut();
          }}
          style={{ height: 'fit-content' }}
        >
          Sign out
        </button>
      </header>
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>{children}</div>
    </>
  );
}
