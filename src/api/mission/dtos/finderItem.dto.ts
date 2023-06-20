export interface FinderItemProps {
  id: number | string;
  title: string;
  answers: FinderItemAnswerProps[];
  isAddedCart: boolean;
  isBookmarked: boolean;
}

export interface FinderItemAnswerProps {
  id: number | string;
  description: null | string;
  imgPath: null | string;
  addedCart: boolean;
  bookmarked: boolean;
}
