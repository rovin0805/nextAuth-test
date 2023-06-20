import { MissionType } from '@/utils/constants/types';
import { MissionDto } from './missionDto';
import { FinderItemAnswerProps } from './finderItem.dto';
import { Graph } from './graphData.dto';

export class ResponseMissionDetail extends MissionDto {
  type: MissionType;
  tags: { id: number; name: string }[];
  totalParticipate: number;
  graph: Graph;
  survey: IMissionSurvey;
  customSurvey: ICustomSurvey[];
  addedCart: boolean;
  bookmarked: boolean;
}

interface IMissionSurvey {
  id: string;
  title: string;
  contents: string;
  items: ISurveyItem[];
}

export interface ISurveyItem {
  id: string;
  item_title: string;
  select_length: number;
  answer_type: string;
  answers: FinderItemAnswerProps[];
}

interface ICustomSurvey extends ISurveyItem {
  addedCart: boolean;
  bookmarked: boolean;
}
