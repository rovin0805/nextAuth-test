import axios, {
  AxiosError,
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { getSession, signOut } from 'next-auth/react';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import authRepository from './auth';

export interface ResponseFormat<T = any> {
  success: boolean;
  status: {
    code: number;
    message?: string;
  };
  data: T;
}

interface CustomInstance extends AxiosInstance {
  interceptors: {
    request: AxiosInterceptorManager<InternalAxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse<ResponseFormat>>;
  };

  getUri(config?: AxiosRequestConfig): string;
  request<T = any, R = ResponseFormat<T>, D = any>(
    config: AxiosRequestConfig<D>
  ): Promise<R>;
  get<T = any, R = ResponseFormat<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  delete<T = any, R = ResponseFormat<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  head<T = any, R = ResponseFormat<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  options<T = any, R = ResponseFormat<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  post<T = any, R = ResponseFormat<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  put<T = any, R = ResponseFormat<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  patch<T = any, R = ResponseFormat<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  postForm<T = any, R = ResponseFormat<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  putForm<T = any, R = ResponseFormat<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  patchForm<T = any, R = ResponseFormat<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
}

const client: CustomInstance = axios.create();

client.defaults.baseURL = 'https://dev.server.pointmonster.co.kr/api';

// const refreshAuthLogic = async (failedRequest: AxiosError) => {
//   const response = await authRepository.refresh();
//   const {
//     data: { accessToken, refreshToken },
//   } = response;

//   failedRequest.request.config.headers.Authorization = 'Bearer ' + accessToken;

//   return Promise.resolve();
// };

// createAuthRefreshInterceptor(client, refreshAuthLogic);

client.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  // @ts-ignore
  (response) => {
    return response.data;
  },
  function (error) {
    if (error.response.status === 401 || error.response.status === 400) {
      signOut({ redirect: false }).then((res) => {
        window.location.href = '/';
      });
    }
    return Promise.reject(error);
  }
);

export default client;
