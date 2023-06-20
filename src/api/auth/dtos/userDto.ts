export class UserDto {
  createdAt: string;
  updatedAt: string;
  id: number;
  email: string;
  emailVerified: boolean;
  password: string;
  lastLogin: string;
  subscribe?: ISubscribe;
  userGroup: IUserGroup;
}

interface ISubscribe {
  createdAt: string;
  endDate: string;
  id: number;
  offerEndDate: string;
  offerStartDate: string;
  plan: IPlan;
  startDate: string;
  unSubscribeDate: string;
  updatedAt: string;
}

interface IPlan {
  createdAt: string;
  id: number;
  isActive: boolean;
  monthPrice: number;
  name: string;
  type: string;
  updatedAt: string;
  yearPrice: number;
}

interface IUserGroup {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  customerKey: string;
  cardNumber?: string;
  cardCompany?: string;
  bizNumber?: string;
  companyName?: string;
  ownerName: string;
  receiptEmail?: string;
  managerName?: string;
  managerEmail?: string;
  managerPhone?: string;
  deletedAt?: string;
}
