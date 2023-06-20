import { UserDto } from './userDto';

export class ResponseAuthDto {
  user: UserDto;
  refreshToken: string;
  accessToken: string;
}
