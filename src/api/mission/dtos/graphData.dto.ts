export interface Age {
  ageGroup: string;
  count: string;
  percent: string;
}

export interface Gender {
  gender: string;
  count: string;
  percent: string;
}

export interface Graph {
  ages: DetailAge[];
  gender: DetailGender;
  mpti: DetailMpti[];
}

export interface DetailAge {
  ageGroup: string;
  value: string;
}

export interface DetailGender {
  male: number;
  female: number;
}

export interface DetailMpti {
  recognize: 'A' | 'B' | 'C' | 'D';
  value: number;
}
