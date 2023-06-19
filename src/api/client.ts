import axios, {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

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

client.interceptors.response.use(
  // @ts-ignore
  (response) => {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default client;
