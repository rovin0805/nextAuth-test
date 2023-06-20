import { Graph } from './graphData.dto';

export interface ResponseLabQuestionDetailDto {
  id: string;
  title: string;
  description: null | string;
  thumbnail: string;
  isShowFinder: number;
  startDate: string;
  endDate: string;
  totalParticipated: number;
  surveys: Survey[];
  graph: Graph;
  categories: { id: number; name: string; icon: string }[];
  addedCart: boolean;
  bookmarked: boolean;
}

interface Survey {
  id: number;
  title: string;
  type: string;
  maxSelectLength: number;
  likertRightDesc?: string;
  likertLeftDesc?: string;
  labSurveyAnswer: LabSurveyAnswer[];
  addedCart: boolean;
  bookmarked: boolean;
}

interface LabSurveyAnswer {
  id: number;
  description: string;
  order: number;
  image: null | string;
  addedCart: boolean;
  bookmarked: boolean;
}
