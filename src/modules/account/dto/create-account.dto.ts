import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, Length } from 'class-validator';

export class CreateAccountDto {
  @Length(2, 100)
  @IsOptional()
  firstName: string;
  @Length(2, 100)
  @IsOptional()
  lastName: string;
  @IsEmail()
  email: string;
  @Length(6, 50)
  password: string;
  @ApiProperty({
    description: 'image url',
  })
  @IsOptional()
  photo: string;
}
