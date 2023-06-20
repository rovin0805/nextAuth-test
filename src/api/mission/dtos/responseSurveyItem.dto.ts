import { Age, Gender } from './graphData.dto';

export class ResponseSurveyItem {
  id: string;
  order: number;
  title: string;
  total: ITotal;
  answers: IAnswer[];
}

interface ITotal {
  count: number;
  ages: Age[];
  gender: Gender[];
}

export interface IAnswer {
  id: string;
  description: string;
  imgPath: string | null;
  count: string;
  order: number;
  ages: Age[];
  gender: Gender[];
}
