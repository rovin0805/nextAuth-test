import { ItemMetaDto } from '@/common/apis/commonDtos/metaDto';

export class ResponseSearchMissionLabDto {
  items: ISearchMissionLab[];
  meta: ItemMetaDto;
}

export interface ISearchMissionLab {
  id: string;
  title: string;
  divide: 'MISSION' | 'LAB';
  start_date: string;
  end_date: string;
  category_name: string;
  category_id: string | number;
  category_title: string;
}
