import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { PASSWORD_REGEX } from '@/utils/constants/regex';

export default class RequestLoginBody {
  @IsString()
  @IsEmail(undefined, { message: '올바른 이메일 형식을 입력해 주세요.' })
  @IsNotEmpty({ message: '필수로 입력해주세요.' })
  email: string;

  @IsString()
  @Matches(PASSWORD_REGEX, {
    message: '*영문,숫자,특수문자 포함 8~20자 이내로 입력해 주세요.',
  })
  password: string;

  @IsBoolean()
  isRemember: boolean;
}
