import client from '../client';
import { RequestMissionListDto } from './dtos/requestMissionList.dto';
import { ResponseMissionDetail } from './dtos/responseMissionDetail.dto';
import { ResponseSearchMissionLabDto } from './dtos/responseSearchMissionLab.dto';

const missionRepository = (() => {
  const BASE_URL = '/v1/finder';
  const MISSION_BASE_URL = `${BASE_URL}/mission`;

  return {
    getSearchMissionLab: ({
      page = 1,
      limit = 10,
      order = 'date',
      due = 0,
      categories = [],
      keyword = '',
    }: RequestMissionListDto) =>
      client.get<ResponseSearchMissionLabDto>(
        `/v1/search?page=${page}&limit=${limit}&order=${order}&due=${due}&keyword=${keyword}${
          categories.length > 0
            ? categories.map((id) => `&categories=${id}`).join('')
            : ''
        }`
      ),

    getMissionDetail: async (idMission: number) =>
      client.get<ResponseMissionDetail>(`${MISSION_BASE_URL}/${idMission}`),
  };
})();

export default missionRepository;
