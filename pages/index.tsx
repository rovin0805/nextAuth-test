import RequestLoginBody from '@/api/auth/dtos/requestLogin.dto';
import type { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

const Home: NextPage = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const { control, handleSubmit, getValues } = useForm<RequestLoginBody>({
    resolver: classValidatorResolver(RequestLoginBody),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignIn = () =>
    signIn('credentials', {
      callbackUrl: window.location.href + 'home',
      email: getValues('email'),
      password: getValues('password'),
      redirect: false,
    })
      .then((res) => {
        if (res?.ok) {
          router.push('/home');
        } else {
          throw new Error(res?.status + '');
        }
      })
      .catch(alert);

  const onSubmit: SubmitHandler<RequestLoginBody> = (body, event) => {
    event?.preventDefault();
    handleSignIn();
  };

  if (status === 'authenticated') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <p>Signed in as {session?.user?.name}</p>
        <button onClick={() => router.push('/home')}>Go to Home</button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h2>Sign In</h2>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 300,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name='email'
          render={({ field, fieldState, formState }) => (
            <input style={{ height: 40 }} placeholder='email' {...field} />
          )}
        />

        <Controller
          control={control}
          name='password'
          render={({ field, fieldState, formState }) => (
            <input
              style={{ height: 40 }}
              placeholder='password'
              type='password'
              {...field}
            />
          )}
        />

        <button
          type='submit'
          style={{ height: 40 }}
          onClick={(event) => {
            event.preventDefault();
            handleSignIn();
          }}
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Home;
