import client from '../client';
import { ILoginBody } from './dtos/ILoginBody';
import { ILoginRes } from './dtos/ILoginRes';
import { ILoginUserInfo } from './dtos/ILoginUserInfo';

const BASE_URL = '/v1/admin/auth';

/**
 * 관리자 로그인
 */
export const fetchPostLoginAdmin = (body: ILoginBody) =>
  client.post<{
    admin: ILoginUserInfo;
    accessToken: string;
    refreshToken: string;
  }>(`${BASE_URL}/login`, body);

/**
 * 관리자 로그아웃
 */
export const fetchDeleteLogoutAdmin = () =>
  client.delete<{ success: boolean }>(`${BASE_URL}/logout`);

/**
 * 토큰 갱신
 */
export const fetchPutRefreshToken = () =>
  client.put<ILoginRes>(`${BASE_URL}/refresh`);
