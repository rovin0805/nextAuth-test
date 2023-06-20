export class MissionDto {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  subTitle: string;
  thumbnailPath: string;
  keyword: string[];
  categories: { id: number; name: string; icon: string }[];
  addedCart: boolean;
  bookmarked: boolean;
}
