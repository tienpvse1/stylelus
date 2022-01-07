import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class CreateAccountDto {
  @Length(2, 100)
  firstName: string;
  @Length(2, 100)
  lastName: string;
  @IsEmail()
  email: string;
  @Length(6, 50)
  password: string;
  @ApiProperty({
    description: 'image url',
  })
  photo: string;
}
