import { NextPageWithLayout } from './_app';
import ProtectedLayout from '@/components/protectedLayout';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <h1>HOME</h1>
    </>
  );
};

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <ProtectedLayout>{page}</ProtectedLayout>;
};

export default Home;
