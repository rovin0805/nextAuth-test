import { Age, Gender } from './graphData.dto';

export interface ResponseLabQuestionItemDetailDto {
  id: number;
  title: string;
  total: Total;
  answers: LabAnswer[];
}

interface Total {
  count: number;
  ages: Age[];
  gender: Gender[];
}

export interface LabAnswer {
  id: number;
  description: string;
  order: number;
  imgPath: null | string;
  count: string;
  ages: Age[];
  gender: Gender[];
}
