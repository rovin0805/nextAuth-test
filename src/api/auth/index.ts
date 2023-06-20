import client from '../client';
import { ResponseAuthDto } from './dtos/responseAuth.dto';
import { ResponseRefreshToken } from './dtos/responseRefreshToken.dto';
import RequestLoginBody from './dtos/requestLogin.dto';
import { UserDto } from './dtos/userDto';

const authRepository = (() => {
  const BASE_URL = '/v1/business/auth';

  return {
    login: async (body: RequestLoginBody) =>
      client.post<ResponseAuthDto>(`${BASE_URL}/login`, body),

    logout: async () => client.delete<undefined>(BASE_URL + `/logout`),

    refresh: async () =>
      client.put<ResponseRefreshToken>(`${BASE_URL}/refresh`, {}),

    getMe: async () => client.get<UserDto>(`${BASE_URL}/me`),
  };
})();

export default authRepository;
