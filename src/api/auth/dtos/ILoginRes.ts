interface ILoginUserInfo {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  email: string;
  password: string;
  lastLogin: Date;
}

export interface ILoginRes {
  success: boolean;
  data: {
    user: ILoginUserInfo;
    refreshToken: string;
    accessToken: string;
  };
}
