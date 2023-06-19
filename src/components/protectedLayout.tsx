import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

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
  console.log('🚀 ~ session:', session);

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
        <h2>Hello, {session?.user?.name}</h2>
        <button
          onClick={(event) => {
            event.preventDefault();
            signOut({ redirect: false }).then(() =>
              router.push(window.location.href)
            );
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
