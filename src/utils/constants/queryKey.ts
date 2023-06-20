import { RequestMissionListDto } from '@/api/mission/dtos/requestMissionList.dto';
import { createQueryKeyStore } from '@lukemorales/query-key-factory';

const queryKeys = createQueryKeyStore({
  auth: {
    me: ['me'],
    validToken: (token: string) => ['auth', 'validToken', token],
  },

  profile: {
    myProfile: ['myProfile'],
    industry: ['industry'],
    job: ['job'],
    referer: ['referer'],
    companySize: ['company-size'],
  },

  cart: {
    count: ['cartCount'],
    list: ['cartList'],
  },

  bookmark: {
    list: (page: number, limit: number) => ['bookmarkList', page, limit],
  },

  withdraw: {
    reason: ['reason'],
  },

  dashboard: {
    countUser: ['countUser'],
    categories: ['categories'],
    marriageChart: ['marriageChart'],
    mbtiChart: ['mbtiChart'],
    areaChart: ['areaChart'],
    osChart: ['osChart'],
    ageChart: ['ageChart'],
    genderChart: ['genderChart'],
  },

  mission: {
    category: ['category'],
    list: ({
      page = 1,
      limit = 20,
      order = 'date',
      due = 0,
      categories = [],
      keyword = '',
    }: RequestMissionListDto) => [
      'missionList',
      page,
      limit,
      order,
      due,
      categories,
      keyword,
    ],
    relationList: ({
      page = 1,
      limit = 20,
      order = 'date',
      due = 0,
      categories = [],
      keyword = '',
    }: RequestMissionListDto) => [
      'relationMissionList',
      page,
      limit,
      order,
      due,
      categories,
      keyword,
    ],
    detail: (idMission: number) => ['missionDetail', idMission],
    surveyItemDetail: (idSurveyItem: string) => [
      'surveyItemDetail',
      idSurveyItem,
    ],
  },
  lab: {
    detail: (idLabQuestion: number | string) => ['labDetail', idLabQuestion],
    itemDetail: (idLabQuestionItem: number | string) => [
      'labDetail',
      'item',
      idLabQuestionItem,
    ],
  },

  subscribe: {
    paymentList: (page: number, limit: number) => ['paymentList', page, limit],
    receipt: (idPayment: number) => ['receipt', idPayment],
  },

  plan: {
    subscribe: (type: string) => ['subscribe', type],
  },
});

export default queryKeys;
