import { useQuery } from '@tanstack/react-query';
import { NextPageWithLayout } from './_app';
import ProtectedLayout from '@/components/protectedLayout';
import queryKeys from '@/utils/constants/queryKey';
import missionRepository from '@/api/mission';

const Home: NextPageWithLayout = () => {
  const query = {
    page: 1,
    limit: 10,
    due: 365,
    // order: 'date',
    keyword: '',
    categories: [],
  };

  const { data: missionListData } = useQuery(
    queryKeys.mission.list(query).queryKey,
    () => missionRepository.getSearchMissionLab(query),
    {
      keepPreviousData: true,
    }
  );

  return (
    <>
      <h1>HOME</h1>
      <ul>
        {missionListData?.data?.items?.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </>
  );
};

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <ProtectedLayout>{page}</ProtectedLayout>;
};

export default Home;
