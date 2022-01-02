import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  @ApiProperty({
    description: 'image url',
  })
  photo: string;
}
